import { NextRequest, NextResponse } from "next/server";
import { getPlantillaSupabase } from "@/lib/supabase-plantilla";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session");
  if (!sessionId) return NextResponse.json({ error: "missing session" }, { status: 400 });

  const db = getPlantillaSupabase();
  const { data, error } = await db
    .from("clientes_onboarding")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  if (error) return NextResponse.json({ error: "not found" }, { status: 404 });

  const row = data as any;
  const safe = { ...row, fb_access_token: row.fb_access_token ? "***" : null };
  return NextResponse.json(safe);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { session_id, ...updates } = body;

  if (!session_id) return NextResponse.json({ error: "missing session_id" }, { status: 400 });

  const db = getPlantillaSupabase();
  const { data, error } = await db
    .from("clientes_onboarding")
    .upsert(
      { session_id, ...updates, updated_at: new Date().toISOString() },
      { onConflict: "session_id" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const row = data as any;
  const safe = { ...row, fb_access_token: row.fb_access_token ? "***" : null };
  return NextResponse.json(safe);
}
