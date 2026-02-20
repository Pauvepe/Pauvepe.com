# ERRORES Y SOLUCIONES - pauvepe.com

## Errores encontrados y como se solucionaron

### 1. Dark mode flash
**Problema**: Al cargar la pagina, se veia un flash de tema incorrecto.
**Solucion**: Inline script en layout.tsx que lee localStorage ANTES de React hydration:
```html
<script dangerouslySetInnerHTML={{ __html: `(function(){...})()` }} />
```
Con `suppressHydrationWarning` en el `<html>` tag.

### 2. prefers-color-scheme vs data-theme
**Problema**: El dark mode con `@media (prefers-color-scheme: dark)` no permite toggle manual.
**Solucion**: Cambiar a `[data-theme="dark"]` en globals.css y controlar via JS/React.

### 3. Supabase SQL execution
**Problema**: No hay endpoint directo para ejecutar SQL en Supabase REST API.
- `rest/v1/rpc/exec_sql` → funcion no existe
- `/pg/query` → path invalido
**Solucion**: Usar Supabase Management API: `POST api.supabase.com/v1/projects/{ref}/database/query` con access token de Supabase dashboard.

### 4. Vercel env vars
**Problema**: `vercel env pull` SOBREESCRIBE .env.local completamente.
**Solucion**: Nunca usar `vercel env pull` sin backup. Mejor usar `vercel env add` individualmente.

### 5. Vercel aliases
**Problema**: `vercel --prod` NO auto-asigna dominios personalizados.
**Solucion**: Despues de cada deploy, ejecutar manualmente:
```bash
vercel alias <deploy-url> pauvepe.com
vercel alias <deploy-url> www.pauvepe.com
```

### 6. Vercel link
**Problema**: `vercel link --yes` CREA un proyecto nuevo en vez de linkear existente.
**Solucion**: Usar `vercel link --project express-js-on-vercel` para linkear al existente.

### 7. Server vs Client components con i18n
**Problema**: Las paginas con `export const metadata` (server) no pueden usar `useApp()` hook (client).
**Solucion**: Convertir a `"use client"` y quitar metadata export. El metadata se pone en layout.tsx global.

### 8. Booking store en memoria
**Problema**: Map en memoria se pierde con cada redeploy de Vercel (serverless).
**Estado**: PENDIENTE - Migrar a Supabase para persistencia real.
**Workaround**: Funciona para demos, pero las URLs de cancel/edit dejan de funcionar tras redeploy.

---

## Buenas practicas descubiertas

- Siempre hacer `next build` local antes de deployer a Vercel
- Las traducciones van en un solo archivo i18n.ts, no archivos separados por idioma
- Para Google Calendar JWT, usar syntax de objeto: `new google.auth.JWT({email, key, scopes})`
- WhatsApp Twilio usa form data (no JSON) en el webhook
- Los slots de tiempo se validan con overlap de 30 min en getBusySlots
