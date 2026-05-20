"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { WA_TURNO_URL, IG_URL } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

export function Contacto() {
  return (
    <section id="turnos" className="bg-[#c9647b] py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="font-heading text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
            ¿Lista para
            <br />
            tu turno?
          </h2>
          <p className="font-sans text-white/80 text-base md:text-lg max-w-md leading-relaxed">
            Escribinos por WhatsApp y coordinamos el día y horario que mejor
            te quede. Sin formularios, sin esperas.
          </p>

          <a
            href={WA_TURNO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white text-[#c9647b] hover:bg-[#faf0f3] font-sans font-semibold text-sm tracking-wide px-8 py-4 rounded-full transition-colors duration-200 shadow-lg"
          >
            <MessageCircle size={18} />
            Escribir por WhatsApp
          </a>

          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-sans text-sm transition-colors"
          >
            <InstagramIcon size={15} />
            O seguinos en Instagram
          </a>

          {/* Mapa */}
          <div className="w-full max-w-xl mt-4 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=-33.3116295,-66.3440071&z=17&output=embed&hl=es"
              width="100%"
              height="220"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Beautyy Studio"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/vD1pPJbor1CLvGYP7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white font-sans text-xs transition-colors"
          >
            Ver en Google Maps →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
