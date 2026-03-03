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

const dayNamesShort: Record<string, string[]> = {
  es: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
  ca: ["Dll", "Dma", "Dmc", "Dij", "Div", "Dis", "Diu"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

const monthNamesFull: Record<string, string[]> = {
  es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  ca: ["Gener", "Febrer", "Marc", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const days: (Date | null)[] = [];
  for (let i = 0; i < startDow; i++) {
    days.push(null);
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isPastOrToday(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d <= today;
}

function isToday(date: Date) {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}

export default function BookingPage() {
  const { t, locale } = useApp();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    message: "",
    date: "",
    time: "",
  });

  const dayNames = dayNamesShort[locale] || dayNamesShort.es;
  const monthNames = monthNamesFull[locale] || monthNamesFull.es;
  const calendarDays = getCalendarDays(calYear, calMonth);

  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());

  const reasons = [
    { value: "automation", label: t("booking.reason_automation") },
    { value: "consulting", label: t("booking.reason_consulting") },
    { value: "chatbots", label: t("booking.reason_chatbots") },
    { value: "ecommerce", label: t("booking.reason_ecommerce") },
    { value: "other", label: t("booking.reason_other") },
  ];

  const fetchAvailability = useCallback(async (date: string) => {
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/booking/availability?date=${date}`);
      const data = await res.json();
      setBusySlots(data.busySlots || []);
    } catch {
      setBusySlots([]);
    } finally {
      setLoadingSlots(false);
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

  const canGoPrev = calYear > today.getFullYear() || calMonth > today.getMonth();
  const canGoNext = new Date(calYear, calMonth + 1, 1) <= maxDate;

  const goToPrevMonth = () => {
    if (!canGoPrev) return;
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (!canGoNext) return;
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
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

  const selectedDateObj = formData.date ? new Date(formData.date + "T12:00:00") : null;
  const selectedDateFormatted = selectedDateObj
    ? `${selectedDateObj.getDate()} ${monthNames[selectedDateObj.getMonth()]} ${selectedDateObj.getFullYear()}`
    : "";

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

            {/* Step 2: Date & Time with Interactive Calendar */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                {/* Calendar */}
                <div>
                  <label className="block text-sm font-medium mb-4">{t("booking.select_date")}</label>
                  <div className="rounded-2xl border border-[var(--foreground)]/10 bg-[var(--surface)] overflow-hidden">
                    {/* Month navigation */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--foreground)]/10">
                      <button
                        type="button"
                        onClick={goToPrevMonth}
                        disabled={!canGoPrev}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--foreground)]/5 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                      <h3 className="text-lg font-bold font-[family-name:var(--font-display)]">
                        {monthNames[calMonth]} {calYear}
                      </h3>
                      <button
                        type="button"
                        onClick={goToNextMonth}
                        disabled={!canGoNext}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--foreground)]/5 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 px-4 pt-3 pb-1">
                      {dayNames.map((name, i) => (
                        <div
                          key={name}
                          className={`text-center text-xs font-medium py-2 ${
                            i >= 5 ? "text-[var(--foreground)]/30" : "text-[var(--foreground)]/50"
                          }`}
                        >
                          {name}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 px-4 pb-4 gap-y-1">
                      {calendarDays.map((day, index) => {
                        if (!day) {
                          return <div key={`empty-${index}`} className="aspect-square" />;
                        }

                        const disabled = isPastOrToday(day) || isWeekend(day) || day > maxDate;
                        const selected = selectedDateObj && isSameDay(day, selectedDateObj);
                        const todayMark = isToday(day);
                        const weekend = isWeekend(day);

                        return (
                          <button
                            key={day.toISOString()}
                            type="button"
                            onClick={() => !disabled && handleDateSelect(day)}
                            disabled={disabled}
                            className={`
                              aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all relative
                              ${selected
                                ? "bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg scale-105"
                                : disabled
                                  ? weekend
                                    ? "text-[var(--foreground)]/15 cursor-not-allowed"
                                    : "text-[var(--foreground)]/25 cursor-not-allowed"
                                  : "hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] cursor-pointer text-[var(--foreground)]"
                              }
                            `}
                          >
                            {day.getDate()}
                            {todayMark && !selected && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--primary)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected date indicator */}
                  {formData.date && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-[var(--primary)] font-medium">
                      <span className="material-symbols-outlined text-lg">event</span>
                      {selectedDateFormatted}
                    </div>
                  )}
                </div>

                {/* Time slots */}
                <div>
                  <label className="block text-sm font-medium mb-4">{t("booking.select_time")}</label>
                  {!formData.date ? (
                    <div className="text-center py-8 text-[var(--foreground)]/40 text-sm">
                      <span className="material-symbols-outlined text-3xl mb-2 block">calendar_today</span>
                      {t("booking.select_date_first")}
                    </div>
                  ) : loadingSlots ? (
                    <div className="text-center py-8">
                      <span className="material-symbols-outlined text-3xl animate-spin text-[var(--primary)]">progress_activity</span>
                    </div>
                  ) : (
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
                                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                                  : "border-[var(--foreground)]/10 hover:border-[var(--primary)]/50"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Busy legend */}
                  {formData.date && !loadingSlots && busySlots.length > 0 && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-[var(--foreground)]/40">
                      <span className="inline-block w-3 h-3 rounded bg-[var(--foreground)]/5 border border-[var(--foreground)]/10" />
                      {t("booking.busy_slot")}
                    </div>
                  )}
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
                      <span className="font-medium">{selectedDateFormatted}</span>
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
