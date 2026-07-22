# CLAUDE_ENTERPRISE_AUDIT.md

> **Framework de Auditoría, Corrección y Modernización — Nivel Enterprise**
> Proyecto: **Capitán Beto · Gastro Taberna** (sitio oficial)
> Versión del framework: **1.0**
> Este documento es el **sistema operativo** de Claude para este proyecto.
> Léelo completo **antes de tocar una sola línea de código**.

---

## 0. CÓMO SE USA ESTE DOCUMENTO (LÉEME PRIMERO)

Este archivo es la **única fuente de verdad** sobre *cómo* debes trabajar en el proyecto Capitán Beto. No describe *qué* hay que arreglar (eso lo descubres tú auditando); describe **la metodología, las reglas y los entregables** que debes seguir siempre.

Cuando el usuario te diga algo como *"Lee `CLAUDE_ENTERPRISE_AUDIT.md` y sigue todas las instrucciones"*, tu comportamiento debe ser:

1. Leer **este documento completo**, de principio a fin, sin saltarte secciones.
2. Ejecutar el **PROTOCOLO DE ARRANQUE** (sección 3): crear la estructura documental si no existe.
3. Cargar el contexto del proyecto (leyendo el repo y rellenando `PROJECT_CONTEXT.md`).
4. Responder **únicamente**: `Contexto cargado correctamente` y esperar instrucciones.
5. No escribir código ni modificar archivos de la aplicación hasta que el usuario lo pida explícitamente.

> ⚠️ **Regla de oro:** *Entender antes de tocar. Documentar antes de corregir. Verificar antes de dar por hecho.*

---

## 1. FILOSOFÍA Y PRINCIPIOS

Trabajas como lo haría un **equipo de ingeniería senior** haciendo una auditoría formal de un producto en producción. No como un asistente que improvisa parches.

### 1.1 Principios rectores

1. **Producción primero, ego cero.** El sitio está **en vivo** (`capitan-beto.com`). Cada cambio puede afectar a clientes reales de un restaurante. Prioriza estabilidad sobre elegancia.
2. **Entender > Cambiar.** Nunca modifiques lo que no comprendes al 100%. Si no entiendes por qué existe algo, investígalo o pregunta; no lo borres "porque parece innecesario".
3. **Cambios mínimos y reversibles.** Prefiere el diff más pequeño que resuelve el problema. Un cambio grande = mayor riesgo. Divide siempre que puedas.
4. **Evidencia, no suposiciones.** Toda afirmación ("esto está roto", "esto es lento") debe respaldarse citando el archivo y la línea, o un caso de reproducción.
5. **Estabilizar antes de modernizar.** No se introducen mejoras arquitectónicas, refactors grandes ni dependencias nuevas hasta que el proyecto esté **completamente estable**.
6. **Trazabilidad total.** Todo lo que hagas queda registrado en `AUDIT_PROGRESS.md`. Si una conversación se corta, otra puede continuar leyendo ese archivo.
7. **No romper lo que funciona.** Antes de tocar un módulo, identifica y anota qué comportamiento actual debe seguir funcionando idéntico (regresión).
8. **Seguridad y privacidad no son opcionales.** Es un sitio con datos de clientes, logins de admin y GDPR. Trátalo en consecuencia.

### 1.2 Actitud esperada

- Meticuloso, escéptico y explícito.
- Si algo es ambiguo, **lo dices y propones opciones**; no eliges en silencio.
- Prefieres una pregunta bien hecha a un cambio equivocado.
- Reportas también lo que **NO** cambiaste y por qué.

---

## 2. CONTEXTO TÉCNICO DEL PROYECTO (RESUMEN)

> El detalle completo vive en `PROJECT_CONTEXT.md`. Esto es el mínimo que necesitas para no cometer errores de base. Si algo aquí contradice lo que ves en el repo, **manda el repo** y lo corriges en `PROJECT_CONTEXT.md`.

- **Producto:** sitio web oficial de una gastro taberna en Madrid. Web pública + dashboard de administración.
- **Stack:** HTML5 + CSS3 (custom properties) + **JavaScript vanilla** (patrón IIFE, ~4.2k LOC en `script.js`). **Sin framework, sin build step.**
- **Hosting:** Vercel (estático). Deploy automático al hacer push a `main`.
- **Persistencia:** **`localStorage` del navegador admin.** No hay backend con base de datos. Todo el CMS (textos, precios, imágenes, promociones, reservas, leads) vive en el cliente. Esta es la **limitación estructural más importante** del proyecto.
- **Auth admin:** Google Identity Services (GIS) + allowlist de emails.
- **i18n:** ES / EN mediante state machine en cliente (~300 claves).
- **PWA:** Service Worker (`sw.js`) + `manifest.webmanifest`, instalable.
- **GDPR:** Consent Mode v2, banner granular, modales legales.
- **Integraciones (configurables desde el dashboard):** Stripe, Redsys, PayPal, Bizum, CoverManager, TheFork, Mailchimp, Google Analytics.
- **Archivos núcleo:** `index.html`, `script.js`, `styles.css`, `sw.js`, `vercel.json`, `manifest.webmanifest`.

### 2.1 Implicaciones que debes tener siempre presentes

- **No existe estado de servidor:** una promoción "LIVE" que crea un admin solo existe en *su* navegador salvo que haya un mecanismo de exportación/publicación. Ten esto en cuenta al auditar cualquier cosa que "debería verla el público".
- **`sw.js` cachea agresivamente:** un cambio puede no verse hasta invalidar caché / bump de versión del Service Worker. Considéralo al diagnosticar "no se actualiza".
- **Sin build = sin transpilación:** el JS que escribas corre tal cual en el navegador. Cuidado con sintaxis no soportada por navegadores objetivo.
- **Regresión visual:** al ser un sitio de marca (hero cinemático, paleta editable), los cambios de CSS pueden romper el diseño en móviles. Verifica responsive.

---

## 3. PROTOCOLO DE ARRANQUE (BOOTSTRAP)

Esto es lo **primero** que ejecutas cuando el usuario pide iniciar. Es **automático**: no pidas permiso para crear la estructura documental; es parte del framework.

### 3.1 Pasos de arranque (en orden estricto)

1. **Leer el repositorio completo.** Recorre todos los archivos relevantes (`index.html`, `script.js`, `styles.css`, `sw.js`, `vercel.json`, `manifest.webmanifest`, `README.md`, `SECURITY.md`, `DEPLOY.md`, y las carpetas de assets). No asumas: lee.
2. **Identificar documentación existente.** Registra qué docs ya hay y qué información aportan.
3. **Crear la carpeta `/docs`** si no existe.
4. **Crear los archivos de trabajo** si no existen (ver 3.2). Si ya existen, **no los sobrescribas**: léelos y continúa desde su estado.
5. **Rellenar `PROJECT_CONTEXT.md`** con la información real obtenida del repo (no plantilla vacía: datos concretos).
6. **Rellenar `AUDIT_PROGRESS.md`** con el estado inicial (fecha, alcance, "auditoría no iniciada").
7. **Crear `CLAUDE.md` en la raíz** como punto de entrada del repo (ver 3.3).
8. **Esperar.** Cuando toda la estructura exista y el contexto esté cargado, responde solo: `Contexto cargado correctamente`. **No empieces la auditoría hasta que te lo pidan.**

> Nunca comiences a modificar código de la aplicación hasta que **toda** esta estructura exista y el contexto esté cargado.

### 3.2 Estructura documental que debes crear

```
/docs
├── CLAUDE_ENTERPRISE_AUDIT.md   ← este manual (ya existe; no lo modifiques)
├── PROJECT_CONTEXT.md           ← contexto real del proyecto (lo rellenas tú)
├── AUDIT_PROGRESS.md            ← estado vivo de la auditoría (lo actualizas siempre)
├── AUDIT_REPORT.md              ← informe final (solo se escribe al final)
├── ARCHITECTURE_NOTES.md        ← notas de arquitectura (opcional, según hallazgos)
└── IMPROVEMENTS.md              ← roadmap de mejoras futuras (no se implementan solas)

/CLAUDE.md                       ← punto de entrada en la raíz del repo
```

### 3.3 Contenido de `/CLAUDE.md` (raíz)

Crea en la raíz del repo un `CLAUDE.md` **breve**, con exactamente este espíritu:

```markdown
# Claude Instructions — Capitán Beto

Este proyecto se desarrolla siguiendo el framework definido en:
/docs/CLAUDE_ENTERPRISE_AUDIT.md

Antes de realizar cualquier modificación debes leer completamente:
- /docs/CLAUDE_ENTERPRISE_AUDIT.md
- /docs/PROJECT_CONTEXT.md
- /docs/AUDIT_PROGRESS.md

Reglas:
- No modifiques código hasta comprender completamente el proyecto.
- Toda corrección sigue la metodología del framework.
- Toda mejora se valida mediante QA antes de darse por terminada.
- Mantén AUDIT_PROGRESS.md actualizado durante todo el proceso.
- Prioridad #1 hasta nueva orden: reparar el módulo de Promociones del Back Office.
```

### 3.4 Plantillas de los documentos de trabajo

**`PROJECT_CONTEXT.md`** (rellenar con datos reales):

```markdown
# PROJECT_CONTEXT — Capitán Beto

## Identidad del proyecto
- Nombre / marca:
- Objetivo del sitio:
- URL de producción:
- Público objetivo:

## Arquitectura
- Frontend (tecnologías, patrón, LOC aprox.):
- Hosting / deploy:
- Persistencia de datos:
- Autenticación admin:
- i18n:
- PWA / Service Worker:
- GDPR / consentimiento:

## Módulos del sitio público
- (lista con una línea por módulo)

## Módulos del Back Office / Dashboard
- (lista con una línea por módulo)

## Integraciones externas
- (pasarelas de pago, reservas, marketing, analytics)

## Archivos núcleo y responsabilidad de cada uno
- index.html:
- script.js:
- styles.css:
- sw.js:
- vercel.json:
- manifest.webmanifest:

## Limitaciones estructurales conocidas
- (p.ej. sin backend, estado solo en localStorage, caché del SW, etc.)

## Comportamientos que NO deben romperse (regresión crítica)
- (lista)
```

**`AUDIT_PROGRESS.md`** (documento vivo — ver sección 6 para el formato de entradas):

```markdown
# AUDIT_PROGRESS — Capitán Beto

## Estado general
- Fase actual:
- Última actualización:
- Prioridad activa: Reparar módulo de Promociones (Back Office)

## Resumen de módulos auditados
| Módulo | Estado | Severidad máx. | Notas |
|--------|--------|----------------|-------|

## Problemas encontrados
(ver formato de hallazgo en el framework, sección 6.2)

## Problemas corregidos
(ver formato de corrección, sección 6.3)

## Pendientes / próximos pasos
-

## Decisiones y suposiciones registradas
-
```

**`AUDIT_REPORT.md`** y **`IMPROVEMENTS.md`**: se crean vacíos con su encabezado; solo se rellenan al final (ver secciones 9 y 10).

---

## 4. FLUJO DE TRABAJO GENERAL

El trabajo se organiza en **fases secuenciales**. No saltes fases.

```
FASE 0 · Arranque        → estructura documental + contexto cargado
FASE 1 · Comprensión     → entender el proyecto completo, mapa mental
FASE 2 · Auditoría       → detectar y clasificar todos los problemas
FASE 3 · Plan            → priorizar y planificar correcciones
FASE 4 · Corrección      → arreglar (empezando por Promociones)
FASE 5 · QA              → verificar cada corrección
FASE 6 · Informe         → AUDIT_REPORT.md + IMPROVEMENTS.md
```

**Regla de secuencia:** No pasas a la siguiente fase sin cerrar la anterior y dejarla registrada en `AUDIT_PROGRESS.md`. La corrección (Fase 4) no empieza hasta que exista un plan aprobado (Fase 3). No se abordan mejoras arquitectónicas hasta que el proyecto esté estable.

---

## 5. FASE 1 — COMPRENSIÓN DEL PROYECTO

Objetivo: construir un **modelo mental completo** antes de auditar. Salida: sección "Arquitectura" y "Módulos" de `PROJECT_CONTEXT.md` completas + `ARCHITECTURE_NOTES.md` si hace falta.

### 5.1 Checklist de comprensión

- [ ] Leí `index.html` entero y sé qué secciones/vistas contiene.
- [ ] Leí `script.js` entero e identifiqué sus bloques: state machine, i18n, CMS, chat, auth, dashboard.
- [ ] Entiendo cómo se guarda y se lee el estado (`localStorage`: qué claves, qué forma).
- [ ] Entiendo el flujo de datos del **Back Office** hacia la **web pública** (qué persiste, qué no).
- [ ] Mapeé cada módulo del dashboard con la parte pública que afecta.
- [ ] Entiendo cómo funciona el login admin (GIS + allowlist) y dónde se valida.
- [ ] Entiendo el Service Worker: qué cachea, estrategia, y cómo se versiona.
- [ ] Entiendo `vercel.json`: headers de seguridad, caché, redirects.
- [ ] Sé cómo se sirve/prueba en local (`python3 -m http.server ...`).

### 5.2 Mapa de módulos (rellénalo en PROJECT_CONTEXT)

Para **cada** módulo, registra: nombre, archivo(s) implicados, funciones clave, clave(s) de `localStorage` que usa, parte pública afectada, y estado ("no auditado" al inicio).

---

## 6. FASE 2 — AUDITORÍA

Objetivo: encontrar **todos** los problemas y clasificarlos. No corriges nada aún: solo detectas, reproduces y documentas.

### 6.1 Dimensiones a auditar (checklist maestro)

**A. Funcionalidad**
- [ ] Cada módulo del dashboard hace lo que dice (crear, editar, guardar, borrar).
- [ ] Los cambios del Back Office se reflejan donde deben (o se documenta que no persisten por diseño).
- [ ] Reservas: flujo completo (WhatsApp / Calendar / email) sin errores.
- [ ] Menú (4 tabs, ítems), galerías, uploaders, chatbot, reseñas.
- [ ] **Promociones (PRIORIDAD):** crear, editar, activar/LIVE, expirar, mostrar en público.

**B. Errores y robustez**
- [ ] Errores en consola (JS) en carga y en cada interacción.
- [ ] Manejo de casos límite: `localStorage` lleno/no disponible, datos corruptos, JSON inválido.
- [ ] Estados vacíos (sin promociones, sin reservas, sin fotos).
- [ ] Fallos de red en integraciones externas.

**C. Seguridad**
- [ ] Validación real del allowlist de admins (no solo ocultar UI).
- [ ] XSS: contenido editable inyectado en el DOM sin sanitizar (`innerHTML`).
- [ ] Exposición de secretos/keys en el cliente (Client IDs, tokens).
- [ ] Headers de seguridad en `vercel.json` (CSP, X-Frame-Options, etc.).
- [ ] Datos personales (leads/reservas) en `localStorage`: implicaciones GDPR.
- [ ] Cumplimiento de lo declarado en `SECURITY.md`.

**D. Rendimiento**
- [ ] Peso de assets (imágenes en `crew/`, `momentos/`, `videos/`), formatos, lazy-load.
- [ ] Tamaño y parseo de `script.js`; trabajo bloqueante en el hilo principal.
- [ ] Estrategia de caché del SW; Core Web Vitals aproximados.

**E. Accesibilidad (a11y)**
- [ ] Contraste, foco, navegación por teclado, `alt`, roles ARIA, labels de formularios.

**F. i18n**
- [ ] Todas las claves ES/EN presentes; sin texto hardcodeado; cambio de idioma sin romper estado.

**G. SEO / PWA / GDPR**
- [ ] `sitemap.xml`, `robots.txt`, metatags, OG. Manifest válido, instalabilidad, offline.
- [ ] Consent Mode v2 correcto; que no se carguen scripts antes del consentimiento.

**H. Calidad de código**
- [ ] Duplicación, funciones enormes, nombres, código muerto, TODO/FIXME, consistencia.

### 6.2 Formato de un HALLAZGO (registrar en AUDIT_PROGRESS.md)

Cada problema encontrado se registra así:

```markdown
### [ID: PROMO-001] Título corto y claro
- **Módulo:** Promociones (Back Office)
- **Severidad:** Crítica | Alta | Media | Baja
- **Tipo:** Funcional | Seguridad | Rendimiento | a11y | i18n | UX | Código
- **Archivo(s):** script.js:1234–1260
- **Descripción:** Qué falla, con precisión.
- **Reproducción:** Pasos exactos para reproducir.
- **Evidencia:** Fragmento de código / mensaje de consola / captura.
- **Impacto:** Qué consecuencia tiene para el usuario/negocio.
- **Causa raíz (hipótesis):** Por qué ocurre.
- **Estado:** Detectado
```

### 6.3 Escala de severidad

- **Crítica:** rompe funcionalidad principal, pérdida de datos, o brecha de seguridad. Se atiende primero.
- **Alta:** funcionalidad importante degradada o riesgo relevante.
- **Media:** molesto pero con workaround; afecta calidad.
- **Baja:** cosmético, mejora menor, deuda técnica leve.

---

## 7. FASE 3 — PLAN DE TRABAJO

Con todos los hallazgos, produces un **plan priorizado** antes de corregir.

### 7.1 Reglas de priorización

1. **Promociones primero.** La reparación completa del módulo de Promociones del Back Office es la **prioridad #1** hasta nueva orden. No arranques otras mejoras hasta que Promociones esté estable y verificado.
2. Luego, por severidad: Críticas → Altas → Medias → Bajas.
3. Dentro del mismo nivel, prioriza lo que desbloquea a otros o reduce riesgo.
4. **Estabilidad antes que modernización.** Nada de refactors arquitectónicos ni dependencias nuevas hasta que el proyecto esté completamente estable.

### 7.2 Formato del plan (en AUDIT_PROGRESS.md)

Para cada corrección planificada: ID del hallazgo, enfoque propuesto, archivos a tocar, riesgo de regresión, cómo se verificará (criterio de QA), y estimación de impacto. Presenta el plan al usuario y **espera aprobación** antes de ejecutar cambios de código.

---

## 8. FASE 4 — CORRECCIÓN

### 8.1 Reglas al corregir

1. **Una corrección a la vez.** Un hallazgo → un cambio coherente → su verificación. No mezcles arreglos no relacionados.
2. **Diff mínimo.** El cambio más pequeño que resuelve el problema de raíz (no un parche que oculta el síntoma).
3. **Preserva el comportamiento existente** salvo el bug que arreglas. Anota qué regresiones vigilas.
4. **No introduzcas dependencias** nuevas sin justificarlo y obtener aprobación.
5. **Respeta el estilo del código** existente (vanilla, IIFE, sin build).
6. **Cuidado con el Service Worker:** si el fix afecta a assets cacheados, indica el bump de versión necesario para que el cambio llegue a los usuarios.
7. **Sanitiza** cualquier contenido editable que se inserte en el DOM.
8. Tras cada corrección, **actualiza `AUDIT_PROGRESS.md`** (mueve el hallazgo a "corregido") antes de pasar al siguiente.

### 8.2 Procedimiento específico — Módulo de Promociones (PRIORIDAD)

Sigue este orden al reparar Promociones:

1. **Mapear** el ciclo de vida completo de una promoción: creación → almacenamiento (clave de `localStorage` y forma del objeto) → activación/LIVE → renderizado en la web pública → expiración/borrado.
2. **Reproducir** cada fallo y registrarlo con ID `PROMO-###`.
3. **Diagnosticar la causa raíz** de cada fallo (no el síntoma).
4. **Corregir** empezando por lo que impide el flujo básico (crear/guardar) antes que lo accesorio (estilos, orden).
5. **Verificar** el flujo end-to-end: crear una promo, ponerla LIVE, comprobar que aparece donde debe, editarla, expirarla, borrarla, y recargar (persistencia).
6. **Casos límite:** sin promociones, promo con datos vacíos/inválidos, fechas de expiración pasadas, varias promos simultáneas, `localStorage` no disponible.
7. Dejar el módulo con estado **"estable y verificado"** en `AUDIT_PROGRESS.md` antes de continuar.

### 8.3 Formato de una CORRECCIÓN (registrar en AUDIT_PROGRESS.md)

```markdown
### [ID: PROMO-001] — CORREGIDO
- **Cambio:** Descripción precisa de qué se modificó.
- **Archivo(s):** script.js:1234–1260 (y cualquier otro)
- **Enfoque:** Por qué esta solución y no otra.
- **Regresiones vigiladas:** Qué comportamiento verifiqué que sigue igual.
- **QA:** Cómo se verificó (ver Fase 5) y resultado.
- **Nota SW/caché:** ¿Requiere bump de versión del Service Worker? Sí/No.
- **Estado:** Corregido y verificado
```

---

## 9. FASE 5 — QA / CONTROL DE CALIDAD

Ninguna corrección se considera terminada sin QA. **Una corrección sin verificar no está hecha.**

### 9.1 Checklist de QA por corrección

- [ ] El bug reportado ya **no se reproduce** (mismos pasos que en el hallazgo).
- [ ] **Sin errores nuevos** en consola (carga + interacción del módulo).
- [ ] **Sin regresiones:** los comportamientos vigilados siguen idénticos.
- [ ] **Casos límite** probados (vacío, datos inválidos, límites).
- [ ] **Responsive:** se ve bien en móvil y escritorio (si tocó UI/CSS).
- [ ] **i18n:** funciona en ES y EN (si tocó texto/UI).
- [ ] **Persistencia:** sobrevive a recarga y, si aplica, a limpiar/repoblar `localStorage`.
- [ ] **PWA/SW:** si tocó assets, la estrategia de caché no deja al usuario con versión vieja.
- [ ] Cambio registrado en `AUDIT_PROGRESS.md` con evidencia.

### 9.2 Cómo verificar (sin build)

- Servir en local: `python3 -m http.server 5173 --bind 127.0.0.1` y probar en el navegador.
- Revisar la consola y la pestaña Application → Local Storage / Service Workers.
- Para cambios de lógica pura, se pueden escribir comprobaciones aisladas y ejecutarlas.
- Documenta **qué probaste y el resultado**, no solo "funciona".

### 9.3 Verificación reforzada (cambios de alto riesgo)

Para correcciones críticas (seguridad, pérdida de datos, flujo de Promociones/Reservas), haz una **segunda pasada de verificación** con mirada fresca: revisa el diff completo como si fueras otro ingeniero, busca efectos colaterales, y solo entonces marca como verificado.

---

## 10. FASE 6 — INFORMES

### 10.1 `AUDIT_REPORT.md` (informe final)

No se toca durante la auditoría; se redacta al final. Debe incluir:

1. **Resumen ejecutivo** (para no técnicos): estado general, qué se arregló, riesgo residual.
2. **Alcance y metodología.**
3. **Hallazgos por severidad**, con IDs y estado (corregido / diferido).
4. **Detalle del módulo de Promociones:** qué estaba mal, qué se hizo, estado final.
5. **Correcciones aplicadas** (tabla: ID, módulo, severidad, resultado).
6. **Riesgos residuales y limitaciones** (p. ej. la ausencia de backend).
7. **Recomendaciones** (enlazan con `IMPROVEMENTS.md`).
8. **Métricas antes/después** cuando existan (errores en consola, peso, etc.).

### 10.2 `IMPROVEMENTS.md` (roadmap futuro)

Todas las mejoras recomendadas para futuras versiones. **No se implementan automáticamente.** Cada entrada: título, problema/oportunidad, propuesta, beneficio, coste/riesgo estimado, prioridad sugerida. Candidato natural nº 1: **backend real** para persistencia global (hoy todo vive en `localStorage`).

---

## 11. GESTIÓN DE `AUDIT_PROGRESS.md` (DOCUMENTO VIVO)

`AUDIT_PROGRESS.md` es tu memoria entre sesiones. Reglas:

- **Actualízalo continuamente**, no al final. Cada hallazgo, cada corrección, cada decisión.
- Mantén el "Estado general" y "Última actualización" al día.
- Si una sesión se corta, la siguiente **debe poder continuar** solo leyendo este archivo.
- Registra **suposiciones y decisiones** (para no repetir debates).
- No re-audites lo ya auditado salvo que sea necesario; márcalo como completado.

---

## 12. REGLAS DURAS (NUNCA / SIEMPRE)

**NUNCA:**
- Modifiques código antes de completar el arranque y comprender el proyecto.
- Empieces mejoras arquitectónicas antes de que el proyecto esté estable.
- Toques el módulo de Promociones sin mapear su ciclo de vida completo primero.
- Introduzcas dependencias/frameworks/build sin aprobación explícita.
- Insertes contenido editable en el DOM sin sanitizar.
- Des una corrección por terminada sin QA.
- Sobrescribas `PROJECT_CONTEXT.md` / `AUDIT_PROGRESS.md` existentes: léelos y continúa.
- Expongas o inventes secretos, tokens o Client IDs.
- Hagas cambios grandes en un solo diff cuando puedes dividirlos.

**SIEMPRE:**
- Lee este documento completo al iniciar cualquier sesión nueva.
- Prioriza Promociones hasta nueva orden.
- Registra hallazgos y correcciones con su formato en `AUDIT_PROGRESS.md`.
- Verifica regresiones y casos límite.
- Ten en cuenta el Service Worker al cambiar assets.
- Explica qué NO cambiaste y por qué, cuando sea relevante.
- Ante ambigüedad, pregunta y ofrece opciones.

---

## 13. PROTOCOLOS DE CONVERSACIÓN (COPIA/PEGA PARA EL USUARIO)

> Estos son los mensajes que el usuario te enviará. Reconócelos y actúa según el framework.

### 13.1 Iniciar / cargar contexto (primer mensaje de cualquier sesión)

```
Lee CLAUDE_ENTERPRISE_AUDIT.md y sigue todas las instrucciones contenidas en él.

Lee completamente, en este orden:
1. /docs/CLAUDE_ENTERPRISE_AUDIT.md
2. /docs/PROJECT_CONTEXT.md   (si no existe, créalo según el framework)
3. /docs/AUDIT_PROGRESS.md    (si no existe, créalo según el framework)

Cuando termines responde únicamente: "Contexto cargado correctamente".
No modifiques ningún archivo de la aplicación todavía. No escribas código.
No hagas suposiciones. Espera mis instrucciones.
```

### 13.2 Comenzar la auditoría

```
Comienza la auditoría completa siguiendo estrictamente CLAUDE_ENTERPRISE_AUDIT.md.

1. Primero comprende completamente el proyecto (Fase 1).
2. Luego realiza la auditoría completa (Fase 2).
3. Después genera el plan de trabajo priorizado (Fase 3) y espera mi aprobación.

Recuerda: la prioridad #1 es reparar completamente el módulo de Promociones del
Back Office. No comiences mejoras arquitectónicas hasta que el proyecto esté
completamente estable. Actualiza AUDIT_PROGRESS.md durante todo el proceso.
```

### 13.3 Continuar otro día (sesión nueva)

```
Continúa la auditoría.

Lee nuevamente:
- /docs/CLAUDE_ENTERPRISE_AUDIT.md
- /docs/PROJECT_CONTEXT.md
- /docs/AUDIT_PROGRESS.md

Continúa exactamente desde el último punto registrado en AUDIT_PROGRESS.md.
No vuelvas a analizar partes ya auditadas salvo que sea necesario.
```

### 13.4 Autorizar correcciones

```
Aprobado el plan. Ejecuta las correcciones en el orden definido, empezando por
Promociones. Una corrección a la vez, con QA y registro en AUDIT_PROGRESS.md
antes de pasar a la siguiente.
```

### 13.5 Generar informe final

```
La auditoría y las correcciones están completas. Genera AUDIT_REPORT.md y
IMPROVEMENTS.md según el framework.
```

---

## 14. CHECKLIST RÁPIDO DE SESIÓN (RESUMEN OPERATIVO)

Al iniciar cualquier sesión:

1. ¿Leí `CLAUDE_ENTERPRISE_AUDIT.md` completo? → si no, hazlo.
2. ¿Existe `/docs` con los archivos de trabajo? → si no, créalos (Fase 0).
3. ¿`PROJECT_CONTEXT.md` refleja el repo real? → si no, actualízalo.
4. ¿Leí `AUDIT_PROGRESS.md` y sé en qué punto estamos? → sí.
5. ¿Cuál es la prioridad activa? → Promociones (salvo orden en contra).
6. Responder `Contexto cargado correctamente` y esperar instrucciones.

---

*Fin del framework. Este documento es la referencia operativa del proyecto Capitán Beto. Cualquier nueva sesión de Claude debe comenzar aquí.*
