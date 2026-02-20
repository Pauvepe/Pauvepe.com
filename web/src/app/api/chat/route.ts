import { NextRequest, NextResponse } from "next/server";
import { chatWithAI, transcribeAudio } from "@/lib/openai-chat";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, audio, image, history = [], locale = "es" } = body;

    let transcription: string | undefined;

    // Transcribe audio if present
    if (audio) {
      try {
        transcription = await transcribeAudio(audio);
      } catch (e) {
        console.error("Transcription error:", e);
      }
    }

    // Get AI response
    const result = await chatWithAI(
      transcription || message,
      history,
      image,
      transcription,
      locale
    );

    // Check if AI wants to trigger a call
    const callMatch = result.response.match(/\[CALL_ME:([^\]]+)\]/);
    if (callMatch) {
      const phoneNumber = callMatch[1].trim();
      try {
        const callRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "https://pauvepe.com"}/api/vapi-call`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber, locale }),
          }
        );
        const callData = await callRes.json();
        result.response = result.response
          .replace(/\[CALL_ME:[^\]]+\]/, "")
          .trim();
        if (callData.success) {
          if (!result.response) {
            result.response =
              locale === "en"
                ? `Call initiated to ${phoneNumber}! You'll receive it in a few seconds.`
                : locale === "ca"
                ? `Trucada iniciada a ${phoneNumber}! La rebras en uns segons.`
                : `Llamada iniciada a ${phoneNumber}! La recibiras en unos segundos.`;
          }
        } else {
          result.response =
            locale === "en"
              ? "Sorry, there was an error starting the call. Try the call button below."
              : locale === "ca"
              ? "Ho sento, hi ha hagut un error iniciant la trucada. Prova el boto de trucada de sota."
              : "Lo siento, hubo un error al iniciar la llamada. Prueba el boton de llamada de abajo.";
        }
      } catch {
        result.response = result.response.replace(/\[CALL_ME:[^\]]+\]/, "").trim();
      }
    }

    // Check if AI wants to send an email
    const emailMatch = result.response.match(
      /\[SEND_EMAIL:([^:]+):([^:]+):([^\]]+)\]/
    );
    if (emailMatch) {
      const [, to, subject, emailBody] = emailMatch;
      try {
        await resend.emails.send({
          from: `Pau Vera <${process.env.EMAIL_FROM || "info@pauvepe.com"}>`,
          to: to.trim(),
          subject: subject.trim(),
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <p>${emailBody.trim().replace(/\n/g, "<br>")}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">Enviado desde el chatbot de pauvepe.com</p>
          </div>`,
        });
        // Clean the response to remove the action tag
        result.response = result.response
          .replace(/\[SEND_EMAIL:[^\]]+\]/, "")
          .trim();
        if (!result.response) {
          result.response = `Correo enviado a ${to.trim()}.`;
        }
      } catch (emailError) {
        console.error("Email send error:", emailError);
        result.response = "Lo siento, hubo un error al enviar el correo. Intentalo de nuevo.";
      }
    }

    return NextResponse.json({
      success: true,
      response: result.response,
      transcription: result.transcription,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { success: false, error: "Error procesando tu mensaje" },
      { status: 500 }
    );
  }
}
