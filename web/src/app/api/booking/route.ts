import { NextRequest, NextResponse } from "next/server";
import { createBookingEvent } from "@/lib/google-calendar";
import { sendBookingConfirmation } from "@/lib/email";

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
    let calendarLink = "";
    try {
      calendarLink = await createBookingEvent({
        name,
        email,
        phone,
        reason,
        message: message || "",
        date,
        time,
      });
    } catch (calError) {
      console.error("Calendar event creation failed:", calError);
      // Continue even if calendar fails - don't block the booking
    }

    // Send confirmation emails
    try {
      await sendBookingConfirmation({ name, email, date, time, reason });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    // Also forward to n8n webhook (keep existing flow)
    try {
      await fetch("https://n8nauto.pauvepe.com/webhook/booking-new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // n8n webhook is best-effort
    }

    return NextResponse.json({
      success: true,
      calendarLink,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
