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

## 🌐 Dominio capitan-beto.es

En Vercel → tu proyecto → **Settings → Domains**:

1. Click **Add Domain** → escribí `capitan-beto.es`.
2. Vercel te muestra los DNS records que necesitás:
   - **A record** apuntando a `76.76.21.21`, o
   - **CNAME** apuntando a `cname.vercel-dns.com`
3. Andá a tu **registrador del dominio** (donde compraste capitan-beto.es) y:
   - Si tu registrador soporta CNAME para apex (Cloudflare, Vercel DNS): mejor CNAME.
   - Si no (la mayoría de registradores tradicionales): usá el A record.
4. Esperá 5-15 minutos a que el DNS propague.
5. Vercel auto-provisiona SSL (Let's Encrypt). Vas a ver el ✓ verde.

## 🔧 Post-deploy · configuración del dashboard

Después del primer deploy, andá a https://capitan-beto.es/?view=dashboard y:

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
| **Producción** | https://capitan-beto.es (después del DNS) |
| **Preview Vercel** | https://capitan-beto-pablomalce.vercel.app (después del primer deploy) |

## 🔥 Continuous deploy

Cada `git push origin main` triggea un deploy automático en Vercel.
No necesitás CLI para deploys futuros.

## ⚠️ Si algo falla

- **DNS no resuelve**: esperá 30 minutos. Si seguís sin ver el ✓ en Vercel, verificá los records con `dig capitan-beto.es`.
- **Service Worker viejo**: en DevTools → Application → Service Workers → Unregister.
- **Backend offline**: probar `curl https://ghuabxeqqmbvqzdrizrr.supabase.co/rest/v1/dishes -H "apikey: <ANON>"`.
