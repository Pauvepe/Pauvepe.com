"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "16:00", "16:30", "17:00", "17:30", "18:00",
];

function generateDates() {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() !== 0 && date.getDay() !== 6) dates.push(date);
  }
  return dates;
}

const dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export default function ManageBookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const token = params.token as string;
  const initialAction = searchParams.get("action") || "cancel";

  const [booking, setBooking] = useState<{
    name: string; email: string; date: string; time: string; reason: string; status: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<"cancel" | "edit">(initialAction as "cancel" | "edit");
  const [done, setDone] = useState<"cancelled" | "edited" | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Edit state
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [busySlots, setBusySlots] = useState<string[]>([]);

  const availableDates = generateDates();

  useEffect(() => {
    fetch(`/api/booking/manage?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setBooking(data);
      })
      .catch(() => setError("Error loading booking"))
      .finally(() => setLoading(false));
  }, [token]);

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
    if (newDate) {
      fetchAvailability(newDate);
      setNewTime("");
    }
  }, [newDate, fetchAvailability]);

  const handleCancel = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "cancel" }),
      });
      const data = await res.json();
      if (data.success) setDone("cancelled");
      else setError(data.error || "Error");
    } catch {
      setError("Error de conexion");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!newDate || !newTime) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action: "edit", date: newDate, time: newTime }),
      });
      const data = await res.json();
      if (data.success) setDone("edited");
      else setError(data.error || "Error");
    } catch {
      setError("Error de conexion");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl animate-spin text-[var(--primary)]">progress_activity</span>
      </section>
    );
  }

  if (error && !booking) {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <span className="material-symbols-outlined text-5xl text-red-500 mb-4">error</span>
          <h1 className="text-2xl font-bold mb-4">Cita no encontrada</h1>
          <p className="text-[var(--foreground)]/70 mb-8">{error}</p>
          <Link href="/booking" className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full">
            Agendar nueva cita
          </Link>
        </div>
      </section>
    );
  }

  if (done === "cancelled") {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-red-500">event_busy</span>
          </div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-4">Cita Cancelada</h1>
          <p className="text-[var(--foreground)]/70 mb-8">Tu cita ha sido cancelada correctamente. Recibiras un email de confirmacion.</p>
          <Link href="/booking" className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full hover:shadow-lg transition-all">
            Agendar nueva cita
          </Link>
        </div>
      </section>
    );
  }

  if (done === "edited") {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-emerald-500">event_available</span>
          </div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-4">Cita Actualizada</h1>
          <p className="text-[var(--foreground)]/70 mb-8">
            Tu cita ha sido cambiada al <strong>{newDate}</strong> a las <strong>{newTime}</strong>. Recibiras un email de confirmacion.
          </p>
          <Link href="/" className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full hover:shadow-lg transition-all">
            Volver al Inicio
          </Link>
        </div>
      </section>
    );
  }

  if (booking?.status === "cancelled") {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h1 className="text-2xl font-bold mb-4">Esta cita ya fue cancelada</h1>
          <Link href="/booking" className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full">
            Agendar nueva cita
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
            Gestionar Cita
          </h1>
          <p className="text-[var(--foreground)]/70">
            Hola <strong>{booking?.name}</strong>, tu cita esta para el <strong>{booking?.date}</strong> a las <strong>{booking?.time}</strong>
          </p>
        </div>

        {/* Action tabs */}
        <div className="flex gap-2 mb-8 justify-center">
          <button
            onClick={() => setAction("edit")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${action === "edit" ? "bg-[var(--primary)] text-white" : "bg-[var(--surface)] border border-[var(--foreground)]/10"}`}
          >
            Editar fecha
          </button>
          <button
            onClick={() => setAction("cancel")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${action === "cancel" ? "bg-red-500 text-white" : "bg-[var(--surface)] border border-[var(--foreground)]/10"}`}
          >
            Cancelar cita
          </button>
        </div>

        {action === "cancel" && (
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <span className="material-symbols-outlined text-4xl text-red-500 mb-4">warning</span>
              <p className="text-lg">Estas seguro de que quieres cancelar tu cita?</p>
              <p className="text-sm text-[var(--foreground)]/60 mt-2">
                {booking?.date} a las {booking?.time}
              </p>
            </div>
            <button
              onClick={handleCancel}
              disabled={submitting}
              className="px-8 py-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all disabled:opacity-50"
            >
              {submitting ? "Cancelando..." : "Si, cancelar cita"}
            </button>
          </div>
        )}

        {action === "edit" && (
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium mb-4">Selecciona nueva fecha</label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {availableDates.map((date) => (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => setNewDate(date.toISOString().split("T")[0])}
                    className={`p-3 rounded-xl border text-center transition-all ${newDate === date.toISOString().split("T")[0]
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "border-[var(--foreground)]/10 hover:border-[var(--primary)]/50"}`}
                  >
                    <div className="text-xs text-[var(--foreground)]/50">{monthNames[date.getMonth()]}</div>
                    <div className="text-xl font-bold">{date.getDate()}</div>
                    <div className="text-xs">{dayNames[date.getDay()]}</div>
                  </button>
                ))}
              </div>
            </div>

            {newDate && (
              <div>
                <label className="block text-sm font-medium mb-4">Selecciona nueva hora</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                  {timeSlots.map((time) => {
                    const isBusy = busySlots.includes(time);
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => !isBusy && setNewTime(time)}
                        disabled={isBusy}
                        className={`py-3 rounded-xl border text-center text-sm transition-all ${
                          isBusy
                            ? "border-[var(--foreground)]/5 bg-[var(--foreground)]/5 text-[var(--foreground)]/30 cursor-not-allowed line-through"
                            : newTime === time
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
            )}

            <button
              onClick={handleEdit}
              disabled={!newDate || !newTime || submitting}
              className="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-full disabled:opacity-50 hover:shadow-lg transition-all"
            >
              {submitting ? "Actualizando..." : "Guardar cambios"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
