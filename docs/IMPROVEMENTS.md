# IMPROVEMENTS — Capitán Beto · Gastro Taberna

> **Estado:** Roadmap de mejoras futuras — generado al completar la Fase 6  
> **Fecha:** 2026-07-22  
> **Importante:** Ninguna mejora de este documento se implementa automáticamente. Cada una requiere aprobación y planificación separada.

---

## Criterios de prioridad

- **P0 — Crítico:** bloquea operación o representa riesgo serio
- **P1 — Alto:** impacto directo en negocio o experiencia del cliente
- **P2 — Medio:** mejora significativa de calidad o mantenibilidad
- **P3 — Bajo:** nice-to-have, deuda técnica, optimización futura

---

## Mejora #1 — Backend de CMS (prioridad P1)

**Problema / oportunidad:**  
Todo el contenido editable (textos, precios, imágenes, promociones, horarios) vive en `localStorage` del navegador del admin. Esto significa: los cambios solo son visibles para ese admin en ese dispositivo, borrar el navegador destruye el contenido, y los visitantes del sitio público ven siempre el HTML estático del último deploy de Vercel.

**Propuesta:**  
Migrar el CMS a Supabase (ya integrado para Auth y reservas). Crear tablas para: `content`, `promos`, `hours`, `images`, `design`. El dashboard escribe en Supabase via `backend.js`; el sitio público hace `fetch()` a Supabase en tiempo de carga para obtener el contenido actualizado. Un webhook de Vercel puede regenerar el HTML estático en cada cambio (SSG on-demand).

**Beneficio:**  
- Cambios de contenido visibles globalmente en tiempo real.
- Persistencia real (no depende del navegador del admin).
- Soporte multi-dispositivo y multi-admin sin conflictos.
- El backup JSON manual deja de ser crítico.

**Coste / riesgo:**  
Alto. Requiere rediseño de toda la capa de persistencia, migración de datos de localStorage a Supabase, y asegurar fallbacks para cuando Supabase no responde. Coste de Supabase puede aumentar si el tráfico es alto. Es el cambio arquitectónico más grande posible en este proyecto.

**Prioridad sugerida:** P1 — es la mejora con mayor impacto en la utilidad real del Back Office.

---

## Mejora #2 — Optimización de assets (prioridad P2)

**Problema / oportunidad:**  
Las imágenes de `crew/`, `momentos/` y `videos/` no están optimizadas para web. Formatos JPEG/PNG pesados, sin WebP, sin responsive images (`srcset`). El Service Worker cachea el shell pero no las imágenes grandes. El score de Core Web Vitals (LCP en particular) se ve afectado en móvil.

**Propuesta:**  
1. Convertir todas las imágenes de `crew/` y `momentos/` a WebP con calidad 80-85%.
2. Añadir `<img srcset="...">` para servir resoluciones apropiadas según dispositivo.
3. Verificar que `loading="lazy"` está en todas las imágenes fuera del viewport inicial.
4. Considerar Cloudflare Image Resizing o Vercel Image Optimization para automatizar esto.

**Beneficio:**  
Mejora de LCP (posiblemente de 3-5s a <2.5s en móvil), reducción de consumo de datos, mejor SEO (Google indexa Core Web Vitals).

**Coste / riesgo:**  
Bajo-medio. El proceso de conversión es scriptable. El riesgo es cambiar URLs de imágenes y romper referencias en el código — hay que hacer un grep exhaustivo.

**Prioridad sugerida:** P2.

---

## Mejora #3 — Modularización de script.js (prioridad P2)

**Problema / oportunidad:**  
`script.js` es un único IIFE de ~6.650 LOC que mezcla estado, lógica de negocio, DOM manipulation, auth, i18n, chatbot, service worker registration y todas las funcionalidades del dashboard. Cualquier cambio requiere leer el archivo entero para no romper nada.

**Propuesta:**  
Introducir un bundler ligero (Vite o esbuild) y dividir `script.js` en módulos ES:
- `auth.js` — login, roles, sesión
- `i18n.js` — I18N object, applyI18n
- `cms.js` — setContent, applyContentToDOM
- `dashboard/promos.js`, `dashboard/hours.js`, `dashboard/inventory.js`, etc.
- `public/menu.js`, `public/reservations.js`, `public/chatbot.js`, etc.

**Beneficio:**  
Mantenibilidad drásticamente mejor. Errores más fáciles de aislar. Posibilidad de escribir tests unitarios por módulo. Onboarding de nuevos desarrolladores mucho más rápido.

**Coste / riesgo:**  
Alto. Introducir un build step cambia el flujo de deploy. El refactor puede introducir regresiones si no se hace con tests. No urgente mientras el proyecto sea pequeño y el equipo sea de 1-2 personas.

**Prioridad sugerida:** P2 — solo abordar cuando el equipo crezca o el ritmo de cambios aumente.

---

## Mejora #4 — Tests automatizados (prioridad P2)

**Problema / oportunidad:**  
No existe ningún tipo de test automatizado. Cada cambio en `script.js` es una operación de fe — cualquier refactor puede romper silenciosamente el flujo de reservas, el login o la persistencia de datos sin que nadie lo detecte hasta que un cliente se queja.

**Propuesta:**  
1. **Smoke tests E2E** con Playwright: carga de la página, cambio de idioma, apertura del menú, reserva vía WhatsApp, login admin.
2. **Tests unitarios** para funciones críticas: `escapeHtml`, `safeSetItem`, `loadPromos`/`persistPromos`, `applyI18n`, roles.
3. Integrar en CI/CD de Vercel: los tests corren en cada PR y bloquean el deploy si fallan.

**Beneficio:**  
Red de seguridad ante cambios. Detecta regresiones antes de producción. Permite refactors con confianza.

**Coste / riesgo:**  
Medio. Playwright requiere setup inicial (~1-2 días) pero es fácil de mantener. Los tests deben mantenerse actualizados con los cambios del sitio.

**Prioridad sugerida:** P2.

---

## Mejora #5 — Monitorización de errores en producción (prioridad P2)

**Problema / oportunidad:**  
No hay forma de saber si los usuarios están encontrando errores JavaScript en producción. Un bug que afecta solo a Chrome en iOS pasaría completamente desapercibido hasta que alguien lo reporte manualmente.

**Propuesta:**  
Integrar **Sentry** (tier gratuito disponible) para captura de errores JS no manejados. Configurar alertas por email ante errores nuevos. Integrar con el Consent Mode v2 existente para no cargar Sentry sin consentimiento.

**Beneficio:**  
Visibilidad real de errores en producción. Stacktraces con contexto de usuario (anónimo). Ahorra tiempo de debugging reactivo.

**Coste / riesgo:**  
Bajo. Sentry JS SDK son ~30 LOC de integración. Riesgo: asegurar que cumple GDPR (Sentry tiene DPA europeo disponible).

**Prioridad sugerida:** P2.

---

## Mejora #6 — Activar Google Analytics con Consent Mode v2 (prioridad P2)

**Problema / oportunidad:**  
Google Analytics está configurado en el dashboard pero no activado. El propietario no tiene datos de tráfico, conversiones ni comportamiento de usuarios. Se desconoce qué secciones son más vistas, de dónde viene el tráfico ni si las campañas de Instagram convierten.

**Propuesta:**  
1. Activar el tracking ID de GA4 desde el panel de Canales del dashboard.
2. Configurar los eventos clave: `page_view`, `menu_view`, `reservation_click`, `whatsapp_click`, `promo_view`.
3. El Consent Mode v2 ya está implementado — GA respetará el consentimiento del usuario.
4. Crear un dashboard en GA4 con las métricas de negocio clave.

**Beneficio:**  
Datos reales para tomar decisiones (¿funciona el chatbot?, ¿convierten las promos?, ¿cuándo hay más tráfico?). Base para campañas de marketing.

**Coste / riesgo:**  
Muy bajo. El código ya está preparado. Solo requiere activar el ID en el dashboard y verificar que los eventos se disparan correctamente.

**Prioridad sugerida:** P1 — impacto en decisiones de negocio con coste prácticamente nulo.

---

## Mejora #7 — Sistema de backup automático (prioridad P3)

**Problema / oportunidad:**  
El backup del contenido del CMS (JSON de localStorage) es manual. Si el admin olvida exportarlo y borra el navegador, todo el contenido editado se pierde. Esto es especialmente crítico para las imágenes del crew almacenadas como base64.

**Propuesta:**  
Crear un scheduled task (via Supabase Edge Function o Vercel Cron) que:
1. Llama a un endpoint que recibe el JSON de backup.
2. Lo almacena en Supabase Storage o en un bucket de Google Drive del restaurante.
3. Mantiene los últimos 30 backups con rotación automática.

**Beneficio:**  
Protección ante pérdida accidental de datos. Historial de cambios. Recuperación ante incidentes.

**Coste / riesgo:**  
Medio. Requiere un endpoint autenticado que reciba el backup desde el cliente, lo que abre superficie de ataque si no está bien protegido. Alternativa más simple: recordatorio automático por email al admin para hacer el backup manualmente cada semana.

**Prioridad sugerida:** P3 — hasta que se implemente el backend real (mejora #1), que lo hace irrelevante.

---

## Mejora #8 — Feed de Instagram (configuración pendiente) (prioridad P1)

**Problema / oportunidad:**  
La integración con Behold.so para el feed de Instagram está implementada en el código pero el **Feed ID está pendiente de configurar**. La sección de Instagram del sitio no muestra contenido hasta que se active.

**Propuesta:**  
1. El propietario se registra en behold.so (plan gratuito disponible para feeds básicos).
2. Conecta su cuenta de Instagram de Capitán Beto.
3. Crea un Feed y copia el Feed ID.
4. Lo introduce en el campo correspondiente del dashboard de Canales.

**Beneficio:**  
La sección de Instagram mostrará las últimas publicaciones automáticamente, sin necesidad de actualizar el sitio manualmente.

**Coste / riesgo:**  
Nulo en código — ya implementado. Solo requiere acción del propietario en behold.so.

**Prioridad sugerida:** P1 por su facilidad y visibilidad para los visitantes.

---

## Mejora #9 — Audit de políticas RLS en Supabase (prioridad P2)

**Problema / oportunidad:**  
Las políticas Row Level Security de Supabase para las tablas `reservations`, `customers`, `wall` y `peludos` no fueron auditadas en detalle. Si hay políticas mal configuradas, usuarios no autenticados podrían leer o escribir datos de clientes.

**Propuesta:**  
Revisión manual de cada política RLS en el dashboard de Supabase:
- `reservations`: solo el admin autenticado puede leer/escribir.
- `customers`: ídem.
- `wall`: inserción pública (clientes suben fotos), pero lectura/borrado solo admin.
- `peludos`: ídem que wall.

Verificar con `curl` sin token que los endpoints protegidos devuelven 401/403.

**Beneficio:**  
Certeza de que los datos de clientes están correctamente protegidos. Cumplimiento GDPR.

**Coste / riesgo:**  
Bajo. La revisión lleva ~1 hora. Sin cambios de código salvo que se detecten problemas.

**Prioridad sugerida:** P2.

---

## Mejora #10 — Completar información legal (prioridad P1)

**Problema / oportunidad:**  
El Aviso Legal muestra el campo NIF como "pendiente". Esto puede ser un problema legal para un negocio en España.

**Propuesta:**  
El propietario proporciona el NIF/CIF del negocio (o persona física responsable) para completar el texto del Aviso Legal. Tarda menos de 5 minutos en actualizarse vía el editor de Contenido del dashboard.

**Beneficio:**  
Cumplimiento legal básico (Ley 34/2002 de Servicios de la Sociedad de la Información).

**Coste / riesgo:**  
Nulo en código. Solo requiere acción del propietario.

**Prioridad sugerida:** P1.

---

## Resumen de prioridades

| # | Mejora | Prioridad | Coste |
|---|--------|-----------|-------|
| 8 | Activar feed de Instagram (Behold.so) | P1 | Ninguno (acción usuario) |
| 10 | Completar NIF en Aviso Legal | P1 | Ninguno (acción usuario) |
| 6 | Activar Google Analytics | P1 | Muy bajo |
| 1 | Backend de CMS (Supabase) | P1 | Alto |
| 2 | Optimización de assets (WebP, lazy-load) | P2 | Bajo-medio |
| 4 | Tests automatizados (Playwright) | P2 | Medio |
| 5 | Monitorización de errores (Sentry) | P2 | Bajo |
| 9 | Audit RLS de Supabase | P2 | Bajo |
| 3 | Modularización de script.js | P2 | Alto |
| 7 | Backup automático | P3 | Medio |

---

*Documento generado al completar la Fase 6 del framework CLAUDE_ENTERPRISE_AUDIT.md v1.0.*  
*Las mejoras de este documento se implementarán en sesiones futuras, con aprobación explícita del propietario para cada una.*
