export async function GET() {
  return Response.json({
    ok: true,
    channel: "whatsapp",
    message: "Endpoint WhatsApp personnalisé actif."
  });
}

export async function POST(request) {
  const payload = await request.json().catch(() => null);

  return Response.json({
    ok: true,
    channel: "whatsapp",
    received: Boolean(payload),
    message: "Webhook WhatsApp personnalisé reçu."
  });
}
