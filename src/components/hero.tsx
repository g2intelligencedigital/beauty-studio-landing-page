"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";
import { services } from "@/data/services";
import { WA_TURNO_URL } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const heroServices = services.slice(0, 3);

const badgeColors: Record<string, string> = {
  "MÁS PEDIDO": "bg-[#c9647b] text-white",
  "PROMO DEL MES": "bg-[#1c1c1c] text-white",
};

const cardRotations = [-3, 2, -1.5];

export function Hero() {
  return (
    <section
      id="inicio"
      className="min-h-screen bg-[#fde8ec] pt-16 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          {/* Location pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 bg-white/70 border border-[#f0c8d0] rounded-full px-4 py-2 w-fit"
          >
            <MapPin size={13} className="text-[#c9647b]" />
            <a
              href="https://maps.app.goo.gl/vD1pPJbor1CLvGYP7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-widest uppercase font-sans text-[#7a6468] font-medium hover:text-[#c9647b] transition-colors"
            >
              Av. Lafinur 164, San Luis, Argentina
            </a>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <h1 className="font-heading text-[#1c1c1c] text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Tu mejor versión,
              <br />
              <span className="text-[#c9647b]">a un turno</span>
              <br />
              de distancia.
            </h1>
          </motion.div>

          {/* Script tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="font-script text-[#7a6468] text-xl md:text-2xl"
          >
            Porque merecés sentirte bien, hoy.
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.28 }}
            className="font-sans text-[#7a6468] text-base leading-relaxed max-w-sm"
          >
            Un espacio pensado para realzar tu belleza natural. Tratamientos
            exclusivos con productos premium en San Luis.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.36 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={WA_TURNO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9647b] hover:bg-[#a84f64] text-white text-sm font-sans font-semibold tracking-wide px-7 py-3.5 rounded-full transition-colors duration-200"
            >
              <MessageCircle size={16} />
              Reservar turno
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center text-sm font-sans font-semibold tracking-wide text-[#1c1c1c] underline underline-offset-4 decoration-[#f0c8d0] hover:decoration-[#c9647b] transition-all duration-200 px-2"
            >
              Ver servicios
            </a>
          </motion.div>
        </div>

        {/* Right column — floating service cards */}
        <div className="relative h-[420px] lg:h-[500px] hidden md:block">
          {heroServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30, rotate: cardRotations[i] }}
              animate={{ opacity: 1, y: 0, rotate: cardRotations[i] }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: 0.3 + i * 0.15,
              }}
              style={{
                top: `${i * 120 + 20}px`,
                right: i % 2 === 0 ? "0px" : "40px",
                zIndex: 3 - i,
              }}
              className="absolute bg-white rounded-2xl shadow-lg p-5 w-64"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-[9px] tracking-widest uppercase font-sans font-semibold px-2.5 py-1 rounded-full ${
                    service.badge
                      ? badgeColors[service.badge]
                      : "bg-[#f5c6d0] text-[#7a2b3d]"
                  }`}
                >
                  {service.badge ?? service.category}
                </span>
              </div>
              <p className="font-heading text-[#1c1c1c] text-lg leading-tight mb-1">
                {service.name}
              </p>
              <p className="font-sans text-[#c9647b] font-bold text-base">
                desde ${service.price.toLocaleString("es-AR")}
              </p>
            </motion.div>
          ))}
          {/* Decorative circle */}
          <div
            className="absolute -bottom-8 -left-8 w-56 h-56 rounded-full bg-[#f5c6d0]/40 -z-10"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
