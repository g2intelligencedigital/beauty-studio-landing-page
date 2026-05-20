import { NextRequest, NextResponse } from "next/server";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/beautyystudio/turno";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const IS_LOCALHOST = BASE_URL.startsWith("http://localhost");

export async function POST(req: NextRequest) {
  try {
    console.log("step:1 env check");
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: "MP_ACCESS_TOKEN no configurado" }, { status: 500 });
    }

    console.log("step:2 parse body");
    const body = await req.json();
    console.log("step:3 body ok", typeof body);
    const { items, clientName = "", services = "" } = body;
    console.log("step:4 items:", Array.isArray(items), "client:", typeof clientName);

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No hay servicios en el carrito" }, { status: 400 });
    }

    console.log("step:5 build preference");
    const preference = {
      items: items.map((item: { id: string; title: string; quantity: number; unit_price: number }) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "ARS",
      })),
      back_urls: {
        success: `${BASE_URL}/reserva-confirmada?source=mp&name=${encodeURIComponent(String(clientName))}&services=${encodeURIComponent(String(services))}`,
        failure: `${BASE_URL}/?pago=fallido`,
        pending: `${BASE_URL}/reserva-confirmada?source=mp&status=pending&name=${encodeURIComponent(String(clientName))}&services=${encodeURIComponent(String(services))}`,
      },
      ...(IS_LOCALHOST ? {} : { auto_return: "approved" }),
      statement_descriptor: "BEAUTYY STUDIO",
      metadata: { calendly_url: CALENDLY_URL },
    };

    console.log("MP pref:", JSON.stringify(preference));
    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    });

    console.log("MP status:", mpRes.status);
    // Read body as text first — avoids Node 18 undici "body already used" TypeError
    const rawBody = await mpRes.text();
    console.log("MP raw:", rawBody.slice(0, 300));

    if (!mpRes.ok) {
      console.error("MP error:", rawBody);
      let msg = "Error en Mercado Pago";
      try {
        const errData = JSON.parse(rawBody);
        if (errData.message) msg = errData.message;
      } catch { /* rawBody was not JSON */ }
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const data = JSON.parse(rawBody);
    return NextResponse.json({ init_point: data.init_point });

  } catch (e) {
    console.error("Route error:", e);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
