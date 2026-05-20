"use client";

import Image from "next/image";
import { Menu, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WA_TURNO_URL } from "@/lib/constants";

const navLinks = [
  { label: "SERVICIOS", href: "#servicios" },
  { label: "NOSOTRAS", href: "#nosotras" },
  { label: "GALERÍA", href: "#galeria" },
  { label: "TURNOS", href: "#turnos" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/Logo-removebg-preview.png"
            alt="Beautyy Studio"
            width={240}
            height={72}
            className="h-16 w-auto"
          />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-[#c9647b] text-[11px] tracking-[0.18em] uppercase font-sans font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WA_TURNO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-[#c9647b] hover:bg-[#a84f64] text-white text-[11px] tracking-widest uppercase px-5 py-2.5 rounded-full font-sans font-semibold transition-colors duration-200"
        >
          <MessageCircle size={14} />
          Pedí tu turno
        </a>

        {/* Mobile sheet */}
        <Sheet>
          <SheetTrigger
            className="md:hidden text-gray-700 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#1c1c1c] border-white/10 w-72 pt-12"
            showCloseButton={true}
          >
            <div className="flex flex-col gap-8 px-4">
              <div className="flex items-center mb-2">
                <Image
                  src="/images/Logo-removebg-preview.png"
                  alt="Beautyy Studio"
                  width={240}
                  height={72}
                  className="h-20 w-auto"
                />
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white/70 hover:text-[#f5c6d0] text-sm tracking-[0.15em] uppercase font-sans font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a
                href={WA_TURNO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#c9647b] hover:bg-[#a84f64] text-white text-sm px-5 py-3 rounded-full font-sans font-semibold transition-colors"
              >
                <MessageCircle size={16} />
                Pedí tu turno
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
