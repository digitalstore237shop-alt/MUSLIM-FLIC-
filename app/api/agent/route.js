import { localAgent } from "../../../lib/agent";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.message) {
      return Response.json({ error: "message requis" }, { status: 400 });
    }

    return Response.json({
      ok: true,
      answer: localAgent(body.message)
    });
  } catch {
    return Response.json({ error: "requête invalide" }, { status: 400 });
  }
}
