export async function POST(request) {
  return Response.json({
    ok: true,
    engine: "browser",
    message: "La voix est exécutée côté navigateur avec SpeechSynthesis/SpeechRecognition."
  });
}
