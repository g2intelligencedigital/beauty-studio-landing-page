"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CategoriesStrip } from "@/components/categories-strip";
import { Services } from "@/components/services";
import { Nosotras } from "@/components/nosotras";
import { Gallery } from "@/components/gallery";
import { Testimonios } from "@/components/testimonios";
import { Contacto } from "@/components/contacto";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { CartFab } from "@/components/cart-fab";
import { CartProvider } from "@/lib/cart-context";

export default function Home() {
  return (
    <CartProvider>
      <main>
        <Navbar />
        <Hero />
        <CategoriesStrip />
        <Services />
        <Nosotras />
        <Gallery />
        <Testimonios />
        <Contacto />
        <Footer />
      </main>
      <CartDrawer />
      <CartFab />
    </CartProvider>
  );
}
