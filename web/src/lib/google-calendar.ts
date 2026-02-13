import { google } from "googleapis";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

export async function getBusySlots(dateStr: string): Promise<string[]> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const timeMin = new Date(`${dateStr}T00:00:00+01:00`);
  const timeMax = new Date(`${dateStr}T23:59:59+01:00`);

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: "Europe/Madrid",
      items: [{ id: calendarId }],
    },
  });

  const busy = res.data.calendars?.[calendarId]?.busy || [];
  const busyHours: string[] = [];

  for (const slot of busy) {
    if (slot.start) {
      const hour = new Date(slot.start).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Madrid",
      });
      busyHours.push(hour);
    }
  }

  return busyHours;
}

export async function createBookingEvent(data: {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  date: string;
  time: string;
}): Promise<string> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const startDateTime = `${data.date}T${data.time}:00+01:00`;
  const endDate = new Date(startDateTime);
  endDate.setMinutes(endDate.getMinutes() + 30);

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Auditoría - ${data.name}`,
      description: [
        `Cliente: ${data.name}`,
        `Email: ${data.email}`,
        `Teléfono: ${data.phone}`,
        `Motivo: ${data.reason}`,
        data.message ? `Mensaje: ${data.message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      start: {
        dateTime: startDateTime,
        timeZone: "Europe/Madrid",
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "Europe/Madrid",
      },
      attendees: [{ email: data.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 30 },
          { method: "email", minutes: 60 },
        ],
      },
    },
  });

  return res.data.htmlLink || "";
}
