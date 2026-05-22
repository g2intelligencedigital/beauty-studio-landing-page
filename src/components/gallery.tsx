"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

const photos = [
  {
    src: "/images/gallery/1.jpeg",
    alt: "Lifting de pestañas — Beautyy Studio",
    position: "center 30%",
  },
  {
    src: "/images/gallery/2.jpeg",
    alt: "Semipermanente azul — Beautyy Studio",
    position: "center 40%",
  },
  {
    src: "/images/gallery/3.jpeg",
    alt: "Tratamiento facial con cejas perfiladas — Beautyy Studio",
    position: "center 25%",
  },
  {
    src: "/images/gallery/4.jpeg",
    alt: "Manicura marmolada nude — Beautyy Studio",
    position: "center 35%",
  },
  {
    src: "/images/gallery/5.jpeg",
    alt: "Francesa azul con nail art — Beautyy Studio",
    position: "center 20%",
  },
  {
    src: "/images/gallery/6.jpeg",
    alt: "Semipermanente rojo — Beautyy Studio",
    position: "center 30%",
  },
];

export function Gallery() {
  return (
    <section id="galeria" className="bg-[#fde8ec] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#c9647b] font-semibold mb-3">
            Nuestro trabajo
          </p>
          <h2 className="font-heading text-[#1c1c1c] text-4xl md:text-5xl">
            Galería
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="relative aspect-[4/5] rounded-xl overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: photo.position }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
