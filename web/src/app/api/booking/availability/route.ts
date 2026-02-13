import { NextRequest, NextResponse } from "next/server";
import { getBusySlots } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "date required" }, { status: 400 });
  }

  try {
    const busySlots = await getBusySlots(date);
    return NextResponse.json({ busySlots });
  } catch (error) {
    console.error("Calendar availability error:", error);
    return NextResponse.json({ busySlots: [] });
  }
}
