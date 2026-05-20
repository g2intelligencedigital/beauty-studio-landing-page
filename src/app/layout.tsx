import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: ["400"],
  style: ["italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Beautyy Studio | Centro de Estética · San Luis, Argentina",
  description:
    "Lifting de pestañas, hidratación facial, manicura y más. Tu centro de estética en San Luis. Pedí tu turno por WhatsApp.",
  openGraph: {
    title: "Beautyy Studio",
    description:
      "Centro de estética en San Luis, Argentina. Lifting de pestañas, faciales, manicura y más.",
    type: "website",
    locale: "es_AR",
    url: "https://beautyystudio.com.ar",
    images: [
      {
        url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Beautyy Studio — Centro de Estética en San Luis",
      },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Beautyy Studio",
  description:
    "Centro de estética en San Luis, Argentina. Lifting de pestañas, faciales, manicura, pedicura y más.",
  url: "https://beautyystudio.com.ar",
  telephone: "+5492664210809",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Luis",
    addressCountry: "AR",
  },
  sameAs: ["https://www.instagram.com/beautyy._studioo/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
