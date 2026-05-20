import { NextRequest, NextResponse } from "next/server";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/beautyystudio/turno";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const IS_LOCALHOST = BASE_URL.startsWith("http://localhost");

export async function POST(req: NextRequest) {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ error: "MP_ACCESS_TOKEN no configurado" }, { status: 500 });
  }

  const body = await req.json();
  const { items, clientName = "", services = "" } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No hay servicios en el carrito" }, { status: 400 });
  }

  const preference = {
    items: items.map((item: { id: string; title: string; quantity: number; unit_price: number }) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      currency_id: "ARS",
    })),
    back_urls: {
      success: `${BASE_URL}/reserva-confirmada?source=mp&name=${encodeURIComponent(clientName)}&services=${encodeURIComponent(services)}`,
      failure: `${BASE_URL}/?pago=fallido`,
      pending: `${BASE_URL}/reserva-confirmada?source=mp&status=pending&name=${encodeURIComponent(clientName)}&services=${encodeURIComponent(services)}`,
    },
    // auto_return requires a public HTTPS URL — omit on localhost
    ...(IS_LOCALHOST ? {} : { auto_return: "approved" }),
    statement_descriptor: "BEAUTYY STUDIO",
    metadata: {
      calendly_url: CALENDLY_URL,
    },
  };

  const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(preference),
  });

  if (!mpRes.ok) {
    const err = await mpRes.json().catch(() => mpRes.text());
    console.error("MP error:", JSON.stringify(err));
    const msg = typeof err === "object" && err !== null && "message" in err
      ? (err as { message: string }).message
      : "Error en Mercado Pago";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const data = await mpRes.json();
  return NextResponse.json({ init_point: data.init_point });
}
