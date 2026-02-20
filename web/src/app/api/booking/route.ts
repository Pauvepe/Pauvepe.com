import { NextRequest, NextResponse } from "next/server";
import { createBookingEvent } from "@/lib/google-calendar";
import { sendBookingConfirmation } from "@/lib/email";
import { createBooking } from "@/lib/booking-store";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, reason, message, date, time } = data;

    if (!name || !email || !phone || !reason || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Google Calendar event
    let eventId = "";
    try {
      const result = await createBookingEvent({
        name,
        email,
        phone,
        reason,
        message: message || "",
        date,
        time,
      });
      eventId = result.eventId;
    } catch (calError) {
      console.error("Calendar event creation failed:", calError);
    }

    // Create booking with token
    const token = createBooking({
      name,
      email,
      phone,
      reason,
      message: message || "",
      date,
      time,
      calendarEventId: eventId,
    });

    // Send confirmation emails with cancel/edit links
    try {
      await sendBookingConfirmation({ name, email, date, time, reason, token });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    // Forward to n8n webhook
    try {
      await fetch("https://n8nauto.pauvepe.com/webhook/booking-new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });
    } catch {
      // best-effort
    }

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
