"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { IG_URL } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const highlights = [
  "Más de 5 años transformando la belleza en San Luis",
  "Productos premium seleccionados para cada tratamiento",
  "Atención personalizada, sin apuros y con cariño",
  "Higiene y cuidado en cada detalle del espacio",
];

export function Nosotras() {
  return (
    <section id="nosotras" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&h=875&fit=crop&q=80"
              alt="Interior de Beautyy Studio, centro de estética en San Luis"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Decorative circle */}
          <div
            className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-[#f5c6d0]/50 -z-10"
            aria-hidden
          />
          <div
            className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-[#fde8ec] -z-10"
            aria-hidden
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#c9647b] font-semibold">
            El Estudio
          </p>
          <h2 className="font-heading text-[#1c1c1c] text-4xl md:text-5xl leading-tight">
            Belleza que nace
            <br />
            del cuidado real.
          </h2>
          <p className="font-sans text-[#7a6468] text-base leading-relaxed">
            Beautyy Studio nació con una idea simple: que cada clienta salga
            sintiéndose mejor de como entró. No solo con unas uñas lindas o
            unas pestañas perfectas, sino con esa sensación de haberse dado
            un momento para ella.
          </p>
          <p className="font-sans text-[#7a6468] text-base leading-relaxed">
            Somos un equipo apasionado por la estética y comprometido con los
            resultados. Cada tratamiento lo hacemos con tiempo, con cuidado y
            con los mejores productos del mercado.
          </p>

          <ul className="flex flex-col gap-3 mt-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="text-[#c9647b] mt-0.5 shrink-0"
                  strokeWidth={1.8}
                />
                <span className="font-sans text-[#1c1c1c] text-sm">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c9647b] font-sans text-sm font-semibold hover:text-[#a84f64] transition-colors mt-2 w-fit"
          >
            <InstagramIcon size={16} />
            @beautyy._studioo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
