"use client";

import { useState } from "react";

interface ROICalculatorProps {
  type: "servicios" | "ecommerce";
  defaultTicket?: number;
  defaultClients?: number;
  setupCost?: number;
  crmMonthly?: number;
  crmFreeMonths?: number;
}

export default function ROICalculator({
  type,
  defaultTicket = 200,
  defaultClients = 15,
  setupCost = 600,
  crmMonthly = 100,
  crmFreeMonths = 3,
}: ROICalculatorProps) {
  const [months, setMonths] = useState<3 | 6 | 9>(3);
  const [adsMonthly, setAdsMonthly] = useState(300);
  const [ticketMedio, setTicketMedio] = useState(defaultTicket);
  const [clientesNuevos, setClientesNuevos] = useState(defaultClients);

  const paidCrmMonths = Math.max(0, months - crmFreeMonths);
  const totalAds = adsMonthly * months;
  const totalCRM = crmMonthly * paidCrmMonths;
  const totalInversion = setupCost + totalAds + totalCRM;

  const ingresosMensuales = ticketMedio * clientesNuevos;
  const ingresosTotal = ingresosMensuales * months;
  const beneficioNeto = ingresosTotal - totalInversion;
  const roi = totalInversion > 0 ? ((ingresosTotal / totalInversion) * 100).toFixed(0) : "0";

  const maxRefund = Math.min(totalAds, setupCost);
  const peorCaso = Math.max(0, setupCost - totalAds);

  // Build breakdown string
  const breakdownParts = [`${setupCost} setup`, `${totalAds} ads`];
  if (totalCRM > 0) breakdownParts.push(`${totalCRM} IA`);

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--foreground)]/10 overflow-hidden">
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] p-6 text-white">
        <h3 className="text-2xl font-bold font-[family-name:var(--font-display)]">
          Calculadora de Resultados
        </h3>
        <p className="opacity-90 text-sm mt-1">
          Mira lo que puedes ganar. Y lo que no puedes perder.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Period selector */}
        <div>
          <label className="text-sm font-medium text-[var(--foreground)]/60 mb-2 block">
            Periodo de tiempo
          </label>
          <div className="flex gap-2">
            {([3, 6, 9] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  months === m
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30"
                    : "bg-[var(--foreground)]/5 text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/10"
                }`}
              >
                {m} meses
                {m <= crmFreeMonths && type === "servicios" && (
                  <span className="block text-[10px] opacity-75">IA gratis</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-[var(--foreground)]/60">
                Presupuesto ads/mes
              </label>
              <span className="text-sm font-bold text-[var(--primary)]">{adsMonthly} EUR</span>
            </div>
            <input
              type="range"
              min={300}
              max={2000}
              step={100}
              value={adsMonthly}
              onChange={(e) => setAdsMonthly(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-[var(--foreground)]/60">
                {type === "ecommerce" ? "Ticket medio por venta" : "Valor medio por cliente"}
              </label>
              <span className="text-sm font-bold text-[var(--primary)]">{ticketMedio} EUR</span>
            </div>
            <input
              type="range"
              min={30}
              max={2000}
              step={10}
              value={ticketMedio}
              onChange={(e) => setTicketMedio(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-[var(--foreground)]/60">
                {type === "ecommerce" ? "Ventas nuevas/mes" : "Clientes nuevos/mes"}
              </label>
              <span className="text-sm font-bold text-[var(--primary)]">{clientesNuevos}</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={1}
              value={clientesNuevos}
              onChange={(e) => setClientesNuevos(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[var(--foreground)]/5">
            <p className="text-xs text-[var(--foreground)]/50 mb-1">Tu inversion total</p>
            <p className="text-lg font-bold">{totalInversion.toLocaleString("es-ES")} EUR</p>
            <div className="mt-1 space-y-0.5">
              <p className="text-[10px] text-[var(--foreground)]/40">
                {setupCost} setup
                {type === "servicios" && <span className="text-[var(--secondary)]"> (CRM + {crmFreeMonths} meses IA gratis)</span>}
              </p>
              <p className="text-[10px] text-[var(--foreground)]/40">{totalAds} ads ({adsMonthly}/mes x {months})</p>
              {totalCRM > 0 && (
                <p className="text-[10px] text-[var(--foreground)]/40">
                  {totalCRM} IA ({crmMonthly}/mes x {paidCrmMonths} meses)
                </p>
              )}
              {type === "servicios" && paidCrmMonths === 0 && (
                <p className="text-[10px] text-[var(--secondary)] font-medium">
                  IA incluida gratis estos {months} meses
                </p>
              )}
              {type === "servicios" && (
                <p className="text-[10px] text-[var(--foreground)]/30 mt-1">
                  Despues: CRM gratis para siempre. IA opcional {crmMonthly} EUR/mes.
                </p>
              )}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--secondary)]/10">
            <p className="text-xs text-[var(--secondary)] mb-1">Ingresos estimados</p>
            <p className="text-lg font-bold text-[var(--secondary)]">
              {ingresosTotal.toLocaleString("es-ES")} EUR
            </p>
            <p className="text-[10px] text-[var(--secondary)]/60 mt-1">
              {clientesNuevos} x {ticketMedio} EUR x {months} meses
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--primary)]/10">
            <p className="text-xs text-[var(--primary)] mb-1">Beneficio neto</p>
            <p className={`text-lg font-bold ${beneficioNeto >= 0 ? "text-[var(--secondary)]" : "text-red-500"}`}>
              {beneficioNeto >= 0 ? "+" : ""}{beneficioNeto.toLocaleString("es-ES")} EUR
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--primary)]/10">
            <p className="text-xs text-[var(--primary)] mb-1">ROI</p>
            <p className="text-lg font-bold text-[var(--primary)]">{roi}%</p>
          </div>
        </div>

        {/* Guarantee box */}
        <div className="p-5 rounded-2xl border-2 border-[var(--secondary)] bg-[var(--secondary)]/5">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-2xl text-[var(--secondary)] mt-0.5">
              verified
            </span>
            <div>
              <h4 className="font-bold text-[var(--secondary)] font-[family-name:var(--font-display)]">
                Garantia: No puedes perder
              </h4>
              <p className="text-sm text-[var(--foreground)]/70 mt-1">
                Si en {months} meses los anuncios no generan resultados, te devuelvo
                hasta <strong>{maxRefund.toLocaleString("es-ES")} EUR</strong> de lo invertido en ads.
                {type === "ecommerce"
                  ? " Tu tienda online se queda tuya para siempre."
                  : " Tu CRM, chatbots y todo el sistema se quedan activos."}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-white/50">
                  <p className="text-[var(--foreground)]/50">Peor escenario</p>
                  <p className="font-bold">
                    Pagas {peorCaso.toLocaleString("es-ES")} EUR
                    {peorCaso === 0 ? " (NADA)" : ""}
                    {type === "ecommerce"
                      ? " y tienes tu tienda online"
                      : " y tienes todo el sistema"}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-[var(--secondary)]/10">
                  <p className="text-[var(--secondary)]/60">Mejor escenario</p>
                  <p className="font-bold text-[var(--secondary)]">
                    +{ingresosTotal.toLocaleString("es-ES")} EUR en {months} meses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
