"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

const photos = [
  {
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=700&fit=crop&q=80",
    alt: "Tratamiento de lifting de pestañas",
  },
  {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=700&fit=crop&q=80",
    alt: "Hidratación facial profunda",
  },
  {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=700&fit=crop&q=80",
    alt: "Manicura y nail art",
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=700&fit=crop&q=80",
    alt: "Ambiente del centro de estética",
  },
  {
    src: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&h=700&fit=crop&q=80",
    alt: "Pedicura y esmaltado",
  },
  {
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=700&fit=crop&q=80",
    alt: "Tratamiento de cejas y pestañas",
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
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
