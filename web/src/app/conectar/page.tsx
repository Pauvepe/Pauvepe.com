"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const META_APP_ID = "770299922790769";

const TIPOS_NEGOCIO = [
  "Estética / Belleza",
  "Micropigmentación",
  "Clínica dental",
  "Veterinaria",
  "Peluquería",
  "Fisioterapia",
  "Restaurante / Bar",
  "Tienda física",
  "E-commerce",
  "Otro",
];

interface FBPage {
  id: string;
  name: string;
  link?: string;
  picture?: { data?: { url?: string } };
  instagram_business_account?: {
    id: string;
    username: string;
    profile_picture_url?: string;
  };
}

interface SessionData {
  session_id: string;
  current_step: number;
  nombre_negocio?: string;
  nombre_dueno?: string;
  email?: string;
  telefono?: string;
  ciudad?: string;
  tipo_negocio?: string;
  direccion?: string;
  web_actual?: string;
  horario?: string;
  fb_user_id?: string;
  fb_access_token?: string;
  fb_page_id?: string;
  fb_page_name?: string;
  ig_username?: string;
  ad_account_id?: string;
  payment_configured?: boolean;
  status?: string;
}

function ConectarWizard() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [sessionId, setSessionId] = useState("");
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Step 1
  const [form, setForm] = useState({
    nombre_negocio: "",
    nombre_dueno: "",
    email: "",
    telefono: "",
    ciudad: "",
    tipo_negocio: "",
    direccion: "",
    web_actual: "",
    horario: "",
  });

  // Step 3
  const [pages, setPages] = useState<FBPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<FBPage | null>(null);
  const [loadingPages, setLoadingPages] = useState(false);

  // Step 4
  const [paymentUrl, setPaymentUrl] = useState("");

  // Init
  useEffect(() => {
    const urlSession = searchParams.get("session");
    const urlStep = searchParams.get("step");
    const urlError = searchParams.get("error");

    if (urlError === "fb_denied") {
      setError("No se ha podido conectar con Facebook. Inténtalo de nuevo.");
    } else if (urlError) {
      setError("Ha ocurrido un error. Inténtalo de nuevo.");
    }

    const sid = urlSession || localStorage.getItem("conectar_session") || crypto.randomUUID();
    setSessionId(sid);
    localStorage.setItem("conectar_session", sid);

    loadSession(sid, urlStep ? parseInt(urlStep) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSession = async (sid: string, overrideStep: number | null) => {
    try {
      const res = await fetch(`/api/conectar/session?session=${sid}`);
      if (res.ok) {
        const data = await res.json();
        setSession(data);
        setStep(overrideStep || data.current_step || 1);
        if (data.nombre_negocio) {
          setForm({
            nombre_negocio: data.nombre_negocio || "",
            nombre_dueno: data.nombre_dueno || "",
            email: data.email || "",
            telefono: data.telefono || "",
            ciudad: data.ciudad || "",
            tipo_negocio: data.tipo_negocio || "",
            direccion: data.direccion || "",
            web_actual: data.web_actual || "",
            horario: data.horario || "",
          });
        }
      }
    } catch {
      // New session
    }
    setLoading(false);
  };

  const saveSession = async (updates: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await fetch("/api/conectar/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, ...updates }),
      });
      if (res.ok) {
        const data = await res.json();
        setSession(data);
      }
    } catch {
      // silent
    }
    setSaving(false);
  };

  const goToStep = (s: number) => {
    setStep(s);
    setError("");
    window.history.replaceState(null, "", `/conectar?session=${sessionId}&step=${s}`);
  };

  // ── Step 1 ──
  const handleStep1 = async () => {
    if (!form.nombre_negocio || !form.nombre_dueno || !form.email || !form.telefono) {
      setError("Rellena los campos obligatorios");
      return;
    }
    setError("");
    await saveSession({ ...form, current_step: 2 });
    goToStep(2);
  };

  // ── Step 2 ──
  const handleFacebookConnect = () => {
    const redirectUri = `${window.location.origin}/api/conectar/callback`;
    const scopes = [
      "pages_manage_ads",
      "pages_read_engagement",
      "pages_manage_posts",
      "pages_manage_metadata",
      "pages_messaging",
      "ads_management",
      "ads_read",
      "business_management",
      "instagram_basic",
      "instagram_manage_comments",
      "instagram_manage_insights",
      "instagram_content_publish",
      "catalog_management",
      "leads_retrieval",
    ].join(",");

    window.location.href = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&state=${sessionId}&response_type=code`;
  };

  // ── Step 3: load pages ──
  useEffect(() => {
    if (step === 3 && session?.fb_access_token) {
      loadPages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, session?.fb_access_token]);

  const loadPages = async () => {
    setLoadingPages(true);
    try {
      const res = await fetch(`/api/conectar/pages?session=${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        const p = data.data || [];
        setPages(p);
        if (p.length === 1) setSelectedPage(p[0]);
      }
    } catch {
      // silent
    }
    setLoadingPages(false);
  };

  const handleSelectPage = async () => {
    if (!selectedPage) {
      setError("Selecciona una página");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/conectar/adaccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          page_id: selectedPage.id,
          page_name: selectedPage.name,
          page_url: selectedPage.link,
          ig_account_id: selectedPage.instagram_business_account?.id,
          ig_username: selectedPage.instagram_business_account?.username,
        }),
      });
      const data = await res.json();
      if (data.payment_url) setPaymentUrl(data.payment_url);
      setSession((prev) =>
        prev ? { ...prev, fb_page_name: selectedPage.name, ig_username: selectedPage.instagram_business_account?.username, ad_account_id: data.ad_account_id } : null
      );
      goToStep(4);
    } catch {
      setError("Error de conexión");
    }
    setSaving(false);
  };

  // ── Step 4 ──
  const handlePaymentDone = async () => {
    await saveSession({ payment_configured: true, current_step: 5, status: "completo" });
    goToStep(5);
  };

  // ── Render ──

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      {/* Header mini */}
      <header className="py-4 px-4 text-center">
        <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}>
          Pau Vera
        </span>
      </header>

      {/* Progress */}
      <div className="px-4 pb-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0"
                style={{
                  background: s < step ? "var(--secondary)" : s === step ? "var(--primary)" : "#ddd",
                  color: s <= step ? "#fff" : "#999",
                }}
              >
                {s < step ? (
                  <span className="material-symbols-outlined text-[18px]">check</span>
                ) : (
                  s
                )}
              </div>
              {s < 5 && (
                <div
                  className="flex-1 h-0.5 mx-1"
                  style={{ background: s < step ? "var(--secondary)" : "#ddd" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-8">
        <div className="max-w-md mx-auto">
          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>
              {error}
              <button onClick={() => setError("")} className="float-right font-bold">×</button>
            </div>
          )}

          {/* ═══ STEP 1: Datos ═══ */}
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Cuéntanos sobre tu negocio
              </h1>
              <p className="text-sm mb-6" style={{ color: "var(--foreground)", opacity: 0.6 }}>
                Necesitamos algunos datos básicos. Solo tarda 1 minuto.
              </p>

              <div className="space-y-4">
                <Field label="Nombre del negocio *" value={form.nombre_negocio} onChange={(v) => setForm({ ...form, nombre_negocio: v })} placeholder="Ej: Clínica WildBeauty" />
                <Field label="Tu nombre *" value={form.nombre_dueno} onChange={(v) => setForm({ ...form, nombre_dueno: v })} placeholder="Ej: María García" />
                <Field label="Email *" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" placeholder="maria@gmail.com" />
                <Field label="Teléfono *" value={form.telefono} onChange={(v) => setForm({ ...form, telefono: v })} type="tel" placeholder="+34 612 345 678" />
                <Field label="Ciudad" value={form.ciudad} onChange={(v) => setForm({ ...form, ciudad: v })} placeholder="Barcelona" />

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Tipo de negocio</label>
                  <select
                    value={form.tipo_negocio}
                    onChange={(e) => setForm({ ...form, tipo_negocio: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all"
                    style={{ background: "var(--surface)", border: "2px solid transparent", color: "var(--foreground)" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "transparent")}
                  >
                    <option value="">Selecciona...</option>
                    {TIPOS_NEGOCIO.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <details className="group">
                  <summary className="text-sm cursor-pointer" style={{ color: "var(--primary)" }}>
                    Más datos (opcional)
                  </summary>
                  <div className="mt-3 space-y-4">
                    <Field label="Dirección" value={form.direccion} onChange={(v) => setForm({ ...form, direccion: v })} placeholder="Calle Gran Vía, 123" />
                    <Field label="Web actual" value={form.web_actual} onChange={(v) => setForm({ ...form, web_actual: v })} placeholder="https://..." />
                    <Field label="Horario" value={form.horario} onChange={(v) => setForm({ ...form, horario: v })} placeholder="L-V 9:00-19:00" />
                  </div>
                </details>
              </div>

              <BigButton onClick={handleStep1} loading={saving} label="Siguiente" />
            </div>
          )}

          {/* ═══ STEP 2: Facebook ═══ */}
          {step === 2 && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#1877F2" }}>
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Conecta tu Facebook
              </h1>
              <p className="text-sm mb-8" style={{ color: "var(--foreground)", opacity: 0.6 }}>
                Haz clic en el botón y acepta los permisos.
                <br />Es como iniciar sesión en Facebook, nada más.
              </p>

              <button
                onClick={handleFacebookConnect}
                className="w-full py-4 px-6 rounded-2xl text-white text-lg font-bold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "#1877F2" }}
              >
                Conectar con Facebook
              </button>

              <div className="mt-8 space-y-3 text-sm" style={{ color: "var(--foreground)", opacity: 0.5 }}>
                <p>
                  ¿No tienes Facebook?{" "}
                  <a href="https://www.facebook.com/signup" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--primary)" }}>
                    Créate una cuenta
                  </a>
                </p>
                <p>
                  ¿Problemas?{" "}
                  <a href="https://wa.me/34637682568" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--primary)" }}>
                    Contacta con Pau
                  </a>
                </p>
              </div>

              <BackButton onClick={() => goToStep(1)} />
            </div>
          )}

          {/* ═══ STEP 3: Elegir página + IG ═══ */}
          {step === 3 && (
            <div>
              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Elige la página de tu negocio
              </h1>
              <p className="text-sm mb-6" style={{ color: "var(--foreground)", opacity: 0.6 }}>
                Selecciona la página de Facebook de tu negocio.
              </p>

              {loadingPages ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-3 rounded-full animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
                </div>
              ) : pages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm mb-4" style={{ opacity: 0.6 }}>No se han encontrado páginas en tu cuenta.</p>
                  <p className="text-sm" style={{ opacity: 0.5 }}>
                    ¿No tienes página?{" "}
                    <a href="https://www.facebook.com/pages/create" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--primary)" }}>
                      Crea una aquí
                    </a>{" "}
                    y vuelve a conectar.
                  </p>
                  <button onClick={() => goToStep(2)} className="mt-4 underline text-sm" style={{ color: "var(--primary)" }}>
                    Volver a conectar
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {pages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => setSelectedPage(page)}
                      className="w-full p-4 rounded-2xl text-left transition-all"
                      style={{
                        background: "var(--surface)",
                        border: selectedPage?.id === page.id ? "2px solid var(--primary)" : "2px solid transparent",
                        boxShadow: selectedPage?.id === page.id ? "0 0 0 2px var(--primary)" : "none",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {page.picture?.data?.url ? (
                          <img src={page.picture.data.url} alt="" className="w-12 h-12 rounded-full" />
                        ) : (
                          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#1877F2" }}>
                            <span className="text-white font-bold text-lg">{page.name[0]}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold truncate" style={{ color: "var(--foreground)" }}>{page.name}</p>
                          {page.instagram_business_account && (
                            <p className="text-sm" style={{ color: "var(--secondary)" }}>
                              @{page.instagram_business_account.username}
                            </p>
                          )}
                        </div>
                        {selectedPage?.id === page.id && (
                          <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>check_circle</span>
                        )}
                      </div>
                    </button>
                  ))}

                  {selectedPage?.instagram_business_account && (
                    <div className="mt-4 p-4 rounded-2xl" style={{ background: "var(--surface)" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>Instagram detectado</p>
                          <p className="text-sm" style={{ color: "var(--secondary)" }}>@{selectedPage.instagram_business_account.username}</p>
                        </div>
                        <span className="material-symbols-outlined ml-auto" style={{ color: "var(--secondary)" }}>check_circle</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {pages.length > 0 && (
                <BigButton onClick={handleSelectPage} loading={saving} label="Continuar" disabled={!selectedPage} />
              )}
              <BackButton onClick={() => goToStep(2)} />
            </div>
          )}

          {/* ═══ STEP 4: Método de pago ═══ */}
          {step === 4 && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--surface)" }}>
                <span className="material-symbols-outlined text-[40px]" style={{ color: "var(--primary)" }}>credit_card</span>
              </div>

              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Añade un método de pago
              </h1>
              <p className="text-sm mb-8" style={{ color: "var(--foreground)", opacity: 0.6 }}>
                Para poder hacer anuncios, Facebook necesita una tarjeta.
                <br />Puede ser de débito o crédito.
              </p>

              {paymentUrl ? (
                <a
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full py-4 px-6 rounded-2xl text-white text-lg font-bold transition-all hover:opacity-90"
                  style={{ background: "var(--primary)" }}
                >
                  Añadir tarjeta en Facebook
                </a>
              ) : (
                <p className="text-sm p-4 rounded-xl" style={{ background: "var(--surface)", opacity: 0.7 }}>
                  No se ha podido crear la cuenta publicitaria automáticamente.
                  <br />Contacta con Pau para configurarlo.
                </p>
              )}

              <div className="mt-6">
                <button
                  onClick={handlePaymentDone}
                  disabled={saving}
                  className="w-full py-3 px-6 rounded-2xl text-base font-medium transition-all"
                  style={{ background: "var(--surface)", color: "var(--foreground)", border: "2px solid var(--secondary)" }}
                >
                  {saving ? "Guardando..." : "Ya he añadido la tarjeta"}
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={async () => {
                    await saveSession({ payment_configured: false, current_step: 5, status: "pendiente_pago" });
                    goToStep(5);
                  }}
                  className="text-sm underline"
                  style={{ color: "var(--foreground)", opacity: 0.4 }}
                >
                  Lo haré más tarde
                </button>
              </div>

              <BackButton onClick={() => goToStep(3)} />
            </div>
          )}

          {/* ═══ STEP 5: Confirmación ═══ */}
          {step === 5 && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--secondary)" }}>
                <span className="material-symbols-outlined text-[40px] text-white">check</span>
              </div>

              <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {session?.payment_configured ? "¡Todo configurado!" : "¡Casi listo!"}
              </h1>
              <p className="text-sm mb-8" style={{ color: "var(--foreground)", opacity: 0.6 }}>
                {session?.payment_configured
                  ? "Pau se encarga de todo a partir de aquí."
                  : "Solo falta el método de pago. Te avisaremos cuando esté todo listo."}
              </p>

              <div className="space-y-3 text-left">
                <SummaryRow icon="store" label="Negocio" value={session?.nombre_negocio || "-"} ok />
                <SummaryRow icon="facebook" label="Facebook" value={session?.fb_page_name || "-"} ok={!!session?.fb_page_name} isSvg />
                <SummaryRow icon="photo_camera" label="Instagram" value={session?.ig_username ? `@${session.ig_username}` : "No conectado"} ok={!!session?.ig_username} />
                <SummaryRow icon="credit_card" label="Pago" value={session?.payment_configured ? "Configurado" : "Pendiente"} ok={!!session?.payment_configured} />
                <SummaryRow icon="ads_click" label="Cuenta publicitaria" value={session?.ad_account_id ? "Creada" : "Pendiente"} ok={!!session?.ad_account_id} />
              </div>

              <div className="mt-8 p-4 rounded-2xl" style={{ background: "var(--surface)" }}>
                <p className="text-sm font-medium mb-3" style={{ color: "var(--foreground)" }}>
                  Pau te avisará cuando tus primeros anuncios estén activos.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/34637682568"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl text-white text-sm font-bold text-center"
                    style={{ background: "#25D366" }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href="mailto:pauvepe05@gmail.com"
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-center"
                    style={{ background: "var(--primary)", color: "white" }}
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer mini */}
      <footer className="py-4 text-center text-xs" style={{ color: "var(--foreground)", opacity: 0.3 }}>
        pauvepe.com
      </footer>
    </div>
  );
}

// ── Components ──

function Field({ label, value, onChange, type = "text", placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all"
        style={{ background: "var(--surface)", border: "2px solid transparent", color: "var(--foreground)" }}
        onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
        onBlur={(e) => (e.target.style.borderColor = "transparent")}
      />
    </div>
  );
}

function BigButton({ onClick, loading, label, disabled }: {
  onClick: () => void;
  loading: boolean;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="w-full mt-8 py-4 px-6 rounded-2xl text-white text-lg font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
      style={{ background: "var(--primary)" }}
    >
      {loading ? (
        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mx-auto" />
      ) : (
        label
      )}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 text-sm underline block mx-auto"
      style={{ color: "var(--foreground)", opacity: 0.4 }}
    >
      Atrás
    </button>
  );
}

function SummaryRow({ icon, label, value, ok, isSvg }: {
  icon: string;
  label: string;
  value: string;
  ok: boolean;
  isSvg?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface)" }}>
      {isSvg ? (
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#1877F2" }}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      ) : (
        <span className="material-symbols-outlined text-[20px]" style={{ color: ok ? "var(--secondary)" : "#999" }}>{icon}</span>
      )}
      <span className="text-sm flex-1" style={{ color: "var(--foreground)" }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: ok ? "var(--secondary)" : "var(--foreground)", opacity: ok ? 1 : 0.4 }}>{value}</span>
    </div>
  );
}

// ── Wrapper with Suspense (required for useSearchParams) ──

export default function ConectarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
          <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
        </div>
      }
    >
      <ConectarWizard />
    </Suspense>
  );
}
