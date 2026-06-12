# Capitán Beto · Gastro Taberna

Sitio web oficial de **Capitán Beto** — gastro taberna en Madrid · tapas castizas con sabor argentino · atendido por sus dueños Matías y Natalia ("la Polaca").

🌐 **Producción**: https://capitan-beto.com
📍 **Madrid, España**
🐾 **100% Pet-Friendly · Todos son bienvenidos**

---

## Stack

- **Frontend**: HTML5 + CSS3 (custom properties) + JavaScript vanilla (IIFE, ~4.2k LOC)
- **Hosting**: Vercel (static)
- **CDN**: Vercel Edge Network
- **Email reservas**: FormSubmit.co + Google Calendar invite
- **Auth admins**: Google Identity Services (GIS) + email allowlist
- **i18n**: ES / EN (state machine en cliente, ~300 claves)
- **PWA**: Service Worker + manifest, installable
- **GDPR**: Consent Mode v2, banner granular, 4 modales legales

## Estructura

```
.
├── index.html              # Single-page app
├── script.js               # State machine, i18n, CMS, chat, auth
├── styles.css              # Design system con custom properties
├── sw.js                   # Service Worker (cache-first estática, network-first HTML)
├── vercel.json             # Headers seguridad, cache, redirects
├── manifest.webmanifest    # PWA install
├── robots.txt + sitemap.xml
├── logo.png / logo.svg
├── crew/                   # Fotos Matías y Natalia
├── momentos/               # Fotos atmósfera del bar
├── videos/                 # Video del evento (comprimido)
├── instagram/              # Mock thumbnails
└── SECURITY.md             # Auditoría de seguridad
```

## Características

### Sitio público
- Hero cinemático con marquee dorado
- Menú con 4 tabs (Compartir / Tapas / Bodega / Destilados) · 97 ítems reales
- **Pet-Friendly**: galería de fotos sacadas en el bar + uploader cliente + counter animado
- **The Crew**: Matías y Natalia
- **Momentos**: fotos atmosféricas + video del bar
- **Evento Argentina Soberana**: galería + crédito Madee Renaudier
- **#BetosPic**: muro comunitario de fotos
- **Reservas**: WhatsApp + Google Calendar + email
- **Bandera LGBTQ+**: "Todos son bienvenidos" en pet section y footer
- **Reseñas Google**: CTA con OAuth
- **Chatbot** con intent matching + handover a WhatsApp

### Dashboard admin
- Inventario (97 platos editables)
- Editor universal de contenido (textos, imágenes, precios)
- Manager de imágenes con drag-and-drop
- Moderación de reservas, clientes (leads), wall, peludos
- Promociones LIVE, Horarios, Canales
- **Diseño**: paleta de colores + tipografía editable en vivo
- **Pagos & Integraciones**: Stripe, Redsys, PayPal, Bizum, CoverManager, TheFork, Mailchimp, GA
- **Backup CMS**: export/import JSON de todo el contenido

### Compatibilidad multi-formato
Uploaders aceptan: JPG, PNG, GIF, WebP, AVIF, HEIC, HEIF, TIFF, BMP, SVG, JFIF — hasta 25 MB.

## Desarrollo local

```bash
# Servir el sitio (no necesita build)
python3 -m http.server 5173 --bind 127.0.0.1
# → http://127.0.0.1:5173
```

## Deploy

Push a `main` → Vercel deploya automáticamente.

```bash
# Deploy manual (preview)
vercel
# Deploy a producción
vercel --prod
```

## Configuración post-deploy

Los siguientes valores se configuran desde el **Dashboard** del propio sitio (sin tocar código):

1. **Google OAuth Client ID** → editar `script.js` línea con `GOOGLE_CLIENT_ID`
2. **Google Review URL** → Dashboard · Canales · Google Reseñas
3. **NIF** → Dashboard · Contenido · Footer (cuando se añada el campo)
4. **Pasarelas de pago** → Dashboard · Pagos & Integraciones
5. **Google Analytics** → Dashboard · Pagos & Integraciones · Google Analytics

## Seguridad

Ver [`SECURITY.md`](./SECURITY.md). Punto principal: como el sitio es 100% estático,
todo lo editable vive en `localStorage` del navegador admin. Para ediciones globales
persistentes se necesita backend (próxima fase).

## Contacto

📧 capitanbetomadrid@gmail.com
📱 +34 611 854 380 (WhatsApp Business)
📷 [@capitanbeto.bardetapas](https://www.instagram.com/capitanbeto.bardetapas)

---

© 2026 Capitán Beto · Madrid · All rights reserved
