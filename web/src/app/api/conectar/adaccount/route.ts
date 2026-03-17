import { NextRequest, NextResponse } from "next/server";
import { getPlantillaSupabase } from "@/lib/supabase-plantilla";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { session_id, page_id, page_name, page_url, ig_account_id, ig_username } = body;

  if (!session_id) return NextResponse.json({ error: "missing session_id" }, { status: 400 });

  const db = getPlantillaSupabase();
  const sysToken = process.env.META_SYSTEM_TOKEN;
  const bmId = process.env.META_BUSINESS_ID || "856492292841936";

  let adAccountId: string | null = null;

  // Try to create ad account under Pau's BM
  try {
    const createRes = await fetch(`https://graph.facebook.com/v22.0/${bmId}/adaccount`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name: page_name || "Cliente",
        currency: "EUR",
        timezone_id: "69",
        end_advertiser: bmId,
        media_agency: bmId,
        partner: bmId,
        access_token: sysToken || "",
      }),
    });
    const adAccount = await createRes.json();
    adAccountId = adAccount.id || null;
  } catch {
    // Ad account creation failed, continue without it
  }

  // Build payment URL for the ad account
  let paymentUrl: string | null = null;
  if (adAccountId) {
    const cleanId = adAccountId.replace("act_", "");
    paymentUrl = `https://business.facebook.com/ads/manager/account_settings/account_billing/?act=${cleanId}`;
  }

  // Update session
  await db
    .from("clientes_onboarding")
    .update({
      fb_page_id: page_id,
      fb_page_name: page_name,
      fb_page_url: page_url || null,
      ig_account_id: ig_account_id || null,
      ig_username: ig_username || null,
      ig_url: ig_username ? `https://instagram.com/${ig_username}` : null,
      ad_account_id: adAccountId,
      current_step: 4,
      updated_at: new Date().toISOString(),
    })
    .eq("session_id", session_id);

  return NextResponse.json({ ad_account_id: adAccountId, payment_url: paymentUrl });
}
