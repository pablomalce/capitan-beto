# HOWTO — Cómo ejecutar la auditoría de Capitán Beto

Guía rápida de los mensajes que le envías a Claude para ejecutar todo el
framework definido en `docs/CLAUDE_ENTERPRISE_AUDIT.md`.

**Importante:** usa una sesión de Claude con acceso al repositorio (Claude Code,
o Cowork con la carpeta del repo conectada). En un chat normal sin acceso a los
archivos no podrá leer ni crear los documentos.

El diseño garantiza que **hasta que no apruebes el plan (paso 3), Claude no toca
ni una línea de código**. Tú mantienes el control en todo momento.

---

## 1 · Cargar contexto  (primer mensaje de cualquier sesión)

```
Lee CLAUDE_ENTERPRISE_AUDIT.md y sigue todas las instrucciones contenidas en él.
Lee, en este orden: /docs/CLAUDE_ENTERPRISE_AUDIT.md, /docs/PROJECT_CONTEXT.md,
/docs/AUDIT_PROGRESS.md (si no existen, créalos según el framework).
Cuando termines responde únicamente: "Contexto cargado correctamente".
No modifiques nada todavía. Espera mis instrucciones.
```

Resultado esperado: responde solo `Contexto cargado correctamente` y habrá creado
`/docs`, `PROJECT_CONTEXT.md`, `AUDIT_PROGRESS.md` y demás archivos de trabajo.

---

## 2 · Iniciar la auditoría  (comprender + detectar + plan)

```
Comienza la auditoría completa siguiendo estrictamente CLAUDE_ENTERPRISE_AUDIT.md.
1. Comprende el proyecto (Fase 1). 2. Auditoría completa (Fase 2).
3. Genera el plan priorizado (Fase 3) y espera mi aprobación.
Prioridad #1: reparar el módulo de Promociones. Actualiza AUDIT_PROGRESS.md.
```

Aquí **no cambia código todavía**: te presenta los problemas encontrados y un
plan de trabajo priorizado.

---

## 3 · Autorizar las correcciones  (después de revisar el plan)

```
Aprobado el plan. Ejecuta las correcciones en el orden definido, empezando por
Promociones. Una corrección a la vez, con QA y registro en AUDIT_PROGRESS.md
antes de pasar a la siguiente.
```

---

## 4 · Continuar otro día  (sesión nueva)

```
Continúa la auditoría. Lee /docs/CLAUDE_ENTERPRISE_AUDIT.md,
/docs/PROJECT_CONTEXT.md y /docs/AUDIT_PROGRESS.md.
Continúa desde el último punto registrado. No re-audites lo ya auditado.
```

---

## 5 · Informe final  (cuando el proyecto esté estable)

```
La auditoría y las correcciones están completas. Genera AUDIT_REPORT.md e
IMPROVEMENTS.md según el framework.
```

---

*Referencia completa de la metodología: `docs/CLAUDE_ENTERPRISE_AUDIT.md`.*
