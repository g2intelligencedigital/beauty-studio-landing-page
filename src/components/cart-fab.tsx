"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { motion, AnimatePresence } from "framer-motion";

export function CartFab() {
  const { totalItems, openCart } = useCart();

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        onClick={openCart}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#c9647b] hover:bg-[#a84f64] text-white font-sans font-semibold text-sm px-5 py-3 rounded-full shadow-lg transition-colors"
        aria-label="Ver carrito"
      >
        <ShoppingBag size={17} />
        <span>Ver reserva</span>
        <span className="bg-white text-[#c9647b] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      </motion.button>
    </AnimatePresence>
  );
}
