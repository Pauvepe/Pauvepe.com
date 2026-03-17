import { NextRequest, NextResponse } from "next/server";
import { getPlantillaSupabase } from "@/lib/supabase-plantilla";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state"); // session_id
  const fbError = req.nextUrl.searchParams.get("error");

  if (fbError || !code || !state) {
    return NextResponse.redirect(new URL(`/conectar?session=${state || ""}&error=fb_denied`, req.url));
  }

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const redirectUri = `${req.nextUrl.origin}/api/conectar/callback`;

  // Exchange code for short-lived token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v22.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${appSecret}&code=${code}`
  );
  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    return NextResponse.redirect(new URL(`/conectar?session=${state}&error=token_failed`, req.url));
  }

  // Exchange for long-lived token (60 days)
  const longRes = await fetch(
    `https://graph.facebook.com/v22.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${tokenData.access_token}`
  );
  const longData = await longRes.json();

  const accessToken = longData.access_token || tokenData.access_token;
  const expiresIn = longData.expires_in || 5184000;

  // Get user info
  const meRes = await fetch(
    `https://graph.facebook.com/v22.0/me?fields=id,name&access_token=${accessToken}`
  );
  const me = await meRes.json();

  // Save to Supabase
  const db = getPlantillaSupabase();
  await db
    .from("clientes_onboarding")
    .update({
      fb_user_id: me.id,
      fb_access_token: accessToken,
      fb_token_expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
      current_step: 3,
      updated_at: new Date().toISOString(),
    })
    .eq("session_id", state);

  return NextResponse.redirect(new URL(`/conectar?session=${state}&step=3`, req.url));
}
