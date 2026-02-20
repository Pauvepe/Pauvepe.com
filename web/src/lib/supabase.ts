import { createClient } from "@supabase/supabase-js";

let _supabase: ReturnType<typeof createClient> | null = null;
export function getSupabase() {
  if (!_supabase) {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    _supabase = createClient(url, key);
  }
  return _supabase;
}
// Backwards compat
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) { return (getSupabase() as unknown as Record<string, unknown>)[prop as string]; },
});

// Types
export interface Contact {
  id: string;
  phone?: string;
  email?: string;
  name?: string;
  channels: string[]; // 'web', 'whatsapp', 'call'
  locale?: string;
  created_at: string;
  updated_at: string;
}

export interface Interaction {
  id: string;
  contact_id: string;
  channel: string; // 'web_chat', 'whatsapp', 'call', 'booking'
  role: string; // 'user', 'assistant', 'system'
  message: string;
  images?: string[];
  audio_url?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Booking {
  id: string;
  token: string;
  contact_id?: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  message?: string;
  date: string;
  time: string;
  calendar_event_id?: string;
  status: "confirmed" | "cancelled" | "edited";
  created_at: string;
  updated_at: string;
}

// Find or create contact by phone or email
export async function findOrCreateContact(data: {
  phone?: string;
  email?: string;
  name?: string;
  channel: string;
}): Promise<string> {
  // Try to find existing contact
  const sb = getSupabase();
  let contact: Contact | null = null;

  if (data.phone) {
    const { data: found } = await sb
      .from("contacts")
      .select("*")
      .eq("phone", data.phone)
      .single();
    contact = found as Contact | null;
  }

  if (!contact && data.email) {
    const { data: found } = await sb
      .from("contacts")
      .select("*")
      .eq("email", data.email)
      .single();
    contact = found as Contact | null;
  }

  if (contact) {
    // Update existing contact with new info
    const channels = contact.channels || [];
    if (!channels.includes(data.channel)) {
      channels.push(data.channel);
    }
    const updates: Record<string, unknown> = {
      channels,
      updated_at: new Date().toISOString(),
    };
    if (data.name && !contact.name) updates.name = data.name;
    if (data.email && !contact.email) updates.email = data.email;
    if (data.phone && !contact.phone) updates.phone = data.phone;

    await sb.from("contacts").update(updates as never).eq("id", contact.id);
    return contact.id;
  }

  // Create new contact
  const { data: newContact, error } = await sb
    .from("contacts")
    .insert({
      phone: data.phone || null,
      email: data.email || null,
      name: data.name || null,
      channels: [data.channel],
    } as never)
    .select()
    .single();

  if (error) throw error;
  return (newContact as Contact).id;
}

// Log an interaction
export async function logInteraction(data: {
  contact_id: string;
  channel: string;
  role: string;
  message: string;
  images?: string[];
  audio_url?: string;
  metadata?: Record<string, unknown>;
}) {
  await getSupabase().from("interactions").insert(data as never);
}
