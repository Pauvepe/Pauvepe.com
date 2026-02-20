import { v4 as uuidv4 } from "uuid";

// In-memory store for bookings (replaced by Supabase when available)
// For production, this uses a simple Map that persists during the server lifetime
const bookings = new Map<
  string,
  {
    token: string;
    name: string;
    email: string;
    phone: string;
    reason: string;
    message: string;
    date: string;
    time: string;
    calendarEventId: string;
    status: "confirmed" | "cancelled";
    createdAt: string;
  }
>();

export function createBooking(data: {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  date: string;
  time: string;
  calendarEventId: string;
}) {
  const token = uuidv4();
  bookings.set(token, {
    token,
    ...data,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  });
  return token;
}

export function getBooking(token: string) {
  return bookings.get(token) || null;
}

export function cancelBooking(token: string) {
  const booking = bookings.get(token);
  if (booking) {
    booking.status = "cancelled";
    bookings.set(token, booking);
  }
  return booking;
}

export function updateBooking(
  token: string,
  data: { date: string; time: string; calendarEventId?: string }
) {
  const booking = bookings.get(token);
  if (booking) {
    booking.date = data.date;
    booking.time = data.time;
    if (data.calendarEventId) booking.calendarEventId = data.calendarEventId;
    bookings.set(token, booking);
  }
  return booking;
}
