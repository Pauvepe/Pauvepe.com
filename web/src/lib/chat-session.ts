import { getSupabase } from "./supabase";

const SESSION_KEY = "pauvepe_chat_session";
const SESSION_EXPIRY_HOURS = 24;

export interface ChatHistoryMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

/** Get or create a session ID stored in localStorage */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  const stored = localStorage.getItem(SESSION_KEY);
  if (stored) {
    try {
      const { id, createdAt } = JSON.parse(stored);
      const age = Date.now() - new Date(createdAt).getTime();
      if (age < SESSION_EXPIRY_HOURS * 60 * 60 * 1000) {
        return id;
      }
      localStorage.removeItem(SESSION_KEY);
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  const id = crypto.randomUUID();
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ id, createdAt: new Date().toISOString() })
  );
  return id;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRow = Record<string, any>;

/** Load chat history from Supabase for a web session */
export async function loadSessionHistory(
  sessionId: string
): Promise<ChatHistoryMessage[]> {
  if (!sessionId) return [];

  const sb = getSupabase();
  const externalId = `web:${sessionId}`;

  const { data: user } = await sb
    .from("chat_usuarios")
    .select("id")
    .eq("external_id", externalId)
    .single() as { data: AnyRow | null };

  if (!user) return [];

  const { data: messages } = await sb
    .from("chat_mensajes")
    .select("direccion, contenido, timestamp")
    .eq("usuario_id", user.id)
    .order("timestamp", { ascending: true })
    .limit(20) as { data: AnyRow[] | null };

  if (!messages) return [];

  return messages.map((m) => ({
    role: m.direccion === "entrada" ? ("user" as const) : ("assistant" as const),
    content: m.contenido,
    timestamp: m.timestamp,
  }));
}

/** Save a message to Supabase for a web session */
export async function saveSessionMessage(
  sessionId: string,
  direction: "entrada" | "salida",
  content: string,
  tipo: string = "texto"
): Promise<void> {
  if (!sessionId) return;

  const sb = getSupabase();
  const externalId = `web:${sessionId}`;

  const { data: existing } = await sb
    .from("chat_usuarios")
    .select("id, total_mensajes")
    .eq("external_id", externalId)
    .single() as { data: AnyRow | null };

  let userId: number;

  if (existing) {
    userId = existing.id;
    await sb
      .from("chat_usuarios")
      .update({
        ultima_vez: new Date().toISOString(),
        total_mensajes: (existing.total_mensajes || 0) + 1,
      } as never)
      .eq("id", userId);
  } else {
    const { data: newUser, error } = await sb
      .from("chat_usuarios")
      .insert({
        external_id: externalId,
        nombre: "Visitante Web",
        canal_principal: "web",
        negocio: "pauvepe",
      } as never)
      .select("id")
      .single() as { data: AnyRow | null; error: unknown };

    if (error || !newUser) return;
    userId = newUser.id;
  }

  await sb.from("chat_mensajes").insert({
    usuario_id: userId,
    direccion: direction,
    canal: "web",
    tipo,
    contenido: content,
    negocio: "pauvepe",
  } as never);
}

/** Clean up sessions older than 24h */
export async function cleanupOldWebSessions(): Promise<void> {
  const sb = getSupabase();
  const cutoff = new Date(
    Date.now() - SESSION_EXPIRY_HOURS * 60 * 60 * 1000
  ).toISOString();

  const { data: oldUsers } = await sb
    .from("chat_usuarios")
    .select("id")
    .eq("canal_principal", "web")
    .lt("ultima_vez", cutoff) as { data: AnyRow[] | null };

  if (!oldUsers || oldUsers.length === 0) return;

  const ids = oldUsers.map((u) => u.id);

  await sb.from("chat_mensajes").delete().in("usuario_id", ids);
  await sb.from("chat_acciones").delete().in("usuario_id", ids);
  await sb.from("chat_usuarios").delete().in("id", ids);
}
