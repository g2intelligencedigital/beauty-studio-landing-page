"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { services, CATEGORY_LABELS, type ServiceCategory, type Service } from "@/data/services";
import { useCart } from "@/lib/cart-context";

const ALL = "todos" as const;
type FilterType = typeof ALL | ServiceCategory;

const filters: { key: FilterType; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "rostro", label: "Rostro" },
  { key: "manos", label: "Manos" },
  { key: "cuerpo", label: "Cuerpo" },
];

const badgeStyle: Record<string, string> = {
  "MÁS PEDIDO": "bg-[#c9647b] text-white",
  "PROMO DEL MES": "bg-[#1c1c1c] text-white",
};

const ease = [0.22, 1, 0.36, 1] as const;

function AddToCartButton({ service }: { service: Service }) {
  const { addItem, items } = useCart();
  const inCart = items.some((i) => i.service.id === service.id);

  return (
    <button
      onClick={() => addItem(service)}
      className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all duration-200 ${
        inCart
          ? "bg-[#f5c6d0] text-[#c9647b]"
          : "bg-[#c9647b] hover:bg-[#a84f64] text-white"
      }`}
    >
      {inCart ? (
        <>
          <Check size={13} />
          Agregado
        </>
      ) : (
        <>
          <Plus size={13} />
          Reservar turno
        </>
      )}
    </button>
  );
}

export function Services() {
  const [active, setActive] = useState<FilterType>(ALL);

  const filtered =
    active === ALL ? services : services.filter((s) => s.category === active);

  return (
    <section id="servicios" className="bg-[#fde8ec] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#c9647b] font-semibold mb-3">
            Lo que hacemos
          </p>
          <h2 className="font-display text-[#1c1c1c] text-4xl md:text-5xl">
            Nuestros Servicios
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase font-sans font-semibold transition-all duration-200 border ${
                active === key
                  ? "bg-[#c9647b] text-white border-[#c9647b]"
                  : "bg-transparent text-[#7a6468] border-[#f0c8d0] hover:border-[#c9647b] hover:text-[#c9647b]"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
              >
                {service.image && (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className={`w-full h-full object-cover object-center ${service.imageClass ?? ""}`}
                      style={{ imageOrientation: "from-image" }}
                      loading="lazy"
                    />
                  </div>
                )}
                {service.video && (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#1c1c1c]">
                    <video
                      src={service.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-widest uppercase font-sans font-semibold px-3 py-1.5 rounded-full bg-[#f5c6d0] text-[#7a2b3d]">
                    {CATEGORY_LABELS[service.category]}
                  </span>
                  {service.badge && (
                    <span
                      className={`text-[9px] tracking-widest uppercase font-sans font-semibold px-3 py-1.5 rounded-full ${badgeStyle[service.badge]}`}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-[#1c1c1c] text-xl mb-2 leading-tight">
                    {service.name}
                  </h3>
                  <p className="font-sans text-[#7a6468] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#f0c8d0] flex items-center justify-between">
                  <div>
                    <span className="font-sans text-[#7a6468] text-xs tracking-widest uppercase">
                      desde{" "}
                    </span>
                    <span className="font-sans text-[#c9647b] font-bold text-xl">
                      ${service.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
                <AddToCartButton service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
