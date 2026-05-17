"use client";

import { Menu, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WA_TURNO_URL } from "@/lib/constants";

const navLinks = [
  { label: "SERVICIOS", href: "#servicios" },
  { label: "NOSOTRAS", href: "#nosotras" },
  { label: "TURNOS", href: "#turnos" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span className="font-heading text-white text-sm font-bold tracking-widest uppercase">
            Beautyy Studio
          </span>
          <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase font-sans">
            San Luis · Argentina
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-[#f5c6d0] text-[11px] tracking-[0.18em] uppercase font-sans font-medium transition-colors duration-200"
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
            className="md:hidden text-white/80 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
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
              <div className="flex flex-col leading-none mb-2">
                <span className="font-heading text-white text-base font-bold tracking-widest uppercase">
                  Beautyy Studio
                </span>
                <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase font-sans mt-0.5">
                  San Luis · Argentina
                </span>
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
