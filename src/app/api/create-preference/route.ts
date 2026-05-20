const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/beautyystudio/turno";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const IS_LOCALHOST = BASE_URL.startsWith("http://localhost");

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  try {
    console.error("step:1");
    const accessToken = process.env.MP_ACCESS_TOKEN;
    console.error("step:2 token len:", accessToken ? accessToken.length : "MISSING");

    if (!accessToken) {
      return json({ error: "MP_ACCESS_TOKEN no configurado" }, 500);
    }

    console.error("step:3 parse body");
    const body = await request.json() as {
      items?: { id: string; title: string; quantity: number; unit_price: number }[];
      clientName?: string;
      services?: string;
    };

    console.error("step:4 items:", Array.isArray(body.items));
    const items = body.items ?? [];
    const clientName = String(body.clientName ?? "");
    const services = String(body.services ?? "");

    if (items.length === 0) {
      return json({ error: "No hay servicios en el carrito" }, 400);
    }

    console.error("step:5 build pref");
    const preference = {
      items: items.map((item) => ({
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
      ...(IS_LOCALHOST ? {} : { auto_return: "approved" }),
      statement_descriptor: "BEAUTYY STUDIO",
      metadata: { calendly_url: CALENDLY_URL },
    };

    console.error("step:6 call MP");
    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    });

    console.error("step:7 MP status:", mpRes.status);
    const rawBody = await mpRes.text();
    console.error("step:8 raw:", rawBody.slice(0, 200));

    if (!mpRes.ok) {
      let msg = "Error en Mercado Pago";
      try {
        const errData = JSON.parse(rawBody) as { message?: string };
        if (errData.message) msg = errData.message;
      } catch { /* not JSON */ }
      return json({ error: msg }, 500);
    }

    const data = JSON.parse(rawBody) as { init_point: string };
    return json({ init_point: data.init_point });

  } catch (e) {
    console.error("CATCH:", e);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
