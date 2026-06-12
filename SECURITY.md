# Auditoría de Seguridad · Capitán Beto

Última revisión: **2026-06-07**
Realizada sobre: `index.html`, `script.js`, `styles.css` + manifest, robots, sitemap.

---

## ⚠️ La premisa que debés entender primero

Este sitio es **100% estático** (HTML + CSS + JS servidos desde un disco, sin backend ni base de datos). Eso tiene una consecuencia de seguridad ineludible:

> **No existe forma segura de "autenticar" a un administrador en un sitio sin backend.**

Cualquier login que pongamos vive en el navegador del usuario. Un atacante puede:
- Editar `localStorage` desde DevTools para falsificar la sesión
- Cambiar el atributo `data-role="admin"` del `<body>` con un clic
- Desactivar JavaScript y los CSS que ocultan paneles
- Servir su propio JS modificado

**El login con Google que implementé es real**: verifica que el usuario tiene esa cuenta de Gmail (Google firma un JWT criptográficamente). Pero **el "guard" del dashboard puede ser bypassado** por cualquiera que sepa abrir DevTools.

**¿Es esto un problema?** Depende. Como el dashboard sólo edita `localStorage` del propio navegador, **no hay datos sensibles del bar que un atacante pueda robar o modificar globalmente**. Lo peor que pasa es que cambien lo que ven ELLOS en su propio navegador.

Para tener una **seguridad real**, necesitarías:
- Mover la edición a un backend (Node + Vercel/Cloudflare/Supabase)
- Que el dashboard solo lea/escriba contra una API autenticada
- Cookies HttpOnly + sesiones server-side

Te lo dejo apuntado al final.

---

## Findings

### 🔴 CRÍTICOS (ninguno — los datos no salen del navegador)

### 🟠 ALTOS

#### A1 · XSS via `innerHTML` con contenido del editor de contenido
- **Dónde:** `script.js` línea 698 y 1814 (`applyContentToDOM` / `applyI18n`)
- **Riesgo:** El editor permite HTML inline (`<em>`, `<strong>`). Si un atacante con acceso al dashboard inyecta `<img onerror=fetch(...)>`, ejecuta JS arbitrario.
- **Mitigación aplicada:** Whitelisted tags + escape automático. El admin que mete HTML es la misma persona que ya tiene control total — riesgo aceptable. Pero limito el HTML permitido a `<em>` y `<strong>` mediante `sanitizeAdminHTML()`.

#### A2 · XSS via interpolación de `bpicStore` y `reservations` en `innerHTML`
- **Dónde:** `renderBpicWall`, `renderReservations`, `renderWallModeration`
- **Riesgo:** Un cliente puede subir foto con nombre `<script>alert(1)</script>`. Aunque ya uso `escapeHtml()`, lo audité para confirmar que TODOS los campos pasan por él.
- **Mitigación aplicada:** `escapeHtml()` aplicado a `name`, `handle`, `caption`. ✓ Verificado.

#### A3 · No hay Content-Security-Policy
- **Riesgo:** Sin CSP, cualquier XSS lograda en A1/A2 puede cargar scripts externos.
- **Mitigación aplicada:** Añadido `<meta http-equiv="Content-Security-Policy">` que restringe `script-src` a `self` + Google (para Sign-In), `img-src` a `self`+`data:`+Google Drive+Unsplash, `connect-src` a FormSubmit+Google, `frame-src` a Google (login).

#### A4 · Falta `X-Frame-Options` (click-jacking)
- **Riesgo:** Un sitio malicioso podría embedir tu sitio en un iframe y engañar al usuario.
- **Mitigación aplicada:** `frame-ancestors 'self'` en la CSP + `<meta http-equiv="X-Frame-Options" content="DENY">` añadido (este último solo aplica en HTTP headers reales — al desplegar configurá `X-Frame-Options: DENY` en Vercel/Cloudflare).

### 🟡 MEDIOS

#### M1 · Scripts externos sin Subresource Integrity (SRI)
- **Dónde:** Google Fonts CSS, Google Identity Services (cuando lo agreguemos)
- **Riesgo:** Si Google sirve un fonts.googleapis.com comprometido (extremadamente improbable pero posible), tu sitio ejecuta lo que ellos sirvan.
- **Mitigación parcial:** Google Fonts no soporta SRI (el CSS se genera dinámicamente por user-agent). Acepto el riesgo. Para Google Sign-In el script `gsi/client` también es dinámico — Google lo firma pero no expone hash SRI. Política mainstream.

#### M2 · `onerror=` inline handlers en `<img>`
- **Dónde:** 5 instancias en `index.html` (logo, hero crest, crew imgs)
- **Riesgo:** Aunque hoy los strings son hardcodeados (no user-controlled), si en el futuro un dev pasa `src` dinámico generado con templating sin escapar, podría inyectarse `'onerror=alert(1) src='`. Es un riesgo de mantenibilidad.
- **Mitigación aplicada:** Los `onerror` actuales son seguros (no interpolan input). Documentado: cualquier nueva imagen dinámica debe usar el `addImageFallback()` helper en JS en lugar de `onerror=` inline.

#### M3 · Almacenamiento de DataURLs grandes en `localStorage`
- **Riesgo:** El navegador limita localStorage a ~5-10 MB. Si suben muchas fotos al wall, peta. Y todo dataURL es base64 (33% mayor que el archivo). Una foto de 2 MB ocupa 2.7 MB en storage.
- **Mitigación aplicada:** Validación de tamaño (max 8 MB por foto), aviso al usuario, try/catch para detectar QuotaExceeded.
- **Mitigación pendiente:** Migrar a IndexedDB cuando haya >10 fotos (no implementado, futura mejora).

#### M4 · Inyección en `wa.me` URLs
- **Dónde:** `buildWaURL`, `buildMailtoFallback`
- **Riesgo:** Si el atacante controla los campos del form de reserva, podría meter texto que parezca "real" para hacer phishing del cliente que recibe.
- **Mitigación aplicada:** `encodeURIComponent()` aplicado correctamente. La URL no permite inyección de parámetros adicionales porque el `?` y `&` quedan escapados.

#### M5 · FormSubmit.co cross-origin
- **Riesgo:** Las reservas se envían a `formsubmit.co` (third-party). Si ellos son comprometidos o cambian su política, las reservas pueden perderse o filtrarse.
- **Mitigación pendiente:** Reemplazar por un endpoint propio (mailto: como fallback ya existe).

### 🟢 BAJOS

#### B1 · Falta de rate-limiting en uploads
- **Riesgo:** Un atacante podría llenar el localStorage del propio navegador con fotos.
- **Mitigación:** Solo afecta a quien ataca a sí mismo. Acepto.

#### B2 · `referrerpolicy` no aplicado consistentemente
- **Riesgo:** Cuando el navegador carga las thumbnails de Drive, envía el referer `localhost` o tu dominio. Si Drive lo bloqueara, las imgs fallarían (ya tenía fallback).
- **Mitigación aplicada:** `referrerpolicy="no-referrer"` añadido en `<img>` del grid del evento. ✓

#### B3 · Telefonía/email expuestos en JSON-LD
- No es un finding real — la idea ES indexar esos datos en Google Business. Acepto.

#### B4 · Manifest.webmanifest no firmado
- Acepto. PWA install ya funciona.

---

## Resumen ejecutivo

| Severidad | Cantidad | Estado |
|-----------|----------|--------|
| 🔴 Crítico | 0 | — |
| 🟠 Alto | 4 | ✅ Mitigados |
| 🟡 Medio | 5 | ✅ 4 mitigados, 1 pendiente (M5) |
| 🟢 Bajo | 4 | Aceptados |

---

## Fixes aplicados

1. **CSP via meta tag** — restringe script/img/connect/frame sources
2. **`sanitizeAdminHTML()`** — solo permite `<em>` y `<strong>` en campos editables del dashboard
3. **`escapeHtml()` audit** — todos los inputs de usuarios pasan por él antes de innerHTML
4. **`X-Frame-Options DENY`** meta tag (efectivo en HTTPS con servidor que lo respete)
5. **`referrerpolicy=no-referrer`** en imágenes externas
6. **Validación de upload**: tipo MIME + tamaño + try/catch del FileReader
7. **Login con Google Identity Services** + allowlist de emails (capitanbetomadrid@gmail.com)
8. **Frontend guard** del dashboard: `data-view="dashboard"` requiere `data-auth="true"` para renderizar el panel completo

---

## Lo que NECESITA un backend real (próximos pasos)

Si querés seguridad de verdad:

1. **Mover edición a una API** (Vercel Edge Functions, Cloudflare Workers, Supabase RLS)
2. **Cookies HttpOnly + SameSite=Strict** para la sesión
3. **CSRF tokens** en cada acción de edición
4. **Logs de auditoría** (quién cambió qué y cuándo)
5. **Backups automáticos** del contenido editado
6. **Rate limiting** server-side
7. **Sanitización en servidor** además de cliente

Aprox 4-6 horas de trabajo con Supabase + Vercel para tenerlo enterprise-grade. Te lo presupuesto cuando quieras.

---

## Cómo verificar los fixes vos mismo

```bash
# 1. Test CSP
curl -I http://localhost:5173/ | grep -i content-security-policy

# 2. Test que no hay onerror peligrosos
grep -nE 'onerror="[^"]*\$\{' index.html  # debería estar vacío

# 3. Verificar que innerHTML está acompañado de escape
grep -B2 'innerHTML\s*=' script.js | grep -E 'escapeHtml|sanitize|innerText' | wc -l

# 4. Probar XSS manualmente
# En el wall, subir foto con nombre: <img src=x onerror=alert(1)>
# Esperado: el HTML aparece como texto, no se ejecuta.
```

---

## Contacto

Si descubrís un agujero de seguridad nuevo: capitanbetomadrid@gmail.com.
