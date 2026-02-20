"use client";

import { useState, useEffect, useCallback } from "react";
import { useApp } from "@/context/AppContext";

const timeSlots = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00",
  "16:00", "16:30",
  "17:00", "17:30",
  "18:00",
];

function generateDates() {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(date);
    }
  }
  return dates;
}

const dayNamesI18n: Record<string, string[]> = {
  es: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
  ca: ["Diu", "Dll", "Dma", "Dmc", "Dij", "Div", "Dis"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const monthNamesI18n: Record<string, string[]> = {
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  ca: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export default function BookingPage() {
  const { t, locale } = useApp();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [busySlots, setBusySlots] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    message: "",
    date: "",
    time: "",
  });

  const availableDates = generateDates();
  const dayNames = dayNamesI18n[locale] || dayNamesI18n.es;
  const monthNames = monthNamesI18n[locale] || monthNamesI18n.es;

  const reasons = [
    { value: "automation", label: t("booking.reason_automation") },
    { value: "consulting", label: t("booking.reason_consulting") },
    { value: "chatbots", label: t("booking.reason_chatbots") },
    { value: "ecommerce", label: t("booking.reason_ecommerce") },
    { value: "other", label: t("booking.reason_other") },
  ];

  const fetchAvailability = useCallback(async (date: string) => {
    try {
      const res = await fetch(`/api/booking/availability?date=${date}`);
      const data = await res.json();
      setBusySlots(data.busySlots || []);
    } catch {
      setBusySlots([]);
    }
  }, []);

  useEffect(() => {
    if (formData.date) {
      fetchAvailability(formData.date);
      setFormData((prev) => ({ ...prev, time: "" }));
    }
  }, [formData.date, fetchAvailability]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date) => {
    setFormData((prev) => ({
      ...prev,
      date: date.toISOString().split("T")[0],
    }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let phone = formData.phone.replace(/\D/g, "");
    if (!phone.startsWith("34") && phone.length <= 9) {
      phone = "+34" + phone;
    } else if (!phone.startsWith("+")) {
      phone = "+" + phone;
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone }),
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = formData.name && formData.phone && formData.email && formData.reason;
  const canProceedStep2 = formData.date && formData.time;

  if (submitStatus === "success") {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-emerald-500">check_circle</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t("booking.success_title")}
            </h1>
            <p className="text-lg text-[var(--foreground)]/70 mb-8">
              {t("booking.success_msg")}
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              {t("booking.back_home")}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
              {t("booking.badge")}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t("booking.title1")} <span className="gradient-text">{t("booking.title2")}</span>
            </h1>
            <p className="text-[var(--foreground)]/70">{t("booking.subtitle")}</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white"
                      : "bg-[var(--surface)] text-[var(--foreground)]/40 border border-[var(--foreground)]/10"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 rounded ${
                      step > s
                        ? "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                        : "bg-[var(--foreground)]/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <label className="block text-sm font-medium mb-2">{t("booking.name")} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--foreground)]/10 bg-[var(--surface)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                    placeholder={t("booking.name")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("booking.phone")} *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    maxLength={12}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--foreground)]/10 bg-[var(--surface)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                    placeholder="637 68 25 68"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("booking.email")} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--foreground)]/10 bg-[var(--surface)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("booking.reason")} *</label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--foreground)]/10 bg-[var(--surface)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                  >
                    <option value="">{t("booking.select_option")}</option>
                    {reasons.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("booking.message")}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--foreground)]/10 bg-[var(--surface)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all resize-none"
                    placeholder={t("booking.message_placeholder")}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  {t("booking.next")}
                </button>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <label className="block text-sm font-medium mb-4">{t("booking.select_date")}</label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {availableDates.map((date) => (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          formData.date === date.toISOString().split("T")[0]
                            ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                            : "border-[var(--foreground)]/10 hover:border-[var(--primary)]/50"
                        }`}
                      >
                        <div className="text-xs text-[var(--foreground)]/50">{monthNames[date.getMonth()]}</div>
                        <div className="text-xl font-bold">{date.getDate()}</div>
                        <div className="text-xs">{dayNames[date.getDay()]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4">{t("booking.select_time")}</label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {timeSlots.map((time) => {
                      const isBusy = busySlots.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => !isBusy && handleTimeSelect(time)}
                          disabled={isBusy}
                          className={`py-3 rounded-xl border text-center transition-all ${
                            isBusy
                              ? "border-[var(--foreground)]/5 bg-[var(--foreground)]/5 text-[var(--foreground)]/30 cursor-not-allowed line-through"
                              : formData.time === time
                                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                                : "border-[var(--foreground)]/10 hover:border-[var(--primary)]/50"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border-2 border-[var(--foreground)]/20 rounded-full font-semibold hover:border-[var(--primary)] transition-all"
                  >
                    {t("booking.back")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep2}
                    className="flex-1 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  >
                    {t("booking.next")}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--foreground)]/10">
                  <h3 className="font-bold mb-4 font-[family-name:var(--font-display)]">
                    {t("booking.summary")}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]/60">{t("booking.name")}:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]/60">{t("booking.email")}:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]/60">{t("booking.phone")}:</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]/60">{t("booking.select_date")}:</span>
                      <span className="font-medium">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--foreground)]/60">{t("booking.select_time")}:</span>
                      <span className="font-medium">{formData.time}</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-[var(--foreground)]/60">
                  {t("booking.free_note")}
                </p>

                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center">
                    {t("booking.error")}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border-2 border-[var(--foreground)]/20 rounded-full font-semibold hover:border-[var(--primary)] transition-all"
                  >
                    {t("booking.back")}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full disabled:opacity-50 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">
                          <span className="material-symbols-outlined text-xl">progress_activity</span>
                        </span>
                        {t("booking.sending")}
                      </>
                    ) : (
                      t("booking.confirm")
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
