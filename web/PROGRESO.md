# PROGRESO - pauvepe.com

## Estado actual: DESPLEGADO EN PRODUCCION
- URL: https://pauvepe.com
- Ultima actualizacion: 2026-02-25
- Vercel project: express-js-on-vercel
- Stack: Next.js 16.1.6 + React 19 + Tailwind 4
- **Backup tag**: `backup-25feb2026` (git tag en el repo)

---

## Completado

### Infraestructura
- [x] Deploy en Vercel con aliases pauvepe.com + www.pauvepe.com
- [x] Env vars en Vercel: GOOGLE_*, RESEND_*, OPENAI_API_KEY, SUPABASE_*, TWILIO_*, NEXT_PUBLIC_BASE_URL, EMAIL_FROM
- [x] Supabase: tablas contacts + interactions con indices

### Funcionalidades
- [x] **i18n** - Castellano, Catalan, Ingles con switcher en header
- [x] **Dark mode** - Toggle en header, localStorage, sin flash
- [x] **Booking system** - Formulario 3 pasos, slots 30 min, Google Calendar availability
- [x] **Booking manage** - Cancel/edit por token UUID (/booking/manage/[token])
- [x] **Email confirmacion** - Via Resend con links cancel/edit
- [x] **Chatbot web** - OpenAI gpt-4o-mini, texto/audio/imagenes
- [x] **Chatbot locale-aware** - System prompt cambia segun idioma (es/ca/en)
- [x] **BotFace animado** - 4 estados: sleeping/awake/thinking/happy
- [x] **Vapi voice agent** - Boton con feedback de carga, permisos microfono, eventos
- [x] **WhatsApp Twilio** - Webhook /api/whatsapp con memoria Supabase
- [x] **CRM Supabase** - contacts (phone/email unique) + interactions (canal, rol, mensaje, imgs)
- [x] **Blog carousel** - 5 posts placeholder con traducciones
- [x] **Traducciones** - Homepage, booking, services, about, header, footer
- [x] **Logo alien** - 4 variantes SVG (horizontal blue/white, vertical, icon) estilo Claude
- [x] **Sugerencias interactivas** - Grid 2x2 movil, acciones directas (correu/llamame/audio/imagen)
- [x] **Servicio Excel/Calculadoras** - Añadido como servicio (calculadoras complejas para seguros)
- [x] **Mobile responsive chatbot** - Botones full-width, sugerencias en grid, no se corta
- [x] **Fix overflow-x movil** - overflow-x:hidden en html/body, quitar -mx-4 del scroll movil
- [x] **ChatInput compacto** - Boton imagen siempre visible en movil, input mas pequeno
- [x] **ChatWindow reducido** - 260px en movil (era 350px), evita que se corte
- [x] **GrowthPhases scroll-lock** - Seccion sticky 300vh con 3 fases (Web→Chatbots→Ads) + garantias
- [x] **Blog eliminado** - Quitado BlogCarousel de homepage (no habia contenido real)

### Paginas traducidas
- [x] / (homepage)
- [x] /booking
- [x] /services
- [x] /about
- [x] Header + Footer
- [ ] /freelance (pendiente)
- [ ] /privacy (pendiente - contenido legal)
- [ ] /terms (pendiente - contenido legal)

---

## Pendiente

### Configuracion manual (PAU)
- [x] Vapi: key cambiada de private (3cc382d1...) a public (a81442bc...) en PlaygroundSection.tsx ✅ (sesion 15-feb)
- [x] Deploy a Vercel + alias dominios ✅ (sesion 15-feb, con Vapi key fix + outbound calls + callme modal)
- [x] Vapi env vars en Vercel: VAPI_API_KEY, VAPI_PHONE_NUMBER_ID, VAPI_ASSISTANT_ID ✅
- [ ] WhatsApp Business: registrar +34930346775 en Twilio > Messaging > WhatsApp Senders (requiere aprobacion Meta, 1-5 dias)

### Nuevas funcionalidades (sesion 15-feb)
- [x] **Vapi outbound calls** - API route /api/vapi-call que llama al usuario via Vapi
- [x] **Modal "Llamame"** - Popup en PlaygroundSection con campo de telefono, lanza llamada Vapi
- [x] **Chatbot + llamadas** - El chatbot detecta [CALL_ME:+34...] y lanza llamada automaticamente
- [x] **Traducciones callme** - es/ca/en para todo el flujo de llamadas

### Estado WhatsApp
- Numero +34930346775 = SOLO VOZ (sms=false, mms=false)
- Para WhatsApp real: registrar en Twilio > Messaging > WhatsApp Senders (requiere aprobacion Meta)
- Sandbox Twilio = solo pruebas, no produccion
- Mientras tanto: boton WhatsApp apunta a wa.me/34637682568 (WhatsApp personal de Pau)

### Mejoras futuras
- [ ] Blog real con contenido SEO y sistema de articulos (componente BlogCarousel.tsx existe pero quitado de page.tsx)
- [ ] Structured data (JSON-LD) para SEO
- [ ] sitemap.xml y robots.txt
- [ ] Transcripcion de llamadas Vapi guardadas en Supabase
- [ ] Freelance page traducida
- [ ] Migrar booking-store de in-memory a Supabase (actualmente Map en memoria)
- [ ] ServiceCard traducida (actualmente textos fijos en services.ts)

---

## Instrucciones Twilio WhatsApp

Tu numero +34930346775 es SOLO VOZ (sms=false, mms=false). Para WhatsApp:

### Opcion A: Sandbox (para probar)
1. Ve a https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Sigue instrucciones para unirte al sandbox
3. En "Sandbox Configuration", pon webhook: `https://pauvepe.com/api/whatsapp` (POST)

### Opcion B: WhatsApp Business (produccion)
1. Ve a https://console.twilio.com → Messaging → WhatsApp Senders
2. Registra tu numero +34930346775 como WhatsApp sender
3. Pon webhook: `https://pauvepe.com/api/whatsapp` (POST)
4. Esto requiere aprobacion de Meta (puede tardar dias)

### Sobre Vapi
Si el boton no funciona, verifica en https://dashboard.vapi.ai que la key usada (3cc382d1...) es tu PUBLIC key, no la server/private key. La public key es la que se usa en el frontend.

---

## Arquitectura

### Flujo de booking
1. Usuario rellena formulario (nombre, tlf, email, motivo)
2. Selecciona fecha (14 dias, L-V) y hora (slots 30 min, grises si ocupados via Google Calendar)
3. Confirma → POST /api/booking
4. Se crea evento en Google Calendar, se guarda token UUID
5. Email confirmacion via Resend con links cancel/edit
6. Cancel: DELETE en Google Calendar, emails a ambos
7. Edit: UPDATE en Google Calendar, emails con hora antigua → nueva

### Flujo chatbot web
1. Usuario escribe/graba audio/sube imagen
2. POST /api/chat con texto + audio base64 + imagen base64 + locale
3. Audio → Whisper transcription
4. OpenAI gpt-4o-mini con system prompt LOCALE-AWARE + historial
5. Si respuesta contiene [SEND_EMAIL:to:subject:body] → enviar via Resend
6. Respuesta al chat

### Flujo WhatsApp
1. Twilio webhook → POST /api/whatsapp (form data)
2. findOrCreateContact en Supabase (phone unique)
3. logInteraction (user message)
4. Cargar ultimos 10 mensajes como historial
5. OpenAI gpt-4o-mini genera respuesta
6. logInteraction (assistant reply)
7. Enviar via Twilio Messages API

### CRM Supabase
- contacts: id, phone (unique), email (unique), name, channels[], locale
- interactions: id, contact_id (FK), channel, role, message, images[], audio_url, metadata
- Unificacion: si llega phone existente → actualiza; si llega email existente → actualiza
