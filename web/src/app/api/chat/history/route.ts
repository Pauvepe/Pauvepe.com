import { NextRequest, NextResponse } from "next/server";
import { loadSessionHistory } from "@/lib/chat-session";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json({ messages: [] });
    }

    const messages = await loadSessionHistory(sessionId);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("History load error:", error);
    return NextResponse.json({ messages: [] });
  }
}
