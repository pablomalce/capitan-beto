/**
 * Capitán Beto · Service Worker
 * Strategy:
 *  - Precache shell (HTML, CSS, JS, logos, manifest)
 *  - Cache-first for static assets (images, fonts)
 *  - Network-first for HTML (so admins see fresh content fast)
 *  - Stale-while-revalidate for fonts/external CSS
 */

const VERSION = "v99";
const SHELL_CACHE = `cb-shell-${VERSION}`;
const ASSETS_CACHE = `cb-assets-${VERSION}`;
const RUNTIME_CACHE = `cb-runtime-${VERSION}`;

const SHELL_URLS = [
  "/",
  "/index.html",
  "/styles.css?v=87",
  "/script.js?v=97",
  "/manifest.webmanifest",
  "/logo.svg",
  "/logo.png",
  "/favicon-16.png",
  "/favicon-32.png",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/og-image.png",
  "/crew/beto.webp",
  "/crew/marina.webp",
  "/momentos/puerta.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_URLS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => ![SHELL_CACHE, ASSETS_CACHE, RUNTIME_CACHE].includes(k)).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Skip cross-origin non-image requests (Google Sign-In, Analytics, etc.)
  if (url.origin !== self.location.origin && !/\.(jpg|jpeg|png|gif|webp|svg|woff2?)$/i.test(url.pathname)) {
    return;
  }

  // Network-first for HTML so content edits propagate fast
  if (req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(SHELL_CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match("/index.html")))
    );
    return;
  }

  // Cache-first for static assets
  if (/\.(css|js|png|jpg|jpeg|webp|svg|gif|woff2?|ico)(\?.*)?$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(ASSETS_CACHE).then((c) => c.put(req, copy));
          return res;
        });
      })
    );
    return;
  }
});

// Allow manual cache reset from the app
self.addEventListener("message", (event) => {
  if (event.data === "CLEAR_CACHES") {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});
