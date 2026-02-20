# Chat Web pauvepe.com - En Construccion

> Ultima actualizacion: 20 feb 2026
> Estado: EN PROGRESO
> Prioridad: ALTA

---

## Que es

Integrar el chatbot IA con Claude Sonnet en la web pauvepe.com. El chat ya existe (playground en la homepage) pero usa OpenAI GPT-4o-mini local. Hay que cambiarlo para que use **Claude Sonnet via el VPS**, igual que WhatsApp/Messenger/IG.

---

## Arquitectura objetivo

```
VISITANTE en pauvepe.com
    |
    v
Frontend (Next.js en Vercel)
    |
    POST a n8nauto.pauvepe.com/webhook/web-chat
    |
    v
VPS (webhook-server.mjs, pm2, puerto 3001)
    |
    1. Identifica sesion web (sessionId)
    2. Busca/crea usuario en Supabase (external_id = 'web:SESSION_ID')
    3. Carga historial (ultimos 20 msgs)
    4. Construye prompt con boot-prompt.md + historial + herramientas
    5. Ejecuta: echo "PROMPT" | /home/lenovo/.local/bin/claude -p
    6. Detecta [[ACCIONES]] en la respuesta
    7. Ejecuta acciones (llamar, email, citas, etc.)
    8. Devuelve respuesta limpia
    |
    v
Frontend muestra la respuesta
```

**Por que via VPS y NO API directa:**
- `claude -p` usa la suscripcion Max $200/mes (SIN coste API extra)
- El VPS ya tiene TODO montado: Supabase, herramientas, acciones, multimedia
- El webhook-server.mjs ya es multi-cliente (FASE 6)
- Solo hay que añadir un endpoint `/webhook/web-chat` al servidor existente

---

## Lo que YA ESTA HECHO (20 feb 2026)

### En la web (Vercel)

| Cambio | Estado | Archivo |
|---|---|---|
| Header: "PAU" → "pauvepe" (minusculas) | **HECHO** | `src/components/Header.tsx` |
| Header: hover icono → patas contentas SVG animado | **HECHO** | `src/components/Header.tsx` |
| Patas contentas cuando bot piensa | **YA ESTABA** | `src/components/playground/BotFace.tsx` |
| Chat playground con audio/imagen/texto | **YA ESTABA** | `src/components/playground/` |
| Llamadas VAPI desde chat (boton + modal) | **YA ESTABA** | `PlaygroundSection.tsx` + `api/vapi-call/route.ts` |
| Llamadas VAPI en navegador (WebRTC) | **YA ESTABA** | `PlaygroundSection.tsx` (handleVapiCall) |

### Archivos temporales (BORRAR cuando se integre VPS)

Estos archivos se crearon con enfoque OpenAI que HAY QUE REEMPLAZAR por VPS:

| Archivo | Que hace | Que hacer |
|---|---|---|
| `src/lib/chat-session.ts` | Memoria sesion con Supabase (cliente) | **REUTILIZAR** el getSessionId(), el resto lo hara el VPS |
| `src/app/api/chat/history/route.ts` | Endpoint GET historial | **REEMPLAZAR** por llamada al VPS |
| `src/lib/openai-chat.ts` | Prompt mejorado + chatWithAI | **BORRAR** cuando VPS funcione (el prompt estara en el VPS) |
| `src/app/api/chat/route.ts` | API route con sesion | **SIMPLIFICAR** a proxy al VPS |

---

## Lo que FALTA POR HACER

### PASO 1: Endpoint en el VPS (backend)

Añadir al `webhook-server.mjs` del VPS (`/home/lenovo/jarvis/webhook-server.mjs`):

```
POST /webhook/web-chat
Body: { sessionId, message, locale, audio?, image? }
Response: { success, response, transcription? }
```

Que tiene que hacer:
1. Recibir sessionId del frontend
2. Usar external_id = `web:{sessionId}` en Supabase
3. Buscar/crear usuario, cargar historial (ya existen las funciones)
4. Construir prompt con boot-prompt adaptado para web
5. Ejecutar `claude -p` (ya existe la logica)
6. Detectar/ejecutar acciones (ya existe)
7. Guardar mensajes en Supabase (ya existe)
8. Devolver respuesta limpia

**Nota**: El boot-prompt para web debe saber que:
- El visitante esta en pauvepe.com (no WhatsApp)
- Puede pedir que le llamen (herramienta [[LLAMAR]])
- Puede pedir email (herramienta [[ENVIAR_EMAIL]])
- Este chat es una DEMO de lo que Pau puede crear
- Debe intentar que agenden cita en pauvepe.com/booking

### PASO 2: CORS en nginx

Permitir requests desde pauvepe.com al VPS:
```nginx
# En /etc/nginx/sites-available/n8n, seccion /webhook/
add_header Access-Control-Allow-Origin "https://pauvepe.com";
add_header Access-Control-Allow-Methods "POST, GET, OPTIONS";
add_header Access-Control-Allow-Headers "Content-Type";
```

### PASO 3: Frontend - cambiar destino del chat

En `src/lib/api.ts` o `src/app/api/chat/route.ts`:
- Cambiar de llamar a OpenAI local → llamar a `https://n8nauto.pauvepe.com/webhook/web-chat`
- Enviar sessionId con cada mensaje
- Opcion A: llamar directo desde el browser al VPS (mas rapido, necesita CORS)
- Opcion B: proxy via Vercel API route → VPS (mas seguro, un poco mas lento)

### PASO 4: Cargar historial al recargar pagina

Endpoint en VPS:
```
GET /webhook/web-chat/history?sessionId=XXX
Response: { messages: [{ role, content, timestamp }] }
```

Frontend al montar PlaygroundSection:
1. Leer sessionId de localStorage
2. Si existe y tiene <24h → fetch historial del VPS
3. Mostrar mensajes anteriores en el chat
4. Si >24h → crear nuevo sessionId

### PASO 5: Limpieza sesiones web

- VPS limpia sesiones web >24h periodicamente
- DELETE chat_mensajes + chat_usuarios WHERE canal_principal = 'web' AND ultima_vez < NOW() - 24h
- Ejecutar en cada request o con setInterval

### PASO 6: Audio e imagenes via VPS

- Audio: frontend graba → base64 → VPS → Whisper (OpenAI) → transcripcion → Claude
- Imagen: frontend captura → base64 → VPS → GPT-4o Vision → descripcion → Claude
- **Ya esta implementado en el VPS** (FASE 3 del chatbot). Solo hay que enviar los datos.

---

## Credenciales necesarias

Todo esta en el VPS (`/home/lenovo/jarvis/.env`) y Supabase Vault. NO hace falta nada nuevo.

| Cosa | Donde | Estado |
|---|---|---|
| Claude CLI | VPS `/home/lenovo/.local/bin/claude` | OK (Max $200/mes) |
| Supabase | .env del VPS (SUPABASE_1_URL + SERVICE_ROLE_KEY) | OK |
| VAPI | .env del VPS (VAPI_API_KEY + IDs) | OK |
| Resend | .env del VPS (RESEND_API_KEY) | OK |
| OpenAI (Whisper/Vision) | .env del VPS (OPENAI_API_KEY) | OK |
| Twilio | .env del VPS | OK |

---

## Dependencia critica

**El VPS debe estar encendido** para que el chat web funcione.
Si el VPS esta apagado, el chat no respondera.
Solucion futura: fallback a OpenAI GPT-4o-mini si el VPS no responde (ya esta en el codigo actual).

---

## Documentacion relacionada

| Que | Donde (en repo MEMORIA) |
|---|---|
| Arquitectura completa del chatbot | `PAU/trabajos/asistencia-cliente-ia/arquitectura.md` |
| Herramientas del bot | `PAU/trabajos/asistencia-cliente-ia/herramientas.md` |
| Boot prompt del bot | `PAU/trabajos/asistencia-cliente-ia/boot-prompt.md` |
| Config VPS y webhook-server | `PAU/temas/google-cloud/configuracion.md` |
| Config VAPI | `PAU/temas/vapi/configuracion.md` |
| Estado del chatbot (6 fases) | `PAU/trabajos/asistencia-cliente-ia/en-construccion.md` |

---

## Para el siguiente Claude

1. Lee este archivo primero
2. Lee `PAU/trabajos/asistencia-cliente-ia/` en MEMORIA (toda la carpeta)
3. Lee `PAU/temas/google-cloud/configuracion.md` en MEMORIA
4. Empieza por PASO 1 (endpoint en VPS) - necesitas SSH al VPS
5. El VPS se enciende con: `gcloud compute instances start n8nauto --zone=us-central1-a`
6. SSH: `gcloud compute ssh n8nauto --zone=us-central1-a`
7. El webhook-server esta en `/home/lenovo/jarvis/webhook-server.mjs`
