"use client";

import { useState } from "react";

interface ROICalculatorProps {
  type: "servicios" | "ecommerce";
  setupCost?: number;
  crmMonthly?: number;
  crmFreeMonths?: number;
}

export default function ROICalculator({
  type,
  setupCost = 600,
  crmMonthly = 100,
  crmFreeMonths = 3,
}: ROICalculatorProps) {
  const [months, setMonths] = useState<3 | 6 | 9>(3);
  const [adsMonthly, setAdsMonthly] = useState(300);

  const paidCrmMonths = Math.max(0, months - crmFreeMonths);
  const totalAds = adsMonthly * months;
  const totalCRM = type === "servicios" ? crmMonthly * paidCrmMonths : 0;
  const totalInversion = setupCost + totalAds + totalCRM;
  const objetivoX2 = totalInversion * 2;
  const maxRefund = Math.min(totalAds, setupCost);
  const peorCaso = Math.max(0, setupCost - totalAds);

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--foreground)]/10 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] p-6 text-white text-center">
        <h3 className="text-2xl font-bold font-[family-name:var(--font-display)]">
          Objetivo: duplicar tu inversion
        </h3>
        <p className="opacity-90 text-sm mt-1">
          Tu pones X. Yo te devuelvo 2X. Si no lo consigo, te devuelvo el dinero.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Period selector */}
        <div>
          <label className="text-sm font-medium text-[var(--foreground)]/60 mb-2 block">
            Periodo
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
              </button>
            ))}
          </div>
        </div>

        {/* Ads slider */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-[var(--foreground)]/60">
              Presupuesto de anuncios al mes
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
          <div className="flex justify-between text-[10px] text-[var(--foreground)]/30 mt-1">
            <span>300 EUR</span>
            <span>2.000 EUR</span>
          </div>
        </div>

        {/* Investment breakdown */}
        <div className="p-4 rounded-xl bg-[var(--foreground)]/5 space-y-2">
          <p className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wide">Tu inversion total</p>
          <p className="text-3xl font-bold font-[family-name:var(--font-display)]">
            {totalInversion.toLocaleString("es-ES")} EUR
          </p>
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs text-[var(--foreground)]/50">
              <span>Setup {type === "servicios" && "(CRM + chatbots + 3 meses IA gratis)"}</span>
              <span className="font-medium">{setupCost} EUR</span>
            </div>
            <div className="flex justify-between text-xs text-[var(--foreground)]/50">
              <span>Anuncios ({adsMonthly}/mes x {months} meses)</span>
              <span className="font-medium">{totalAds.toLocaleString("es-ES")} EUR</span>
            </div>
            {totalCRM > 0 && (
              <div className="flex justify-between text-xs text-[var(--foreground)]/50">
                <span>IA ({crmMonthly}/mes x {paidCrmMonths} meses de pago)</span>
                <span className="font-medium">{totalCRM} EUR</span>
              </div>
            )}
            {type === "servicios" && paidCrmMonths === 0 && (
              <div className="flex items-center gap-1 text-xs text-[var(--secondary)] font-medium pt-1">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Los {months} meses de IA van incluidos gratis
              </div>
            )}
            {type === "servicios" && (
              <p className="text-[10px] text-[var(--foreground)]/30 pt-1">
                Despues del setup: CRM tuyo gratis para siempre. IA opcional a {crmMonthly} EUR/mes.
              </p>
            )}
          </div>
        </div>

        {/* THE x2 OBJECTIVE - big and clear */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--secondary)]/5 border-2 border-[var(--secondary)]/30">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--secondary)] text-white text-xs font-bold rounded-full">
            OBJETIVO
          </div>
          <div className="text-center pt-2">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="text-center">
                <p className="text-xs text-[var(--foreground)]/40">Inviertes</p>
                <p className="text-lg font-bold">{totalInversion.toLocaleString("es-ES")}</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-[var(--secondary)]">arrow_forward</span>
              <div className="text-center">
                <p className="text-xs text-[var(--secondary)]">Facturas</p>
                <p className="text-3xl font-bold text-[var(--secondary)] font-[family-name:var(--font-display)]">
                  {objetivoX2.toLocaleString("es-ES")} EUR
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--foreground)]/60">
              Duplicar lo invertido en <strong>{months} meses</strong>. Ese es el objetivo.
            </p>
          </div>
        </div>

        {/* What happens in each scenario */}
        <div className="grid grid-cols-1 gap-3">
          {/* If it works */}
          <div className="p-4 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[var(--secondary)] text-xl mt-0.5">trending_up</span>
              <div>
                <p className="font-semibold text-[var(--secondary)] text-sm font-[family-name:var(--font-display)]">
                  Si funciona (lo normal)
                </p>
                <p className="text-xs text-[var(--foreground)]/60 mt-1">
                  Facturas <strong>{objetivoX2.toLocaleString("es-ES")} EUR</strong> o mas.
                  {type === "ecommerce"
                    ? " Tu tienda online sigue vendiendo cada mes."
                    : " El sistema sigue trabajando para ti cada dia."}
                  {" "}Seguimos creciendo juntos.
                </p>
              </div>
            </div>
          </div>

          {/* If it doesn't */}
          <div className="p-4 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/20">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[var(--primary)] text-xl mt-0.5">shield</span>
              <div>
                <p className="font-semibold text-[var(--primary)] text-sm font-[family-name:var(--font-display)]">
                  Si no funciona (te devuelvo el dinero)
                </p>
                <p className="text-xs text-[var(--foreground)]/60 mt-1">
                  Te devuelvo hasta <strong>{maxRefund.toLocaleString("es-ES")} EUR</strong> de los anuncios.
                  {peorCaso === 0
                    ? " No pagas NADA."
                    : ` Solo pagas ${peorCaso.toLocaleString("es-ES")} EUR.`}
                  {type === "ecommerce"
                    ? " Tu tienda online se queda tuya para siempre."
                    : " Tu CRM y chatbots se quedan tuyos para siempre."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="text-center p-4 rounded-xl bg-[var(--foreground)]/5">
          <p className="text-sm text-[var(--foreground)]/70">
            <strong>Resumen:</strong> tu puedes ganar {objetivoX2.toLocaleString("es-ES")} EUR.
            Tu riesgo maximo: {peorCaso === 0 ? "cero euros" : `${peorCaso.toLocaleString("es-ES")} EUR`}.
          </p>
          <p className="text-xs text-[var(--foreground)]/40 mt-1">
            Lo unico que necesitas hacer: 8 minutos de video al dia.
          </p>
        </div>
      </div>
    </div>
  );
}
