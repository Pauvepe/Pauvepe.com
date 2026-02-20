import { NextRequest, NextResponse } from "next/server";
import { getBooking, cancelBooking, updateBooking } from "@/lib/booking-store";
import {
  deleteCalendarEvent,
  updateCalendarEvent,
} from "@/lib/google-calendar";
import { sendCancellationEmail, sendEditConfirmation } from "@/lib/email";

// GET booking info by token
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  const booking = getBooking(token);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: booking.name,
    email: booking.email,
    date: booking.date,
    time: booking.time,
    reason: booking.reason,
    status: booking.status,
  });
}

// POST cancel or edit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, action, date, time } = body;

    if (!token || !action) {
      return NextResponse.json(
        { error: "Token and action required" },
        { status: 400 }
      );
    }

    const booking = getBooking(token);
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.status === "cancelled") {
      return NextResponse.json(
        { error: "Booking already cancelled" },
        { status: 400 }
      );
    }

    if (action === "cancel") {
      // Delete from calendar
      if (booking.calendarEventId) {
        try {
          await deleteCalendarEvent(booking.calendarEventId);
        } catch (e) {
          console.error("Calendar delete error:", e);
        }
      }

      // Update booking status
      cancelBooking(token);

      // Send cancellation emails
      try {
        await sendCancellationEmail({
          name: booking.name,
          email: booking.email,
          date: booking.date,
          time: booking.time,
        });
      } catch (e) {
        console.error("Cancellation email error:", e);
      }

      return NextResponse.json({ success: true, action: "cancelled" });
    }

    if (action === "edit") {
      if (!date || !time) {
        return NextResponse.json(
          { error: "Date and time required for edit" },
          { status: 400 }
        );
      }

      const oldDate = booking.date;
      const oldTime = booking.time;

      // Update calendar event
      if (booking.calendarEventId) {
        try {
          await updateCalendarEvent(booking.calendarEventId, {
            date,
            time,
            name: booking.name,
          });
        } catch (e) {
          console.error("Calendar update error:", e);
        }
      }

      // Update booking
      updateBooking(token, { date, time });

      // Send edit confirmation
      try {
        await sendEditConfirmation({
          name: booking.name,
          email: booking.email,
          oldDate,
          oldTime,
          newDate: date,
          newTime: time,
          token,
        });
      } catch (e) {
        console.error("Edit email error:", e);
      }

      return NextResponse.json({ success: true, action: "edited" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Manage booking error:", error);
    return NextResponse.json(
      { error: "Failed to manage booking" },
      { status: 500 }
    );
  }
}
