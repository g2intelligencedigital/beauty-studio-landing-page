"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Service } from "@/data/services";

export const SENA_POR_SERVICIO = 5000;

export interface CartItem {
  service: Service;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addItem: (service: Service) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalSena: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((service: Service) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.service.id === service.id);
      if (existing) {
        return prev.map((i) =>
          i.service.id === service.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { service, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.service.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalSena = totalItems * SENA_POR_SERVICIO;

  return (
    <CartContext.Provider
      value={{ items, isOpen, addItem, removeItem, clearCart, openCart, closeCart, totalItems, totalSena }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
