import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}
const fromEmail = process.env.EMAIL_FROM || "info@pauvepe.com";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://pauvepe.com";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function emailWrapper(content: string): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F5F1EC; padding: 40px 20px;">
      <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
        ${content}
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #999; font-size: 12px; text-align: center;">pauvepe.com - Tu Growth Partner Digital</p>
      </div>
    </div>`;
}

export async function sendBookingConfirmation(data: {
  name: string;
  email: string;
  date: string;
  time: string;
  reason: string;
  token: string;
}) {
  const dateFormatted = formatDate(data.date);
  const cancelUrl = `${BASE_URL}/booking/manage/${data.token}?action=cancel`;
  const editUrl = `${BASE_URL}/booking/manage/${data.token}?action=edit`;

  await getResend().emails.send({
    from: `Pau Vera <${fromEmail}>`,
    to: data.email,
    subject: `Cita confirmada - ${dateFormatted} a las ${data.time}`,
    html: emailWrapper(`
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 60px; height: 60px; background: #FDF5EF; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <span style="font-size: 28px;">&#10003;</span>
        </div>
        <h1 style="color: #D4714E; margin: 0; font-size: 24px;">Cita Confirmada</h1>
      </div>
      <p style="color: #333; font-size: 16px; line-height: 1.6;">Hola <strong>${data.name}</strong>,</p>
      <p style="color: #555; font-size: 15px; line-height: 1.6;">Tu auditoria gratuita ha sido confirmada:</p>
      <div style="background: #FDF5EF; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="margin: 8px 0; color: #333;"><strong>Fecha:</strong> ${dateFormatted}</p>
        <p style="margin: 8px 0; color: #333;"><strong>Hora:</strong> ${data.time} (hora de Espana)</p>
        <p style="margin: 8px 0; color: #333;"><strong>Duracion:</strong> 30 minutos</p>
        <p style="margin: 8px 0; color: #333;"><strong>Motivo:</strong> ${data.reason}</p>
      </div>
      <p style="color: #555; font-size: 15px;">Te contactare por WhatsApp o email antes de la cita para conectarnos.</p>
      <div style="text-align: center; margin-top: 30px;">
        <a href="${editUrl}" style="display: inline-block; background: linear-gradient(135deg, #D4714E, #5A8A62); color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; margin: 5px;">Editar cita</a>
        <a href="${cancelUrl}" style="display: inline-block; background: #f5f5f5; color: #666; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; margin: 5px;">Cancelar cita</a>
      </div>
    `),
  });

  // Notify Pau
  await getResend().emails.send({
    from: `Booking System <${fromEmail}>`,
    to: "pauvepe05@gmail.com",
    subject: `Nueva cita: ${data.name} - ${dateFormatted} ${data.time}`,
    html: emailWrapper(`
      <h2 style="color: #D4714E;">Nueva cita agendada</h2>
      <ul style="line-height: 2;">
        <li><strong>Nombre:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Fecha:</strong> ${dateFormatted}</li>
        <li><strong>Hora:</strong> ${data.time}</li>
        <li><strong>Motivo:</strong> ${data.reason}</li>
      </ul>
    `),
  });
}

export async function sendCancellationEmail(data: {
  name: string;
  email: string;
  date: string;
  time: string;
}) {
  const dateFormatted = formatDate(data.date);

  await getResend().emails.send({
    from: `Pau Vera <${fromEmail}>`,
    to: data.email,
    subject: `Cita cancelada - ${dateFormatted}`,
    html: emailWrapper(`
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #ef4444; margin: 0; font-size: 24px;">Cita Cancelada</h1>
      </div>
      <p style="color: #333; font-size: 16px;">Hola <strong>${data.name}</strong>,</p>
      <p style="color: #555; font-size: 15px;">Tu cita del <strong>${dateFormatted}</strong> a las <strong>${data.time}</strong> ha sido cancelada correctamente.</p>
      <p style="color: #555; font-size: 15px;">Si quieres reagendar, haz clic abajo:</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="${BASE_URL}/booking" style="display: inline-block; background: linear-gradient(135deg, #D4714E, #5A8A62); color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: 600;">Agendar nueva cita</a>
      </div>
    `),
  });

  // Notify Pau
  await getResend().emails.send({
    from: `Booking System <${fromEmail}>`,
    to: "pauvepe05@gmail.com",
    subject: `Cita CANCELADA: ${data.name} - ${dateFormatted} ${data.time}`,
    html: emailWrapper(`
      <h2 style="color: #ef4444;">Cita cancelada</h2>
      <p><strong>${data.name}</strong> ha cancelado su cita del ${dateFormatted} a las ${data.time}.</p>
    `),
  });
}

export async function sendEditConfirmation(data: {
  name: string;
  email: string;
  oldDate: string;
  oldTime: string;
  newDate: string;
  newTime: string;
  token: string;
}) {
  const oldFormatted = formatDate(data.oldDate);
  const newFormatted = formatDate(data.newDate);
  const cancelUrl = `${BASE_URL}/booking/manage/${data.token}?action=cancel`;
  const editUrl = `${BASE_URL}/booking/manage/${data.token}?action=edit`;

  await getResend().emails.send({
    from: `Pau Vera <${fromEmail}>`,
    to: data.email,
    subject: `Cita actualizada - ${newFormatted} a las ${data.newTime}`,
    html: emailWrapper(`
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #D4714E; margin: 0; font-size: 24px;">Cita Actualizada</h1>
      </div>
      <p style="color: #333; font-size: 16px;">Hola <strong>${data.name}</strong>,</p>
      <p style="color: #555; font-size: 15px;">Tu cita ha sido modificada correctamente:</p>
      <div style="background: #fef3c7; border-radius: 12px; padding: 15px; margin: 15px 0;">
        <p style="margin: 4px 0; color: #92400e; text-decoration: line-through;"><strong>Antes:</strong> ${oldFormatted} a las ${data.oldTime}</p>
      </div>
      <div style="background: #d1fae5; border-radius: 12px; padding: 15px; margin: 15px 0;">
        <p style="margin: 4px 0; color: #065f46;"><strong>Ahora:</strong> ${newFormatted} a las ${data.newTime}</p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="${editUrl}" style="display: inline-block; background: linear-gradient(135deg, #D4714E, #5A8A62); color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; margin: 5px;">Editar otra vez</a>
        <a href="${cancelUrl}" style="display: inline-block; background: #f5f5f5; color: #666; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; margin: 5px;">Cancelar cita</a>
      </div>
    `),
  });

  // Notify Pau
  await getResend().emails.send({
    from: `Booking System <${fromEmail}>`,
    to: "pauvepe05@gmail.com",
    subject: `Cita EDITADA: ${data.name} - ${newFormatted} ${data.newTime}`,
    html: emailWrapper(`
      <h2 style="color: #f59e0b;">Cita editada</h2>
      <p><strong>${data.name}</strong> ha cambiado su cita:</p>
      <p>Antes: ${oldFormatted} ${data.oldTime}</p>
      <p>Ahora: ${newFormatted} ${data.newTime}</p>
    `),
  });
}
