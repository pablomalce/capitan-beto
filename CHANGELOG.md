# CHANGELOG — Capitán Beto

Todos los cambios notables de este proyecto se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/). Fechas en AAAA-MM-DD.

## [No publicado]

### Added
- (pendiente)

### Changed
- (pendiente)

### Fixed
- (pendiente)

### Security
- (pendiente)

---

## [2026-07-23]

### Added
- Behold.so Feed ID configurable desde Dashboard → Canales (feed de Instagram).

### Changed
- Mejoras rápidas de rendimiento y seguridad: imágenes a WebP, integración de Sentry, eventos GA4 y correcciones de políticas RLS en Supabase.

---

## [2026-07-22] — Auditoría v1 (Marco Enterprise, Fases 0–6)

Auditoría completa ejecutada bajo `docs/CLAUDE_ENTERPRISE_AUDIT.md`. 8/8 hallazgos corregidos.

### Fixed
- **[PROMO-001]** Módulo de Promociones: implementado el CRUD completo (crear, editar, activar/LIVE, expirar, borrar) con persistencia en `localStorage` (`cb_promos_v1`).
- **[PROMO-002]** Correcciones asociadas al ciclo de vida de promociones (Bloque 1).
- **[I18N-001]** Añadidas 44 claves i18n faltantes en ES + EN.
- **[A11Y-001]** `aria-label` en 6 inputs sin etiqueta (invSearch, qrUrl, qrColor, loyaltyPhone, loyaltyName, chatInput).
- **[SW]** Sincronizada la versión del Service Worker (v79) con las versiones de assets (`js?v=79`, `css?v=73`).

### Added
- Persistencia de horarios del dashboard en `localStorage` (`cb_hours_v1`).
- Documentación de la auditoría: `AUDIT_REPORT.md` e `IMPROVEMENTS.md` (Fase 6).

### Security
- **[SEC-001]** Corrección en la resolución de rol de administrador.
- **[CSP-001]** Unificada la CSP entre `vercel.json` y el `<meta>` del HTML.

---

## Convención

- Cada corrección de auditoría se registra con su **ID** (`PROMO-###`, `SEC-###`, etc.) y el archivo/línea afectado.
- Categorías: `Added`, `Changed`, `Fixed`, `Security`, `Deprecated`, `Removed`.
- El detalle metodológico completo vive en `docs/CLAUDE_ENTERPRISE_AUDIT.md`.
