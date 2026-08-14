export function generateLocalCode(prompt = "") {
  const p = prompt.toLowerCase();

  if (p.includes("connexion") || p.includes("login")) {
    return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Connexion</title>
  <style>
    body{font-family:Arial;background:#080b14;color:#fff;display:grid;place-items:center;min-height:100vh}
    form{width:min(360px,90vw);padding:28px;border:1px solid #28304a;border-radius:18px;background:#11172a}
    input,button{width:100%;padding:12px;margin-top:10px;border-radius:9px}
    input{background:#080b14;color:#fff;border:1px solid #303955}
    button{border:0;background:#705cff;color:#fff}
  </style>
</head>
<body>
  <form>
    <h1>Connexion</h1>
    <input type="email" placeholder="Email">
    <input type="password" placeholder="Mot de passe">
    <button>Se connecter</button>
  </form>
</body>
</html>`;
  }

  return `// MUSLIM FLIC AI — génération locale
// Prompt: ${prompt}

export function main() {
  return "Ton endpoint personnalisé est prêt.";
}`;
}
