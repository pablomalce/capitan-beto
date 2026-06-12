# Deploy · Capitán Beto

## ✅ Pre-deploy checklist
- [x] Repo público: https://github.com/pablomalce/capitan-beto
- [x] vercel.json con headers de seguridad, cache y redirects
- [x] Service Worker + manifest PWA
- [x] CSP, HSTS, X-Frame-Options en headers
- [x] Backend Supabase activo (proyecto `capitan-beto` · eu-west-1)
- [x] RLS configurado: público inserta, admin moderá
- [x] Auth real con email/password vía Supabase Auth
- [x] Dashboard wirea reservas, clientes, wall, peludos al backend

## 🚀 Deploy a Vercel (1 sola vez, 2 minutos)

### Opción A · Desde el dashboard de Vercel (recomendada)

1. Andá a **https://vercel.com/new** y logueate con tu cuenta GitHub.
2. Click **Import Git Repository** → buscá `pablomalce/capitan-beto` → **Import**.
3. **Framework Preset**: dejá `Other` (sitio estático).
4. **Build & Output Settings**: nada que tocar (sin build, output root es `./`).
5. **Environment Variables**: dejá vacío por ahora (configurable después).
6. Click **Deploy**.

En ~30 segundos tenés una URL `*.vercel.app` viva.

### Opción B · Desde el CLI local

```bash
cd /Users/pablo/capitan-beto
npx vercel login          # se abre el browser, login con GitHub
npx vercel link            # vincula el repo a un proyecto Vercel (te pregunta org/proyecto)
npx vercel --prod          # deploy a producción
```

## 🌐 Dominio capitan-beto.com (comprado en Hostinger)

### Paso 1 · En Vercel
**Settings → Domains → Add Domain** → `capitan-beto.com`
Vercel te muestra los records DNS que necesita. Apuntalo a:
- **A record** `@` → `76.76.21.21`
- **CNAME** `www` → `cname.vercel-dns.com`

### Paso 2 · En Hostinger (DNS Zone Editor)
1. Login en https://hpanel.hostinger.com
2. Andá a **Domains → capitan-beto.com → DNS Zone Editor** (o "DNS / Nameservers").
3. **Borrá** cualquier A record existente para `@` y CNAME para `www` que apunten a otro lugar.
4. **Agregá estos 2 records**:

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| `A`     | `@`    | `76.76.21.21`              | 14400 (o el default) |
| `CNAME` | `www`  | `cname.vercel-dns.com`     | 14400 |

5. Save changes.
6. Volvé a Vercel → la verificación del dominio tarda 5–30 minutos.
7. Vercel auto-provisiona SSL (Let's Encrypt). Vas a ver el ✓ verde cuando esté listo.

### Verificar propagación DNS
```bash
dig capitan-beto.com +short        # debería devolver 76.76.21.21
dig www.capitan-beto.com +short    # debería devolver el CNAME de Vercel
```

### Redirect www → apex (recomendado)
En Vercel → Settings → Domains, marcá `capitan-beto.com` como **principal**.
El `www.capitan-beto.com` redirecciona automáticamente.

## 🔧 Post-deploy · configuración del dashboard

Después del primer deploy, andá a https://capitan-beto.com/?view=dashboard y:

### 1. Login admin (primera vez)
- Email: `capitanbetomadrid@gmail.com`
- Password temporal: `CapitanBeto2026!`
- **CRÍTICO**: cambiala desde Supabase Dashboard → Authentication → Users → tu user → Reset password.

### 2. Configurar canales (Dashboard → Canales)
- Pegá la URL de tu Google Business Profile "Dejar reseña"
- Confirmá el activation link de FormSubmit en `capitanbetomadrid@gmail.com`

### 3. Configurar pagos (Dashboard → Pagos & Integraciones)
- Si activás Stripe/Redsys/etc., pegá las publishable keys (las private NO, son backend)

### 4. Actualizar datos legales (Dashboard → Contenido)
- NIF real
- Datos del responsable

### 5. Google OAuth Client ID (opcional)
Si querés OAuth Google en lugar del email/password:
- Crear el OAuth Client en https://console.cloud.google.com/apis/credentials
- En el script.js editar `GOOGLE_CLIENT_ID`

## 📊 URLs importantes

| Servicio | URL |
|---|---|
| **Repo** | https://github.com/pablomalce/capitan-beto |
| **Supabase** | https://supabase.com/dashboard/project/ghuabxeqqmbvqzdrizrr |
| **Producción** | https://capitan-beto.com (después del DNS) |
| **Preview Vercel** | https://capitan-beto-pablomalce.vercel.app (después del primer deploy) |

## 🔥 Continuous deploy

Cada `git push origin main` triggea un deploy automático en Vercel.
No necesitás CLI para deploys futuros.

## ⚠️ Si algo falla

- **DNS no resuelve**: esperá 30 minutos. Si seguís sin ver el ✓ en Vercel, verificá los records con `dig capitan-beto.com`.
- **Service Worker viejo**: en DevTools → Application → Service Workers → Unregister.
- **Backend offline**: probar `curl https://ghuabxeqqmbvqzdrizrr.supabase.co/rest/v1/dishes -H "apikey: <ANON>"`.
