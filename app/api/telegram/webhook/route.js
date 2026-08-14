export async function POST(request) {
  const update = await request.json().catch(() => null);

  return Response.json({
    ok: true,
    channel: "telegram",
    received: Boolean(update),
    message: "Webhook Telegram personnalisé reçu."
  });
}
