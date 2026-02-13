import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_FROM || "info@pauvepe.com";

export async function sendBookingConfirmation(data: {
  name: string;
  email: string;
  date: string;
  time: string;
  reason: string;
}) {
  const dateFormatted = new Date(data.date).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  await resend.emails.send({
    from: `Pau Vera <${fromEmail}>`,
    to: data.email,
    subject: `Cita confirmada - ${dateFormatted} a las ${data.time}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f6f8; padding: 40px 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0062ff; margin: 0; font-size: 24px;">Cita Confirmada</h1>
          </div>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Hola <strong>${data.name}</strong>,
          </p>

          <p style="color: #555; font-size: 15px; line-height: 1.6;">
            Tu auditoría gratuita ha sido confirmada. Aquí tienes los detalles:
          </p>

          <div style="background: #f0f4ff; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p style="margin: 8px 0; color: #333;"><strong>Fecha:</strong> ${dateFormatted}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Hora:</strong> ${data.time} (hora de España)</p>
            <p style="margin: 8px 0; color: #333;"><strong>Duración:</strong> 30 minutos</p>
            <p style="margin: 8px 0; color: #333;"><strong>Motivo:</strong> ${data.reason}</p>
          </div>

          <p style="color: #555; font-size: 15px; line-height: 1.6;">
            Te contactaré por WhatsApp o email unos minutos antes de la cita para conectarnos.
          </p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://wa.me/34637682568" style="display: inline-block; background: linear-gradient(135deg, #0062ff, #00c6ff); color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: 600;">
              Contactar por WhatsApp
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

          <p style="color: #999; font-size: 13px; text-align: center;">
            Si necesitas cancelar o cambiar la hora, responde a este email o escríbeme por WhatsApp.
          </p>
        </div>
      </div>
    `,
  });

  // Also notify Pau
  await resend.emails.send({
    from: `Booking System <${fromEmail}>`,
    to: "pauvepe05@gmail.com",
    subject: `Nueva cita: ${data.name} - ${dateFormatted} ${data.time}`,
    html: `
      <h2>Nueva cita agendada</h2>
      <ul>
        <li><strong>Nombre:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Fecha:</strong> ${dateFormatted}</li>
        <li><strong>Hora:</strong> ${data.time}</li>
        <li><strong>Motivo:</strong> ${data.reason}</li>
      </ul>
    `,
  });
}
