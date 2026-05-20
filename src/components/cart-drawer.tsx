"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useCart, SENA_POR_SERVICIO } from "@/lib/cart-context";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, clearCart, totalItems, totalSena } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");

  async function handlePagar() {
    if (items.length === 0 || !clientName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          services: items.map((i) => i.service.name).join(", "),
          items: items.map((i) => ({
            id: i.service.id,
            title: `Seña — ${i.service.name}`,
            quantity: i.quantity,
            unit_price: SENA_POR_SERVICIO,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error al crear preferencia de pago");
        return;
      }
      window.location.href = data.init_point;
    } catch (e) {
      setError("No se pudo conectar con Mercado Pago. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-50"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0c8d0]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#c9647b]" />
                <h2 className="font-heading text-[#1c1c1c] text-xl">Tu reserva</h2>
              </div>
              <button
                onClick={closeCart}
                className="text-[#7a6468] hover:text-[#1c1c1c] transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <ShoppingBag size={40} className="text-[#f0c8d0]" />
                  <p className="font-sans text-[#7a6468] text-sm">
                    No agregaste ningún servicio todavía.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li
                      key={item.service.id}
                      className="flex items-start justify-between gap-3 bg-[#faf0f3] rounded-xl p-4"
                    >
                      <div className="flex-1">
                        <p className="font-sans font-semibold text-[#1c1c1c] text-sm leading-tight">
                          {item.service.name}
                        </p>
                        <p className="font-sans text-[#7a6468] text-xs mt-0.5">
                          {item.quantity > 1 ? `${item.quantity}×` : ""} Seña:{" "}
                          <span className="text-[#c9647b] font-semibold">
                            ${(SENA_POR_SERVICIO * item.quantity).toLocaleString("es-AR")}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.service.id)}
                        className="text-[#f0c8d0] hover:text-[#c9647b] transition-colors mt-0.5"
                        aria-label={`Quitar ${item.service.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#f0c8d0] flex flex-col gap-4">
                {/* Seña info */}
                <div className="bg-[#fde8ec] rounded-xl p-4 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-[#7a6468] text-xs uppercase tracking-widest">
                      Seña ({totalItems} {totalItems === 1 ? "servicio" : "servicios"})
                    </span>
                    <span className="font-sans font-bold text-[#c9647b] text-lg">
                      ${totalSena.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <p className="font-sans text-[#7a6468] text-xs leading-relaxed">
                    El resto se abona en el local el día del turno.
                  </p>
                </div>

                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="client-name" className="font-sans text-[#7a6468] text-xs font-medium">
                    Tu nombre
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej: María González"
                    className="w-full border border-[#f0c8d0] rounded-xl px-4 py-2.5 font-sans text-sm text-[#1c1c1c] placeholder-[#c9aab0] focus:outline-none focus:border-[#c9647b] focus:ring-1 focus:ring-[#c9647b] transition-colors"
                  />
                </div>

                {error && (
                  <p className="font-sans text-red-500 text-xs text-center">{error}</p>
                )}

                {/* CTA */}
                <button
                  onClick={handlePagar}
                  disabled={loading || !clientName.trim()}
                  className="flex items-center justify-center gap-2 bg-[#009ee3] hover:bg-[#0084bf] disabled:opacity-50 disabled:cursor-not-allowed text-white font-sans font-semibold text-sm py-3.5 rounded-full transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Conectando con Mercado Pago...
                    </>
                  ) : (
                    <>Pagar seña con Mercado Pago</>
                  )}
                </button>

                <button
                  onClick={clearCart}
                  className="font-sans text-[#7a6468] text-xs text-center hover:text-[#c9647b] transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
