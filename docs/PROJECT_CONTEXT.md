# PROJECT_CONTEXT — Capitán Beto

## Identidad del proyecto
- **Nombre / marca:** Capitán Beto · Gastro Taberna
- **Objetivo del sitio:** Web oficial de restaurante en Madrid — escaparate público (menú, reservas, galería, eventos) + dashboard de administración para los dueños
- **URL de producción:** https://capitan-beto.com
- **Repositorio:** https://github.com/pablomalce/capitan-beto
- **Público objetivo:** Clientes del bar en La Latina, Madrid; público amante de la gastronomía argentino-española; mascotas bienvenidas (pet-friendly)

## Arquitectura
- **Frontend:** HTML5 + CSS3 (custom properties) + JavaScript vanilla (patrón IIFE, ~6.650 LOC en script.js). Sin framework. Sin build step.
- **Hosting / deploy:** Vercel (sitio estático). Auto-deploy al hacer push a `main`.
- **Persistencia de datos:** `localStorage` del navegador del admin. No hay backend con base de datos propia para el CMS. Todo el contenido editable (textos, precios, imágenes base64, promociones, reservas, leads, diseño) vive en el cliente. **Esta es la limitación estructural más crítica.**
- **Backend auxiliar:** Supabase (proyecto `capitan-beto` · eu-west-1) — usado para Auth (email/password + magic link) y tablas RLS para reservas/clientes/wall/peludos.
- **Autenticación admin:** Supabase Auth (email/password primario + magic link fallback) + allowlist de emails. Roles: `admin` (malczewskipablo@gmail.com) y `edit` (info@capitan-beto.com, capitanbetomadrid@gmail.com).
- **i18n:** ES / EN mediante state machine en cliente (~300 claves en objeto I18N). Cambio de idioma en tiempo real vía `applyI18n()`.
- **PWA / Service Worker:** `sw.js` v40. Estrategia: cache-first para assets estáticos (CSS, JS, imágenes), network-first para HTML. Precachea shell (index.html, styles.css, script.js, logos, manifest). Versión de caché ligada a constante `VERSION = "v40"`. **Importante:** cambios en assets cacheados no llegan al usuario sin bump de versión del SW.
- **GDPR / consentimiento:** Consent Mode v2, banner granular con 4 categorías (esencial, analítica, marketing, personalización). 4 modales legales (Aviso Legal, Privacidad, Cookies, Términos). Datos personales de leads/reservas en localStorage — implicación GDPR pendiente de revisar.

## Módulos del sitio público
- **Hero:** cinemático con marquee dorado, badge "Promo en directo" (hardcoded en HTML, editable via dashboard content)
- **La Pizarra (menú):** 4 tabs (Compartir / Tapas / Bodega / Destilados), 97 ítems reales, filtro por alérgenos, toggle terraza
- **Horarios:** renderizados desde constante `HOURS` en script.js; sección reformada (turno seguido desde 14:00, martes cerrado)
- **The Crew:** Matías y Natalia, fotos editables desde dashboard
- **Momentos:** galería atmosférica + video
- **Evento Argentina Soberana:** galería + crédito fotógrafo
- **#BetosPic:** muro comunitario de fotos (moderado desde dashboard)
- **Pet-Friendly:** galería + uploader público + contador animado
- **Reservas:** WhatsApp + Google Calendar + email (FormSubmit.co)
- **Reseñas Google:** CTA con enlace configurado; sección con reseñas destacadas (estáticas en HTML)
- **Chatbot:** intent matching + handover WhatsApp
- **GDPR:** banner cookies + modales legales + Mi Cuenta (leads/fidelización)
- **Instagram:** feed via Behold.so (Feed ID pendiente de configurar por el usuario)

## Módulos del Back Office / Dashboard
- **Inventario:** tabla de 97 platos, edición inline de precios/alérgenos/stock. Paginación 20 items/página. Solo admin puede editar precios y borrar.
- **Contenido:** editor universal de textos clave del sitio público (hero, chatbot, etc.), guardados en `localStorage` bajo clave `cb_content_v1`
- **Imágenes:** uploader drag-and-drop, preview, almacenado en `localStorage` bajo clave `cb_images_v1`
- **Reservas:** listado de reservas recibidas (de Supabase), moderación
- **Clientes:** leads del formulario "Mi cuenta", con opt-in marketing; datos en Supabase + clave `cb_customers_v1`
- **Wall (#BetosPic):** moderación de fotos subidas por clientes; clave `cb_bpic_wall_v1`
- **Peludos:** galería pet-friendly; clave `cb.pet.gallery.v1`
- **Promociones:** panel para crear/editar promos LIVE. **ESTADO CRÍTICO: no tiene lógica real de persistencia ni ciclo de vida funcional.** Ver sección "Limitaciones estructurales".
- **Horarios:** formulario editable que modifica la constante `HOURS` visual; **los cambios no persisten** (no hay localStorage ni backend para esto).
- **Canales:** configuración de integraciones (Stripe, Redsys, PayPal, Bizum, CoverManager, TheFork, Mailchimp, GA); guardado en `cb.payments.v1`
- **Secciones:** reordenamiento drag-and-drop de secciones públicas; clave `cb.sections.layout.v1`
- **Diseño:** paleta de colores y tipografía editable en vivo; clave `cb.design.v1`
- **Stats:** KPIs (productos en stock, agotados, promos LIVE, turno actual)
- **Consumo:** dashboard de ventas estimadas (simulado)
- **Backup:** export/import JSON de todo el contenido (todas las claves de localStorage)
- **Pagos:** configuración de pasarelas
- **Eventos:** sección eventos en público + gestión desde dashboard
- **Fidelización:** sistema de sellos digitales (loyalty stamps)
- **QR:** generación de QR del menú
- **Mi Cuenta:** cambio de contraseña para el admin autenticado

## Integraciones externas
- **Supabase:** Auth + tablas RLS (reservas, clientes, wall, peludos) — proyecto `capitan-beto`, región eu-west-1
- **FormSubmit.co:** envío de emails de reserva
- **Google Identity Services:** login OAuth (GIS) — actualmente reemplazado por Supabase Auth como primario
- **Behold.so:** feed Instagram embed — Feed ID pendiente de configurar
- **Stripe / Redsys / PayPal / Bizum:** pasarelas de pago (configurables, no activas)
- **CoverManager / TheFork:** plataformas de reservas externas (configurables)
- **Mailchimp:** email marketing (configurable)
- **Google Analytics:** analytics (configurable, con Consent Mode v2)
- **WhatsApp Business:** handover reservas y chatbot

## Archivos núcleo y responsabilidad de cada uno
- **index.html** (2568 LOC): SPA única. Contiene toda la estructura HTML del sitio público y el dashboard. Versiona assets con `?v=71`.
- **script.js** (6651 LOC): IIFE principal. Contiene: state machine, i18n (I18N object con ~300 claves ES+EN), constantes DISHES (97 items), HOURS, ALLERGEN_KEYS/LABELS, toda la lógica del dashboard y del sitio público, auth, chatbot, GDPR, PWA registration.
- **styles.css** (6871 LOC): design system completo con custom properties. Sin preprocesador.
- **sw.js** (91 LOC): Service Worker v40. Cache-first para assets, network-first para HTML. Versión crítica para updates.
- **vercel.json** (122 LOC): headers de seguridad (CSP, HSTS, X-Frame-Options, etc.), cache-control por tipo de archivo, redirects semánticos.
- **manifest.webmanifest** (88 LOC): PWA, icons, shortcuts a reservar y ver menú.
- **backend.js** (635 LOC): wrapper de Supabase — expone `window.cbBackend` con: `signInWithPassword`, `signInWithMagicLink`, `changePassword`, `signOut`, `currentUser`, `getSession`, y funciones CRUD para reservas, clientes, wall, peludos.

## Claves de localStorage
| Clave | Contenido |
|-------|-----------|
| `cb_auth_v1` | Sesión admin `{email, name, role, exp}` |
| `cb_content_v1` | Textos editables del sitio público |
| `cb_images_v1` | Imágenes (base64) subidas desde dashboard |
| `cb_reservations_v1` | Reservas recibidas |
| `cb_customers_v1` | Leads / clientes registrados |
| `cb_customer_session_v1` | Sesión del cliente público |
| `cb_cookie_consent_v1` | Preferencias de cookies del visitante |
| `cb_bpic_wall_v1` | Fotos del muro comunitario |
| `cb.pet.gallery.v1` | Fotos pet-friendly |
| `cb_crew_v1` | Fotos del equipo |
| `cb.googleReview.v1` | URL reseña Google configurada |
| `cb.design.v1` | Paleta y tipografía personalizada |
| `cb.sections.layout.v1` | Orden de secciones públicas |
| `cb.payments.v1` | Config pasarelas de pago |
| `cb.pet.v1` | Config sección pet |
| `cb.onboard.seen` | Flag onboarding visto |
| `cb.tour.seen` | Flag tour visto |
| `cb.sections.coach.v1` | Flag coach sections visto |
| `cb.cookies.v1` | (alias de consent) |

## Limitaciones estructurales conocidas
1. **Sin backend para CMS:** todo el contenido editable vive en localStorage del navegador admin. Un cambio (promo LIVE, precio, texto) solo existe en ese navegador — el público ve siempre el HTML estático del repositorio.
2. **Módulo Promociones sin persistencia real:** los botones "Editar" y "Nueva promoción" solo disparan un toast; no hay lógica de CRUD real, ni localStorage, ni reflejo en el sitio público. Las 2 promos hardcodeadas en HTML son decorativas.
3. **Horarios no persisten:** el formulario de horarios en el dashboard es visual; los valores reales los controla la constante `HOURS` en script.js (hardcoded).
4. **Service Worker caché agresiva:** un cambio en CSS/JS puede no verse hasta que el usuario limpie caché o el SW actualice. El SW precachea con versión `v40` mientras que el HTML ya referencia `script.js?v=71` — **desincronización activa**.
5. **Datos personales en localStorage:** leads y reservas parcialmente en localStorage — tensión con GDPR (datos de terceros en el dispositivo de un solo usuario).
6. **Sin transpilación:** el JS debe ser compatible con navegadores objetivo tal cual.

## Comportamientos que NO deben romperse (regresión crítica)
- Login admin vía email/password (Supabase) y magic link
- Filtro por alérgenos en el menú público
- Paginación del inventario (20 items/página)
- Formulario de reservas (WhatsApp + email)
- Cambio de idioma ES/EN sin perder estado
- GDPR: banner de cookies y consentimiento antes de scripts de terceros
- PWA: instalabilidad y funcionamiento offline básico
- Chatbot: intent matching y handover WhatsApp
- Roles: admin vs edit (precios/borrado solo admin)
- CSP y headers de seguridad en vercel.json
