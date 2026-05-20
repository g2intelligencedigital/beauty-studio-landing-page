"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Script from "next/script";
import { CheckCircle2 } from "lucide-react";

const CALENDLY_BASE = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/beautyystudio/turno";

function ReservaContent() {
  const params = useSearchParams();
  const name = params.get("name") ?? "";
  const services = params.get("services") ?? "";

  const calendlyUrl = new URL(CALENDLY_BASE);
  if (name) calendlyUrl.searchParams.set("name", name);
  if (services) calendlyUrl.searchParams.set("a1", services);
  calendlyUrl.searchParams.set("hide_gdpr_banner", "1");
  calendlyUrl.searchParams.set("background_color", "fde8ec");
  calendlyUrl.searchParams.set("primary_color", "c9647b");

  // Re-init widget after script loads or params change
  useEffect(() => {
    if (typeof window !== "undefined" && (window as { Calendly?: { initInlineWidget: (opts: object) => void } }).Calendly) {
      (window as { Calendly: { initInlineWidget: (opts: object) => void } }).Calendly.initInlineWidget({
        url: calendlyUrl.toString(),
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
          (window as { Calendly: { initInlineWidget: (opts: object) => void } }).Calendly.initInlineWidget({
            url: calendlyUrl.toString(),
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

      {/* Calendly embed */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div
            id="calendly-embed"
            className="calendly-inline-widget"
            data-url={calendlyUrl.toString()}
            style={{ minWidth: 320, height: 700 }}
          />
        </div>
        <p className="font-sans text-[#7a6468] text-xs text-center mt-4">
          Una vez que elijas el horario, recibirás la confirmación por email.
        </p>
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
