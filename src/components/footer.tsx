import { MessageCircle, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { WA_CONSULTA_URL, IG_URL } from "@/lib/constants";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotras", href: "#nosotras" },
  { label: "Galería", href: "#galeria" },
  { label: "Turnos", href: "#turnos" },
];

export function Footer() {
  return (
    <footer className="bg-[#1c1c1c] text-white/70">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-heading text-white text-2xl tracking-wide">
                Beautyy Studio
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-sans mt-0.5">
                San Luis · Argentina
              </p>
            </div>
            <p className="font-sans text-sm leading-relaxed max-w-xs">
              Centro de estética en San Luis. Tratamientos para realzar tu
              belleza natural con productos premium.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold">
              Navegación
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40 font-semibold">
              Contacto
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-sans text-sm text-white/60 hover:text-white transition-colors"
              >
                <InstagramIcon size={15} />
                @beautyy._studioo
              </a>
              <a
                href={WA_CONSULTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-sans text-sm text-white/60 hover:text-white transition-colors"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
              <span className="inline-flex items-center gap-2.5 font-sans text-sm text-white/60">
                <MapPin size={15} />
                San Luis, Argentina
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Beautyy Studio. Todos los derechos reservados.</p>
          <p>Powered by G2 Intelligence</p>
        </div>
      </div>
    </footer>
  );
}
