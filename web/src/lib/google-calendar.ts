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
      const startTime = new Date(slot.start);
      const endTime = slot.end ? new Date(slot.end) : new Date(startTime.getTime() + 30 * 60 * 1000);

      // Mark all 30-min slots that overlap with this busy period
      const slotStart = new Date(`${dateStr}T08:00:00+01:00`);
      for (let i = 0; i < 20; i++) {
        const checkTime = new Date(slotStart.getTime() + i * 30 * 60 * 1000);
        const checkEnd = new Date(checkTime.getTime() + 30 * 60 * 1000);

        if (checkTime < endTime && checkEnd > startTime) {
          const hour = checkTime.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Europe/Madrid",
          });
          if (!busyHours.includes(hour)) {
            busyHours.push(hour);
          }
        }
      }
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
}): Promise<{ htmlLink: string; eventId: string }> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const startDateTime = `${data.date}T${data.time}:00+01:00`;
  const endDate = new Date(startDateTime);
  endDate.setMinutes(endDate.getMinutes() + 30);

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Auditoria - ${data.name}`,
      description: [
        `Cliente: ${data.name}`,
        `Email: ${data.email}`,
        `Telefono: ${data.phone}`,
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

  return {
    htmlLink: res.data.htmlLink || "",
    eventId: res.data.id || "",
  };
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });
  await calendar.events.delete({ calendarId, eventId });
}

export async function updateCalendarEvent(
  eventId: string,
  data: { date: string; time: string; name: string }
): Promise<void> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const startDateTime = `${data.date}T${data.time}:00+01:00`;
  const endDate = new Date(startDateTime);
  endDate.setMinutes(endDate.getMinutes() + 30);

  await calendar.events.patch({
    calendarId,
    eventId,
    requestBody: {
      start: {
        dateTime: startDateTime,
        timeZone: "Europe/Madrid",
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "Europe/Madrid",
      },
    },
  });
}
