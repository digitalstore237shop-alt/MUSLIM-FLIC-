import { createSvgImage } from "../../../lib/image";

export async function POST(request) {
  try {
    const body = await request.json();

    return Response.json({
      ok: true,
      type: "image/svg+xml",
      image: createSvgImage(body.prompt || "MUSLIM FLIC AI")
    });
  } catch {
    return Response.json({ error: "requête invalide" }, { status: 400 });
  }
      }
