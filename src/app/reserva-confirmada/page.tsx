"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Script from "next/script";
import { CheckCircle2, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const CALENDLY_BASE = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/beautyystudio/turno";

function ReservaContent() {
  const params = useSearchParams();
  const router = useRouter();
  // Fix: MP re-encodes spaces as + in redirect URLs — replace before display
  const name = (params.get("name") ?? "").replace(/\+/g, " ");
  const services = (params.get("services") ?? "").replace(/\+/g, " ");
  const [booked, setBooked] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Build URL manually — URLSearchParams encodes spaces as + but Calendly doesn't decode them
  const qp = [
    "hide_gdpr_banner=1",
    "background_color=fde8ec",
    "primary_color=c9647b",
    ...(name ? [`name=${encodeURIComponent(name)}`] : []),
    ...(services ? [`a1=${encodeURIComponent(services)}`] : []),
  ];
  const calendlyUrlStr = `${CALENDLY_BASE}?${qp.join("&")}`;

  // Listen for Calendly booking completion
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data && e.data.event === "calendly.event_scheduled") {
        setBooked(true);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Countdown + auto-redirect after booking
  useEffect(() => {
    if (!booked) return;
    if (countdown <= 0) {
      router.push("/");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [booked, countdown, router]);

  // Re-init widget after script loads or params change
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cal = (window as any).Calendly;
    if (cal) {
      cal.initInlineWidget({
        url: calendlyUrlStr,
        parentElement: document.getElementById("calendly-embed"),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, services]);

  return (
    <main className="min-h-screen bg-[#fde8ec]">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).Calendly.initInlineWidget({
            url: calendlyUrlStr,
            parentElement: document.getElementById("calendly-embed"),
          });
        }}
      />

      {/* Header confirmación */}
      <div className="flex flex-col items-center gap-4 pt-12 pb-8 px-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#f5c6d0] flex items-center justify-center">
          <CheckCircle2 size={28} className="text-[#c9647b]" />
        </div>
        <div>
          <h1 className="font-heading text-[#1c1c1c] text-3xl mb-1">
            {name ? `¡Gracias, ${name}!` : "¡Seña confirmada!"}
          </h1>
          <p className="font-sans text-[#7a6468] text-sm max-w-sm mx-auto leading-relaxed">
            {services ? (
              <>Reservaste <strong className="text-[#c9647b]">{services}</strong>. Elegí tu fecha y horario.</>
            ) : (
              "Tu pago fue procesado. Elegí el día y horario de tu turno."
            )}
          </p>
        </div>
      </div>

      {/* Post-booking banner */}
      {booked && (
        <div className="max-w-3xl mx-auto px-4 mb-6">
          <div className="bg-[#c9647b] text-white rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="text-center sm:text-left">
              <p className="font-heading text-xl">¡Turno agendado!</p>
              <p className="font-sans text-sm text-white/80">
                Vas a recibir la confirmación por email. Redirigiendo al inicio en{" "}
                <span className="font-bold text-white">{countdown}s</span>…
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-white text-[#c9647b] font-sans font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#faf0f3] transition-colors whitespace-nowrap"
            >
              <Home size={15} />
              Volver al inicio
            </a>
          </div>
        </div>
      )}

      {/* Calendly embed */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div
            id="calendly-embed"
            className="calendly-inline-widget"
            data-url={calendlyUrlStr}
            style={{ minWidth: 320, height: 700 }}
          />
        </div>
        {!booked && (
          <p className="font-sans text-[#7a6468] text-xs text-center mt-4">
            Una vez que elijas el horario, recibirás la confirmación por email.
          </p>
        )}
        {!booked && (
          <div className="text-center mt-3">
            <a href="/" className="inline-flex items-center gap-1.5 font-sans text-sm text-[#7a6468] hover:text-[#c9647b] transition-colors underline underline-offset-4 decoration-[#f0c8d0] hover:decoration-[#c9647b]">
              <Home size={13} />
              Volver al inicio
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ReservaConfirmada() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#fde8ec] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#c9647b] border-t-transparent animate-spin" />
      </main>
    }>
      <ReservaContent />
    </Suspense>
  );
}
