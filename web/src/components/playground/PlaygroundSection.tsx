"use client";

import { useState, useEffect, useRef } from "react";
import { Message, FileAttachment } from "@/types/chat";
import { sendMessage, generateId } from "@/lib/api";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import BotFace from "./BotFace";
import { useApp } from "@/context/AppContext";

type BotState = "sleeping" | "awake" | "thinking" | "happy";

export default function PlaygroundSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [botState, setBotState] = useState<BotState>("sleeping");
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { t, locale } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callPhone, setCallPhone] = useState("");
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "success" | "error">("idle");

  // Auto-sleep after inactivity
  useEffect(() => {
    if (botState === "happy") {
      sleepTimerRef.current = setTimeout(() => setBotState("sleeping"), 300000); // 5 min
    }
    return () => {
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    };
  }, [botState, messages]);

  const handleSend = async (text: string, attachments: FileAttachment[]) => {
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    setBotState("awake");
    setTimeout(() => setBotState("thinking"), 500);

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const typingId = generateId();
    setMessages((prev) => [
      ...prev,
      { id: typingId, role: "assistant", content: "", timestamp: new Date(), isTyping: true },
    ]);

    try {
      const audio = attachments.find((a) => a.type === "audio")?.data;
      const image = attachments.find((a) => a.type === "image")?.data;
      const history = messages
        .filter((m) => !m.isTyping)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await sendMessage({
        message: text || undefined,
        audio,
        image,
        history,
        locale,
      });

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== typingId);
        if (response.success) {
          let content = response.response;
          if (response.transcription && audio) {
            content = `*Tu dijiste: "${response.transcription}"*\n\n${content}`;
          }
          return [
            ...filtered,
            { id: generateId(), role: "assistant", content, timestamp: new Date() },
          ];
        }
        return [
          ...filtered,
          {
            id: generateId(),
            role: "assistant",
            content: response.error || "Lo siento, ha ocurrido un error.",
            timestamp: new Date(),
          },
        ];
      });

      setBotState("happy");
    } catch {
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== typingId);
        return [
          ...filtered,
          {
            id: generateId(),
            role: "assistant",
            content: "Lo siento, ha ocurrido un error. Intentalo de nuevo.",
            timestamp: new Date(),
          },
        ];
      });
      setBotState("awake");
    } finally {
      setIsLoading(false);
    }
  };

  // Outbound call via Vapi API
  const triggerOutboundCall = async (phone: string) => {
    setCallStatus("calling");
    try {
      const res = await fetch("/api/vapi-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, locale }),
      });
      const data = await res.json();
      if (data.success) {
        setCallStatus("success");
        const botMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: t("playground.callme_success"),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setBotState("happy");
        setTimeout(() => {
          setShowCallModal(false);
          setCallStatus("idle");
          setCallPhone("");
        }, 3000);
      } else {
        setCallStatus("error");
      }
    } catch {
      setCallStatus("error");
    }
  };

  // Suggestion handlers - interactive actions instead of sending text
  const handleCallMe = () => {
    setShowCallModal(true);
    setCallStatus("idle");
    setCallPhone("");
  };

  const handleEmailMe = () => {
    const userMsg: Message = {
      id: generateId(),
      role: "user",
      content: t("playground.action_email"),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Send to AI to handle email flow
    handleSend(t("playground.action_email_prompt"), []);
  };

  const handleSendImage = () => {
    // Trigger image file picker directly
    fileInputRef.current?.click();
  };

  const handleImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Max 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const attachment: FileAttachment = {
        id: generateId(),
        type: "image",
        data: base64,
        name: file.name,
      };
      handleSend(t("playground.action_image_prompt"), [attachment]);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendAudio = () => {
    // Add instruction message
    const botMsg: Message = {
      id: generateId(),
      role: "assistant",
      content: t("playground.action_audio_response"),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setBotState("happy");
  };

  const suggestions = [
    { label: t("playground.suggest1_short"), action: handleEmailMe, icon: "mail" },
    { label: t("playground.suggest2_short"), action: handleCallMe, icon: "call" },
    { label: t("playground.suggest3_short"), action: handleSendAudio, icon: "mic" },
    { label: t("playground.suggest4_short"), action: handleSendImage, icon: "image" },
  ];

  // Vapi call handler
  const [vapiLoading, setVapiLoading] = useState(false);

  const handleVapiCall = async () => {
    if (vapiLoading) return;
    setVapiLoading(true);
    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const { default: Vapi } = await import("@vapi-ai/web");
      const vapi = new Vapi("a81442bc-89f0-44f3-aa4c-70c736867252");

      const langPrompt =
        locale === "en"
          ? "Speak in English."
          : locale === "ca"
          ? "Speak in Catalan."
          : "Habla en castellano de Espana.";

      vapi.on("call-start", () => {
        console.log("Vapi call started");
        setVapiLoading(false);
      });

      vapi.on("call-end", () => {
        console.log("Vapi call ended");
        setVapiLoading(false);
      });

      vapi.on("error", (e) => {
        console.error("Vapi runtime error:", e);
        setVapiLoading(false);
      });

      await vapi.start({
        model: {
          provider: "openai",
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `Eres la secretaria virtual de Pau Vera (pauvepe.com). ${langPrompt}

Pau es un experto en automatizacion con IA en Barcelona. Ofrece: chatbots, agentes de voz, e-commerce automatizado, landing pages, automatizaciones, Facebook/Google Ads, excels complejas.

Tu objetivo: ser amable, responder preguntas, intentar vender los servicios y agendar citas. Puedes consultar el horario y agendar citas.

Experiencia: trabajo con Huella Urbana BCN (+1200 productos, chatbots, CRM automatizado). La web es huellaurbanabcn.com.

Esto es una demo - menciona que este agente de voz es un ejemplo de lo que Pau puede crear.

Respuestas cortas y naturales. Intenta que agenden una cita gratuita en pauvepe.com/booking.`,
            },
          ],
        },
        voice: {
          provider: "11labs",
          voiceId: "pFZP5JQG7iQjIQuC4Bku",
        },
        firstMessage: locale === "en"
          ? "Hi! I'm Pau Vera's AI secretary. How can I help you?"
          : locale === "ca"
          ? "Hola! Soc la secretaria IA de Pau Vera. En que et puc ajudar?"
          : "Hola! Soy la secretaria IA de Pau Vera. En que puedo ayudarte?",
      });
    } catch (error) {
      console.error("Vapi error:", error);
      setVapiLoading(false);
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        alert(t("playground.vapi_mic_error"));
      } else {
        alert(t("playground.vapi_error"));
      }
    }
  };

  return (
    <section className="py-20 bg-[var(--surface)]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 animate-fade-in-up">
          <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
            {t("playground.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
            {t("playground.title1")} <span className="gradient-text">{t("playground.title2")}</span>
          </h2>
          <p className="text-[var(--foreground)]/70">{t("playground.subtitle")}</p>
        </div>

        {/* Bot face + suggestions */}
        <div className="max-w-2xl mx-auto mb-6 flex flex-col items-center gap-4">
          <BotFace state={botState} />
          <p className="text-sm text-[var(--foreground)]/50 text-center">
            {t("playground.try")}
          </p>
          {/* Suggestions - responsive grid for mobile */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center w-full sm:w-auto px-2 sm:px-0">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={s.action}
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/20 text-xs text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-sm">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--foreground)]/40">{t("playground.suggest5")}</p>
        </div>

        {/* Hidden file input for image suggestion */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelected}
          className="hidden"
        />

        {/* Chat + Action buttons */}
        <div className="max-w-2xl mx-auto animate-fade-in-up delay-200">
          <div className="glass rounded-2xl border border-[var(--primary)]/20 overflow-hidden shadow-xl shadow-[var(--primary)]/5">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--foreground)]/10 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                <span className="material-symbols-outlined text-white">smart_toy</span>
              </div>
              <div>
                <h3 className="font-semibold font-[family-name:var(--font-display)] text-sm">
                  {t("playground.assistant")}
                </h3>
                <p className="text-xs text-[var(--foreground)]/60">
                  {isLoading ? t("playground.typing") : t("playground.online")}
                </p>
              </div>
              <div className={`ml-auto w-2 h-2 rounded-full ${isLoading ? "bg-yellow-500 animate-pulse" : "bg-emerald-500"}`} />
            </div>

            <ChatWindow messages={messages} />
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>

          {/* Action buttons row - responsive */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              onClick={handleVapiCall}
              disabled={vapiLoading}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-70"
            >
              <span className={`material-symbols-outlined text-lg ${vapiLoading ? "animate-pulse" : ""}`}>
                {vapiLoading ? "phone_in_talk" : "call"}
              </span>
              {vapiLoading ? t("playground.call_connecting") : t("playground.call_btn")}
            </button>

            <a
              href={`https://wa.me/34637682568?text=${encodeURIComponent(
                locale === "en"
                  ? "Hi! I'm visiting your website and would like to know more."
                  : locale === "ca"
                  ? "Hola! Estic visitant la teva web i minteressaria saber mes."
                  : "Hola! Estoy visitando tu web y me gustaria saber mas."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#25D366]/30 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("playground.whatsapp_btn")}
            </a>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-[var(--foreground)]/40 mt-4">
            {t("playground.disclaimer")}
          </p>
        </div>
      </div>

      {/* Call Me Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--surface)] border border-[var(--primary)]/20 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">call</span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-display)]">
                  {t("playground.callme_title")}
                </h3>
                <p className="text-sm text-[var(--foreground)]/60">
                  {t("playground.callme_desc")}
                </p>
              </div>
            </div>

            <input
              type="tel"
              value={callPhone}
              onChange={(e) => setCallPhone(e.target.value)}
              placeholder={t("playground.callme_placeholder")}
              className="w-full px-4 py-3 rounded-xl border border-[var(--foreground)]/20 bg-[var(--background)] text-[var(--foreground)] text-lg mb-4 focus:outline-none focus:border-[var(--primary)] transition-colors"
              autoFocus
              disabled={callStatus === "calling" || callStatus === "success"}
            />

            {callStatus === "error" && (
              <p className="text-red-500 text-sm mb-3">{t("playground.callme_error")}</p>
            )}
            {callStatus === "success" && (
              <p className="text-emerald-500 text-sm mb-3">{t("playground.callme_success")}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCallModal(false);
                  setCallStatus("idle");
                  setCallPhone("");
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-[var(--foreground)]/20 text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/5 transition-colors font-medium"
                disabled={callStatus === "calling"}
              >
                {t("playground.callme_cancel")}
              </button>
              <button
                onClick={() => triggerOutboundCall(callPhone)}
                disabled={!callPhone.trim() || callStatus === "calling" || callStatus === "success"}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span className={`material-symbols-outlined text-lg ${callStatus === "calling" ? "animate-pulse" : ""}`}>
                  {callStatus === "calling" ? "phone_in_talk" : "call"}
                </span>
                {callStatus === "calling" ? t("playground.callme_calling") : t("playground.callme_submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
