"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const reviews = [
  {
    name: "Valentina R.",
    initials: "VR",
    text: "El lifting de pestañas me duró más de 8 semanas. La atención fue increíble, muy prolija y detallista. Volvería mil veces.",
    rating: 5,
  },
  {
    name: "Camila F.",
    initials: "CF",
    text: "Fui por el combo manicura + pedicura y salí más que satisfecha. El local es muy limpio, cuidado, y las chicas son un amor.",
    rating: 5,
  },
  {
    name: "Luciana M.",
    initials: "LM",
    text: "La hidratación facial me dejó la piel increíble. Totalmente recomendable para relajarse y quedar radiante. Ya sacaré otro turno.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export function Testimonios() {
  return (
    <section id="opiniones" className="bg-[#faf0f3] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#c9647b] font-semibold mb-3">
            Clientas felices
          </p>
          <h2 className="font-heading text-[#1c1c1c] text-4xl md:text-5xl">
            Lo que dicen nuestras clientas
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-sm flex flex-col gap-4"
            >
              <Stars count={review.rating} />
              <p className="font-sans text-[#1c1c1c] text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#f0c8d0]">
                <div className="w-9 h-9 rounded-full bg-[#f5c6d0] flex items-center justify-center">
                  <span className="font-sans text-[#c9647b] text-xs font-bold">
                    {review.initials}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-[#1c1c1c] text-sm font-semibold">
                    {review.name}
                  </p>
                  <p className="font-sans text-[#7a6468] text-xs">Google Reviews</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
