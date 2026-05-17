export type ServiceCategory = "rostro" | "cuerpo" | "manos" | "pies";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ServiceCategory;
  badge?: "MÁS PEDIDO" | "PROMO DEL MES";
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  rostro: "Rostro",
  cuerpo: "Cuerpo",
  manos: "Manos",
  pies: "Pies",
};

export const CATEGORY_SUBCATEGORIES: Record<ServiceCategory, string[]> = {
  rostro: ["Faciales", "Cejas", "Pestañas"],
  cuerpo: ["Depilación", "Masajes"],
  manos: ["Manicura", "Nail Art"],
  pies: ["Pedicura", "Esmaltado"],
};

export const services: Service[] = [
  {
    id: "lifting-pestanas",
    name: "Lifting de Pestañas",
    description:
      "Riza y define tus pestañas naturales sin extensiones. Resultado natural, dura hasta 8 semanas.",
    price: 6000,
    category: "rostro",
    badge: "MÁS PEDIDO",
  },
  {
    id: "hidratacion-profunda",
    name: "Hidratación Profunda Facial",
    description:
      "Tratamiento facial intensivo que devuelve luminosidad y suavidad. Piel radiante desde la primera sesión.",
    price: 8500,
    category: "rostro",
  },
  {
    id: "manicura-pedicura-combo",
    name: "Manicura + Pedicura Combo",
    description:
      "Las dos juntas con esmaltado incluido. El combo más pedido, ideal para salir con todo.",
    price: 10000,
    category: "manos",
    badge: "PROMO DEL MES",
  },
  {
    id: "depilacion-cera",
    name: "Depilación con Cera",
    description:
      "Piernas, axilas, bikini. Resultado suave y duradero con cera de alta calidad.",
    price: 4500,
    category: "cuerpo",
  },
  {
    id: "manicura-semipermanente",
    name: "Manicura Semipermanente",
    description:
      "Esmaltado de larga duración que no astilla ni se despega. Manos perfectas por semanas.",
    price: 5000,
    category: "manos",
  },
  {
    id: "limpieza-facial",
    name: "Limpieza Facial Profunda",
    description:
      "Extracción, vapor y mascarilla. Piel limpia y sin impurezas, lista para brillar.",
    price: 7000,
    category: "rostro",
  },
];
