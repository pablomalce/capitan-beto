/* =====================================================================
   Capitán Beto · Cliente Supabase (vanilla fetch, sin lib externa)
   ---------------------------------------------------------------------
   Endpoints REST de Supabase + Storage. Sin SDK para mantener bundle
   liviano y CSP estricta.
   ===================================================================== */
(function () {
  "use strict";

  const URL = "https://ghuabxeqqmbvqzdrizrr.supabase.co";
  // JWT legacy `anon` (no la publishable key) — PostgREST necesita un
  // JWT con `role:'anon'` para evaluar las RLS de inserción pública.
  const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodWFieGVxcW1idnF6ZHJpenJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNzEzNDcsImV4cCI6MjA5Njg0NzM0N30.ExNHok-l7dC74ubRcbDN3dg80rhtKnSicmvND0V5Xi4";

  const REST = `${URL}/rest/v1`;
  const STORAGE = `${URL}/storage/v1`;
  const PUBLIC_OBJECT = (bucket, path) =>
    `${URL}/storage/v1/object/public/${bucket}/${path}`;

  const headers = (extra) => Object.assign({
    "apikey": ANON_KEY,
    "Authorization": `Bearer ${ANON_KEY}`,
    "Content-Type": "application/json"
  }, extra || {});

  // ============ AUTH ============
  const AUTH_KEY = "cb.sb.session.v1";
  let _session = null;

  function loadSession() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      // Expira si el access_token venció
      const exp = s && s.expires_at ? s.expires_at * 1000 : 0;
      if (exp && Date.now() > exp) return null;
      return s;
    } catch (_) { return null; }
  }
  function saveSession(s) {
    _session = s;
    try { localStorage.setItem(AUTH_KEY, JSON.stringify(s)); } catch (_) {}
  }
  function clearSession() {
    _session = null;
    try { localStorage.removeItem(AUTH_KEY); } catch (_) {}
  }
  function getSession() {
    if (!_session) _session = loadSession();
    return _session;
  }
  function authHeaders() {
    const s = getSession();
    return Object.assign({
      "apikey": ANON_KEY,
      "Authorization": s ? `Bearer ${s.access_token}` : `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json"
    });
  }
  async function signInWithPassword(email, password) {
    const res = await fetch(`${URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { "apikey": ANON_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error_description || err.msg || `Login failed (${res.status})`);
    }
    const data = await res.json();
    saveSession(data);
    return data;
  }

  /**
   * Envía un magic link al email del admin.
   * El link redirige a /?view=dashboard&from=magic con el token,
   * que `handleMagicLinkCallback()` consume al cargar la página.
   */
  async function signInWithMagicLink(email) {
    const redirectTo = `${location.origin}/?view=dashboard&from=magic`;
    const res = await fetch(`${URL}/auth/v1/otp`, {
      method: "POST",
      headers: { "apikey": ANON_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        create_user: false, // sólo admins pre-creados
        options: { email_redirect_to: redirectTo }
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error_description || err.msg || `Magic link failed (${res.status})`);
    }
    return await res.json();
  }

  /**
   * Procesa el callback del magic link (hash con access_token, refresh_token, etc.)
   * Devuelve true si se autenticó, false si no había token.
   */
  async function handleMagicLinkCallback() {
    const hash = location.hash || "";
    if (!hash.includes("access_token") && !hash.includes("error")) return false;
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const expires_in = parseInt(params.get("expires_in") || "0", 10);
    const type = params.get("type");
    if (!access_token) return false;
    const session = {
      access_token,
      refresh_token: refresh_token || "",
      expires_in,
      expires_at: Math.floor(Date.now() / 1000) + expires_in,
      token_type: "bearer",
      type
    };
    saveSession(session);
    // Limpiar el hash de la URL para que no quede el token visible
    try { history.replaceState(null, "", location.pathname + location.search); } catch (_) {}
    return true;
  }
  async function refreshSession() {
    const s = getSession();
    if (!s || !s.refresh_token) return null;
    const res = await fetch(`${URL}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { "apikey": ANON_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: s.refresh_token })
    });
    if (!res.ok) { clearSession(); return null; }
    const data = await res.json();
    saveSession(data);
    return data;
  }
  async function signOut() {
    const s = getSession();
    if (s) {
      try {
        await fetch(`${URL}/auth/v1/logout`, {
          method: "POST",
          headers: { "apikey": ANON_KEY, "Authorization": `Bearer ${s.access_token}` }
        });
      } catch (_) {}
    }
    clearSession();
  }
  async function changePassword(newPassword) {
    const s = getSession();
    if (!s) throw new Error("not_authenticated");
    const res = await fetch(`${URL}/auth/v1/user`, {
      method: "PUT",
      headers: { "apikey": ANON_KEY, "Authorization": `Bearer ${s.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword })
    });
    if (!res.ok) throw new Error("password_change_failed");
    return await res.json();
  }
  function currentUser() {
    const s = getSession();
    if (!s) return null;
    try {
      const payload = JSON.parse(atob(s.access_token.split(".")[1]));
      return { email: payload.email, sub: payload.sub, role: payload.role };
    } catch (_) { return null; }
  }

  /**
   * Consulta a Supabase el rol del usuario autenticado vía RPC my_role().
   * Devuelve "admin", "edit", o null si no está en la allowlist.
   * Fuente de verdad: tabla public.admin_emails (gestionable sin redeploy).
   */
  async function fetchMyRole() {
    const s = getSession();
    if (!s) return null;
    try {
      const res = await fetch(`${REST}/rpc/my_role`, {
        method: "POST",
        headers: authHeaders(),
        body: "{}"
      });
      if (!res.ok) return null;
      const role = await res.json(); // devuelve "admin" | "edit" | null
      return (role === "admin" || role === "edit") ? role : null;
    } catch (_) { return null; }
  }

  // ============ HEALTH ============
  async function ping() {
    try {
      const r = await fetch(`${REST}/dishes?select=count`, {
        method: "HEAD",
        headers: headers({ "Prefer": "count=exact" })
      });
      return r.ok;
    } catch (_) { return false; }
  }

  // ============ STORAGE ============
  // Mapeo extensión → MIME para formatos que los browsers reportan vacíos
  const EXT_MIME = {
    heic: "image/heic", heif: "image/heif",
    avif: "image/avif", webp: "image/webp",
    jpg: "image/jpeg", jpeg: "image/jpeg",
    png: "image/png", gif: "image/gif",
    tif: "image/tiff", tiff: "image/tiff",
    bmp: "image/bmp", svg: "image/svg+xml"
  };
  async function uploadToBucket(bucket, file, ext) {
    const safeExt = (ext || (file.name.split(".").pop() || "jpg")).toLowerCase().replace(/[^a-z0-9]/g, "");
    const stamp = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const path = `${stamp}.${safeExt}`;
    // Si file.type viene vacío (HEIC en Chrome, algunos AVIF), inferir del ext
    const mimeType = file.type || EXT_MIME[safeExt] || "image/jpeg";
    const res = await fetch(`${STORAGE}/object/${bucket}/${path}`, {
      method: "POST",
      headers: {
        "apikey": ANON_KEY,
        "Authorization": `Bearer ${ANON_KEY}`,
        "Content-Type": mimeType,
        "x-upsert": "false"
      },
      body: file
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Storage upload failed: ${res.status} ${err}`);
    }
    return { bucket, path, publicUrl: PUBLIC_OBJECT(bucket, path) };
  }

  // Convierte un dataURL → Blob para upload binario eficiente
  function dataURLToBlob(dataURL) {
    const [meta, b64] = dataURL.split(",");
    const mime = (meta.match(/data:([^;]+)/) || [])[1] || "image/jpeg";
    const bin = atob(b64);
    const len = bin.length;
    const buf = new Uint8Array(len);
    for (let i = 0; i < len; i++) buf[i] = bin.charCodeAt(i);
    return new Blob([buf], { type: mime });
  }

  // ============ PET PHOTOS ============
  // Acepta opcionalmente el File ORIGINAL del usuario (mejor calidad +
  // preserva HEIC para Safari). Si no se pasa, cae al dataURL del preview.
  async function uploadPetPhoto({ dataURL, file: originalFile, petName, ownerName, breed }) {
    let file, ext;
    if (originalFile instanceof File || originalFile instanceof Blob) {
      file = originalFile;
      ext = (file.type.split("/")[1] || (file.name && file.name.split(".").pop()) || "jpg").toLowerCase().replace("jpeg", "jpg");
    } else {
      const blob = dataURLToBlob(dataURL);
      ext = (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
      file = new File([blob], `pet.${ext}`, { type: blob.type });
    }
    const up = await uploadToBucket("pet-photos", file, ext);
    const row = {
      pet_name: petName || "Peludo",
      owner_name: ownerName || "",
      breed: breed || "",
      image_path: up.path
      // status omitido → toma DEFAULT 'approved'. El admin puede borrar
      // fotos inapropiadas desde Dashboard → Peludos.
    };
    const res = await fetch(`${REST}/pet_photos`, {
      method: "POST",
      headers: Object.assign({ "Prefer": "return=representation" }, authHeaders()),
      body: JSON.stringify(row)
    });
    if (!res.ok) {
      throw new Error(`Insert pet_photo failed: ${res.status} ${await res.text()}`);
    }
    const inserted = await res.json();
    const stored = Array.isArray(inserted) && inserted[0] ? inserted[0] : row;
    return Object.assign({ public_url: PUBLIC_OBJECT("pet-photos", up.path) }, stored);
  }

  async function listPetPhotos({ status = "approved", limit = 60 } = {}) {
    const url = `${REST}/pet_photos?select=*&status=eq.${encodeURIComponent(status)}&order=created_at.desc&limit=${limit}`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return [];
    const rows = await res.json();
    return rows.map((r) => Object.assign(
      { public_url: PUBLIC_OBJECT("pet-photos", r.image_path) },
      r
    ));
  }

  // ============ BPIC PHOTOS ============
  async function uploadBpicPhoto({ dataURL, file: originalFile, guestName, igHandle, caption }) {
    let file, ext;
    if (originalFile instanceof File || originalFile instanceof Blob) {
      file = originalFile;
      ext = (file.type.split("/")[1] || (file.name && file.name.split(".").pop()) || "jpg").toLowerCase().replace("jpeg", "jpg");
    } else {
      const blob = dataURLToBlob(dataURL);
      ext = (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
      file = new File([blob], `bpic.${ext}`, { type: blob.type });
    }
    const up = await uploadToBucket("bpic-photos", file, ext);
    const row = {
      guest_name: guestName || "Anónimo",
      ig_handle: igHandle || "",
      caption: caption || "",
      image_path: up.path
      // status omitido → DEFAULT 'approved'. Admin puede borrar después.
    };
    const res = await fetch(`${REST}/bpic_photos`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(row)
    });
    if (!res.ok && res.status !== 201) throw new Error(`Insert bpic failed: ${res.status} ${await res.text()}`);
    return row;
  }

  async function listBpicPhotos({ status = "approved", limit = 30 } = {}) {
    const url = `${REST}/bpic_photos?select=*&status=eq.${encodeURIComponent(status)}&order=created_at.desc&limit=${limit}`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return [];
    const rows = await res.json();
    return rows.map((r) => Object.assign(
      { public_url: PUBLIC_OBJECT("bpic-photos", r.image_path) },
      r
    ));
  }

  // ============ CONSUMPTION (admin) ============
  async function logConsumption(entries, authTokenOverride) {
    const session = getSession();
    if (!session && !authTokenOverride) throw new Error("not_authenticated");
    const token = authTokenOverride || session.access_token;
    const res = await fetch(`${REST}/consumption`, {
      method: "POST",
      headers: {
        "apikey": ANON_KEY,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(entries)
    });
    if (!res.ok) throw new Error(`Log consumption failed: ${res.status} ${await res.text()}`);
    return await res.json();
  }

  async function fetchTopDishes({ limit = 10 } = {}) {
    const url = `${REST}/v_top_dishes?select=*&order=revenue_cents.desc&limit=${limit}`;
    const res = await fetch(url, { headers: authHeaders() });
    return res.ok ? await res.json() : [];
  }

  async function fetchDailyRevenue({ days = 30 } = {}) {
    const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
    const url = `${REST}/v_daily_consumption?select=day,revenue_cents,items_sold,shift&day=gte.${since}&order=day.asc`;
    const res = await fetch(url, { headers: authHeaders() });
    return res.ok ? await res.json() : [];
  }

  async function fetchHourlyHeatmap() {
    const url = `${REST}/v_hourly_heatmap?select=*`;
    const res = await fetch(url, { headers: authHeaders() });
    return res.ok ? await res.json() : [];
  }

  async function fetchRecentConsumption({ limit = 50 } = {}) {
    const url = `${REST}/consumption?select=*&order=served_at.desc&limit=${limit}`;
    const res = await fetch(url, { headers: authHeaders() });
    return res.ok ? await res.json() : [];
  }

  // ============ DISHES (catalog · público lee) ============
  async function fetchDishes() {
    const url = `${REST}/dishes?select=*&order=id.asc`;
    const res = await fetch(url, { headers: authHeaders() });
    return res.ok ? await res.json() : [];
  }

  // ============ RESERVATIONS (público insert) ============
  async function createReservation(payload) {
    const res = await fetch(`${REST}/reservations`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok && res.status !== 201) throw new Error(`Reservation failed: ${res.status} ${await res.text()}`);
    return payload;
  }

  // ============ CUSTOMERS (upsert anon) ============
  async function upsertCustomer({ email, full_name, phone, marketing_consent }) {
    // Insert; si ya existe, mergeamos. Sin return=representation para
    // que no falle si la SELECT policy no nos deja leerla de vuelta.
    const res = await fetch(`${REST}/customers?on_conflict=email`, {
      method: "POST",
      headers: Object.assign(authHeaders(), {
        "Prefer": "resolution=merge-duplicates"
      }),
      body: JSON.stringify({ email, full_name, phone, marketing_consent })
    });
    return res.ok || res.status === 201 ? { email, full_name, phone, marketing_consent } : null;
  }

  // ============ ADMIN ACTIONS ============
  async function updateRow(table, id, patch) {
    const res = await fetch(`${REST}/${table}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(patch)
    });
    if (!res.ok) throw new Error(`Update ${table} failed: ${res.status} ${await res.text()}`);
    return res;
  }
  async function deleteRow(table, id) {
    const res = await fetch(`${REST}/${table}?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(`Delete ${table} failed: ${res.status}`);
    return res;
  }
  async function listAllPetPhotos({ limit = 200 } = {}) {
    const url = `${REST}/pet_photos?select=*&order=created_at.desc&limit=${limit}`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return [];
    return (await res.json()).map((r) => Object.assign(
      { public_url: PUBLIC_OBJECT("pet-photos", r.image_path) }, r
    ));
  }
  async function approvePetPhoto(id) {
    const u = currentUser();
    return updateRow("pet_photos", id, {
      status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: u ? u.email : ""
    });
  }
  async function rejectPetPhoto(id) {
    return updateRow("pet_photos", id, { status: "rejected" });
  }
  async function deletePetPhoto(id) { return deleteRow("pet_photos", id); }

  async function approveBpic(id) {
    return updateRow("bpic_photos", id, { status: "approved" });
  }
  async function listAllBpicPhotos({ limit = 200 } = {}) {
    const url = `${REST}/bpic_photos?select=*&order=created_at.desc&limit=${limit}`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return [];
    return (await res.json()).map((r) => Object.assign(
      { public_url: PUBLIC_OBJECT("bpic-photos", r.image_path) }, r
    ));
  }
  async function deleteBpicPhoto(id) { return deleteRow("bpic_photos", id); }
  // Stats reales desde reservas (cuando aún no hay datos de consumo)
  async function fetchReservationStats({ days = 30 } = {}) {
    const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
    const url = `${REST}/reservations?select=reserve_date,reserve_time,party_size,status,zone&reserve_date=gte.${since}&order=reserve_date.asc&limit=500`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return { byDay: {}, byHour: {}, byZone: {}, bySize: {}, total: 0 };
    const rows = await res.json();
    const byDay = {}, byHour = {}, byZone = {}, bySize = {};
    rows.forEach(r => {
      byDay[r.reserve_date] = (byDay[r.reserve_date] || 0) + 1;
      const h = r.reserve_time ? parseInt(r.reserve_time.split(":")[0], 10) : 20;
      byHour[h] = (byHour[h] || 0) + 1;
      const z = r.zone || "sala";
      byZone[z] = (byZone[z] || 0) + 1;
      const s = r.party_size || 2;
      bySize[s] = (bySize[s] || 0) + 1;
    });
    return { byDay, byHour, byZone, bySize, total: rows.length };
  }

  async function listAllReservations({ limit = 100 } = {}) {
    const url = `${REST}/reservations?select=*&order=reserve_date.asc,reserve_time.asc&limit=${limit}`;
    const res = await fetch(url, { headers: authHeaders() });
    return res.ok ? await res.json() : [];
  }
  async function listAllCustomers({ limit = 200 } = {}) {
    const url = `${REST}/customers?select=*&order=last_visit_at.desc&limit=${limit}`;
    const res = await fetch(url, { headers: authHeaders() });
    return res.ok ? await res.json() : [];
  }
  async function updateReservationStatus(id, status) {
    const stamp = new Date().toISOString();
    const patch = { status };
    if (status === "confirmed") patch.confirmed_at = stamp;
    if (status === "seated") patch.seated_at = stamp;
    if (status === "completed") patch.completed_at = stamp;
    if (status === "cancelled") patch.cancelled_at = stamp;
    return updateRow("reservations", id, patch);
  }
  async function wipeDemoConsumption() {
    const res = await fetch(`${REST}/consumption?source=eq.demo`, {
      method: "DELETE",
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(`wipe failed: ${res.status}`);
    return res;
  }

  // ============ EXPORT ============

  // ===== EVENTS =====
  async function listPublicEvents() {
    const url = `${REST}/events?select=*&is_published=eq.true&order=event_date.asc&limit=20`;
    const res = await fetch(url, { headers: { apikey: ANON_KEY, 'Content-Type': 'application/json' } });
    if (!res.ok) return [];
    return res.json();
  }

  async function listAllEvents() {
    const url = `${REST}/events?select=*&order=event_date.desc&limit=50`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return [];
    return res.json();
  }

  async function saveEvent({ id, title, description, event_date, event_time, image_url, is_published }) {
    const body = JSON.stringify({ title, description, event_date, event_time: event_time || null, image_url: image_url || null, is_published });
    if (id) {
      const res = await fetch(`${REST}/events?id=eq.${id}`, { method: 'PATCH', headers: { ...authHeaders(), Prefer: 'return=representation' }, body });
      return res.ok;
    } else {
      const res = await fetch(`${REST}/events`, { method: 'POST', headers: { ...authHeaders(), Prefer: 'return=representation' }, body });
      return res.ok;
    }
  }

  async function deleteEvent(id) {
    const res = await fetch(`${REST}/events?id=eq.${id}`, { method: 'DELETE', headers: authHeaders() });
    return res.ok;
  }

  // ===== LOYALTY =====
  async function getLoyaltyCard(phone) {
    const url = `${REST}/loyalty_stamps?customer_phone=eq.${encodeURIComponent(phone)}&limit=1`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return null;
    const rows = await res.json();
    return rows[0] || null;
  }

  async function listAllLoyalty() {
    const url = `${REST}/loyalty_stamps?select=*&order=stamps.desc&limit=100`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) return [];
    return res.json();
  }

  async function addLoyaltyStamp({ phone, name, existingId, currentStamps }) {
    if (existingId) {
      const newStamps = (currentStamps || 0) + 1;
      const res = await fetch(`${REST}/loyalty_stamps?id=eq.${existingId}`, {
        method: 'PATCH', headers: { ...authHeaders(), Prefer: 'return=representation' },
        body: JSON.stringify({ stamps: newStamps, customer_name: name || undefined, last_stamp_at: new Date().toISOString() })
      });
      return res.ok;
    } else {
      const res = await fetch(`${REST}/loyalty_stamps`, {
        method: 'POST', headers: { ...authHeaders(), Prefer: 'return=representation' },
        body: JSON.stringify({ customer_phone: phone, customer_name: name || null, stamps: 1 })
      });
      return res.ok;
    }
  }

  async function redeemLoyalty({ id, redeemed, stamps }) {
    const STAMPS_PER_REWARD = 10;
    const available = Math.floor(stamps / STAMPS_PER_REWARD) - (redeemed || 0);
    if (available < 1) return false;
    const res = await fetch(`${REST}/loyalty_stamps?id=eq.${id}`, {
      method: 'PATCH', headers: { ...authHeaders(), Prefer: 'return=representation' },
      body: JSON.stringify({ redeemed: (redeemed || 0) + 1 })
    });
    return res.ok;
  }

  window.cbBackend = {
    URL, ANON_KEY,
    // health
    ping,
    // auth
    signInWithPassword, signInWithMagicLink, handleMagicLinkCallback,
    signOut, getSession, currentUser, refreshSession, changePassword, fetchMyRole,
    // pet
    uploadPetPhoto, listPetPhotos, listAllPetPhotos,
    approvePetPhoto, rejectPetPhoto, deletePetPhoto,
    // bpic
    uploadBpicPhoto, listBpicPhotos, listAllBpicPhotos, approveBpic, deleteBpicPhoto,
    // consumption + stats
    logConsumption,
    fetchTopDishes, fetchDailyRevenue, fetchHourlyHeatmap, fetchRecentConsumption, fetchReservationStats,
    wipeDemoConsumption,
    // dishes
    fetchDishes,
    // reservations
    createReservation, listAllReservations, updateReservationStatus,
    // customers
    upsertCustomer, listAllCustomers,
    // events
    listPublicEvents, listAllEvents, saveEvent, deleteEvent,
    // loyalty
    getLoyaltyCard, listAllLoyalty, addLoyaltyStamp, redeemLoyalty,
    // util
    PUBLIC_OBJECT
  };
})();
