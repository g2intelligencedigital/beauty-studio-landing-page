"use client";

import { motion } from "framer-motion";
import { Sparkles, Wind, Hand, Footprints } from "lucide-react";
import { CATEGORY_SUBCATEGORIES } from "@/data/services";

const categories = [
  { key: "rostro" as const, label: "Rostro", Icon: Sparkles },
  { key: "cuerpo" as const, label: "Cuerpo", Icon: Wind },
  { key: "manos" as const, label: "Manos", Icon: Hand },
  { key: "pies" as const, label: "Pies", Icon: Footprints },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function CategoriesStrip() {
  return (
    <section className="bg-[#faf0f3] py-14 border-t border-[#f0c8d0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {categories.map(({ key, label, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="flex flex-col items-center text-center md:border-r md:border-[#f0c8d0] last:border-none px-4"
            >
              <Icon size={22} className="text-[#c9647b] mb-3" strokeWidth={1.5} />
              <h3 className="font-heading text-[#1c1c1c] text-xl mb-2">{label}</h3>
              <ul className="flex flex-col gap-0.5">
                {CATEGORY_SUBCATEGORIES[key].map((sub) => (
                  <li
                    key={sub}
                    className="font-sans text-[#7a6468] text-xs tracking-wide uppercase"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
