import { NextRequest, NextResponse } from "next/server";
import { getPlantillaSupabase } from "@/lib/supabase-plantilla";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session");
  if (!sessionId) return NextResponse.json({ error: "missing session" }, { status: 400 });

  const db = getPlantillaSupabase();
  const { data: session } = await db
    .from("clientes_onboarding")
    .select("fb_access_token")
    .eq("session_id", sessionId)
    .single();

  const token = (session as any)?.fb_access_token;
  if (!token) {
    return NextResponse.json({ error: "not connected" }, { status: 400 });
  }

  const pagesRes = await fetch(
    `https://graph.facebook.com/v22.0/me/accounts?fields=id,name,link,picture,instagram_business_account{id,username,profile_picture_url}&access_token=${token}`
  );
  const pages = await pagesRes.json();

  if (pages.error) {
    return NextResponse.json({ error: pages.error.message }, { status: 400 });
  }

  return NextResponse.json(pages);
}
