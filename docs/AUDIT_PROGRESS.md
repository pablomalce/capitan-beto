# AUDIT_PROGRESS — Capitán Beto

## Estado general
- **Fase actual:** FASE 0 completada — Arranque y carga de contexto
- **Última actualización:** 2026-07-22
- **Prioridad activa:** Reparar módulo de Promociones (Back Office)

## Resumen de módulos auditados
| Módulo | Estado | Severidad máx. | Notas |
|--------|--------|----------------|-------|
| Inventario | No auditado | — | Paginación añadida (20/pág). Funcional visualmente. |
| Contenido | No auditado | — | — |
| Imágenes | No auditado | — | — |
| Reservas | No auditado | — | Integrado con Supabase |
| Clientes | No auditado | — | Integrado con Supabase |
| Wall (#BetosPic) | No auditado | — | — |
| Peludos | No auditado | — | — |
| **Promociones** | **No auditado** | **Crítica (preliminar)** | **Sin lógica real de CRUD ni persistencia. PRIORIDAD #1.** |
| Horarios | No auditado | Alta (preliminar) | Cambios no persisten (hardcoded en HOURS) |
| Canales | No auditado | — | — |
| Secciones | No auditado | — | — |
| Diseño | No auditado | — | — |
| Stats | No auditado | — | KPI "Promos LIVE" hardcoded en HTML (muestra "2") |
| Backup | No auditado | — | — |
| Pagos | No auditado | — | — |
| Eventos | No auditado | — | — |
| Fidelización | No auditado | — | — |
| QR | No auditado | — | — |
| Mi Cuenta | No auditado | — | Cambio de contraseña recién implementado |

## Problemas detectados (preliminar — sin auditoría formal aún)

### [ID: PROMO-000] Módulo de Promociones sin funcionalidad real
- **Módulo:** Promociones (Back Office)
- **Severidad:** Crítica
- **Tipo:** Funcional
- **Archivo(s):** index.html:1487–1521, script.js:~1535–1546
- **Descripción:** El panel de Promociones tiene UI decorativa: 2 promos hardcodeadas en HTML, botones "Editar" que solo disparan un toast genérico (`toast.savedPromo`), y "Nueva promoción" que también solo hace toast. No existe ninguna lógica de CRUD, no hay clave de localStorage para promos, y los cambios jamás se reflejan en el sitio público.
- **Reproducción:** Ir al dashboard → Promociones → hacer click en "Editar" o "Nueva promoción" → solo aparece toast "Promoción guardada", sin modal/formulario real.
- **Impacto:** El módulo de Promociones es completamente inoperativo. Los dueños no pueden crear, editar, activar ni desactivar promos reales.
- **Causa raíz (hipótesis):** La UI fue creada como placeholder/mockup y nunca se implementó la lógica subyacente.
- **Estado:** Detectado (pre-auditoría)

### [ID: HOURS-000] Horarios del dashboard no persisten
- **Módulo:** Horarios (Back Office)
- **Severidad:** Alta
- **Tipo:** Funcional
- **Archivo(s):** script.js (constante HOURS hardcoded), index.html:1523–1535
- **Descripción:** El formulario de horarios en el dashboard permite editar valores visualmente, pero los cambios se pierden al recargar porque los horarios reales los controla la constante `HOURS` hardcoded en script.js.
- **Estado:** Detectado (pre-auditoría)

### [ID: SW-000] Desincronización Service Worker vs versión de assets
- **Módulo:** PWA / Service Worker
- **Severidad:** Media
- **Tipo:** Rendimiento / UX
- **Archivo(s):** sw.js:3, index.html:2549
- **Descripción:** `sw.js` tiene `VERSION = "v40"` y precachea `script.js?v=40` y `styles.css?v=40`. El HTML actual referencia `script.js?v=71`. Usuarios con SW activo podrían recibir versiones cacheadas desactualizadas de assets. El SW cachea assets con `?v=40` pero el HTML pide `?v=71` — el SW no tiene esa URL en su shell cache, por lo que irá a red para v71 (correcto), pero el SHELL_CACHE sigue teniendo v40 stale.
- **Estado:** Detectado (pre-auditoría)

### [ID: KPI-000] KPI "Promos LIVE" hardcoded
- **Módulo:** Stats / Dashboard
- **Severidad:** Baja
- **Tipo:** Funcional
- **Archivo(s):** index.html:1344–1345
- **Descripción:** `<strong id="kpiPromos">2</strong>` está hardcodeado en HTML. No se actualiza dinámicamente porque no existe un sistema real de promos.
- **Estado:** Detectado (pre-auditoría)

## Problemas corregidos (histórico pre-framework)
*(Correcciones realizadas antes de instalar este framework — no auditadas formalmente)*
- Horarios actualizados a turno seguido 14:00, martes cerrado
- Sistema de roles admin/edit implementado
- Login por contraseña añadido como primario
- Panel "Mi Cuenta" para cambio de contraseña
- Duplicado de título en sección horarios eliminado
- Paginación de inventario (20/pág) implementada
- Eyebrow redundante "La Pizarra / Hoy en la barra" unificado

## Pendientes / próximos pasos
1. **Esperar instrucción del usuario** para iniciar Fase 1 (comprensión formal) y Fase 2 (auditoría).
2. Prioridad #1 cuando se autorice: auditar y reparar completamente el módulo de Promociones (PROMO-000).
3. Resolver desincronización SW-000 (bump de versión en sw.js).
4. Auditar persistencia de horarios (HOURS-000).

## Decisiones y suposiciones registradas
- 2026-07-22: Se asume que las correcciones pre-framework son estables (paginación, roles, login, horarios). No re-auditadas aún.
- 2026-07-22: El módulo de Promociones se trata como "no implementado" (placeholder), no como "roto" — la diferencia importa para la estrategia de corrección (construir desde cero vs. reparar).
- 2026-07-22: Supabase se usa solo para Auth y 4 tablas (reservas, clientes, wall, peludos). El resto del CMS sigue en localStorage.
