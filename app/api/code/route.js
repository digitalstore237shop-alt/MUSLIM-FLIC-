import { generateLocalCode } from "../../../lib/code";

export async function POST(request) {
  try {
    const body = await request.json();

    return Response.json({
      ok: true,
      language: "html",
      code: generateLocalCode(body.prompt || "")
    });
  } catch {
    return Response.json({ error: "requête invalide" }, { status: 400 });
  }
}
