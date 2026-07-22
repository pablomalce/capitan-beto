# IMPROVEMENTS — Capitán Beto

> **Estado:** Pendiente — se rellena al completar la auditoría (Fase 6).
> Contiene el roadmap de mejoras futuras recomendadas. No se implementan automáticamente.

## Candidatos preliminares (identificados en arranque)

### Backend real para persistencia global
- **Problema:** Todo el CMS vive en localStorage del navegador admin. Cambios no se propagan al público.
- **Propuesta:** Implementar backend (Supabase o similar) para almacenar promos, precios, textos, horarios.
- **Beneficio:** Los dueños podrían actualizar la web desde cualquier dispositivo y los clientes verían cambios en tiempo real.
- **Coste/riesgo:** Alto — cambio arquitectónico mayor.
- **Prioridad sugerida:** Alta (a largo plazo)

*(Se completará al finalizar la auditoría formal)*
