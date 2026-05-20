export type ServiceCategory = "rostro" | "cuerpo" | "manos";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel?: string;
  category: ServiceCategory;
  image?: string;
  imageClass?: string;
  video?: string;
  badge?: "MÁS PEDIDO" | "PROMO DEL MES";
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  rostro: "Rostro",
  cuerpo: "Cuerpo",
  manos: "Manos",
};

export const CATEGORY_SUBCATEGORIES: Record<ServiceCategory, string[]> = {
  rostro: ["Cejas", "Pestañas"],
  cuerpo: ["Depilación"],
  manos: ["Manicura"],
};

export const services: Service[] = [
  {
    id: "lifting-pestanas",
    name: "Lifting de Pestañas",
    description:
      "Riza y define tus pestañas naturales sin extensiones. Resultado natural, dura hasta 8 semanas.",
    price: 14000,
    category: "rostro",
    image: "/images/services/lifting.jpeg",
    badge: "MÁS PEDIDO",
  },
  {
    id: "laminado-cejas",
    name: "Laminado de Cejas",
    description:
      "Peinado y fijación de cejas para un look más definido y natural. Duración de hasta 6 semanas.",
    price: 14000,
    category: "rostro",
    image: "/images/services/laminado-cejas.jpeg",
  },
  {
    id: "extensiones-clasicas",
    name: "Extensiones Clásicas",
    description:
      "Pestaña por pestaña para una mirada más abierta y natural. Resultado duradero y elegante.",
    price: 14000,
    category: "rostro",
    image: "/images/services/extensiones-pestanas.jpeg",
    imageClass: "-rotate-90 scale-150 -translate-y-12",
  },
  {
    id: "volumen-2d",
    name: "Volumen 2D",
    description:
      "Técnica que aporta el doble de densidad a tus pestañas. Mirada más intensa y llamativa.",
    price: 16000,
    category: "rostro",
    image: "/images/services/volumen-2d.jpeg",
  },
  {
    id: "volumen-3d",
    name: "Volumen 3D",
    description:
      "Máximo volumen y drama para una mirada impactante. Ideal para ocasiones especiales.",
    price: 17000,
    category: "rostro",
    image: "/images/services/volumen-3d.jpeg",
  },
  {
    id: "esmaltado-semipermanente",
    name: "Esmaltado Semipermanente",
    description:
      "Esmaltado de larga duración que no astilla ni se despega. Manos perfectas por semanas.",
    price: 13000,
    category: "manos",
    image: "/images/services/esmaltado-semipermanente.jpeg",
  },
  {
    id: "capping",
    name: "Capping",
    description:
      "Refuerzo de gel sobre tu uña natural. Mayor resistencia y brillo impecable.",
    price: 14000,
    category: "manos",
    image: "/images/services/capping.jpeg",
  },
  {
    id: "soft-gel",
    name: "Soft Gel",
    description:
      "Extensión de uñas con gel suave, liviano y con terminación natural.",
    price: 16000,
    category: "manos",
    image: "/images/services/softgel.jpeg",
  },
  {
    id: "depilacion-definitiva",
    name: "Depilación Definitiva",
    description:
      "Tecnología Soprano Ice. Eliminación definitiva del vello de forma indolora y segura.",
    price: 16000,
    category: "cuerpo",
    video: "/images/services/depilacion-definitiva.mp4",
  },
  {
    id: "electrodos",
    name: "Electrodos",
    description:
      "Tratamiento corporal con electrodos para tonificar y reafirmar la musculatura.",
    price: 15000,
    category: "cuerpo",
    video: "/images/services/electrodos.mp4",
  },
];
