const rules = [
  {
    test: /bonjour|salut|hello|bonsoir/i,
    answer: "Bonjour 👋 Je suis MUSLIM FLIC AI. Que veux-tu créer aujourd'hui ?"
  },
  {
    test: /qui es[- ]tu|présente/i,
    answer: "Je suis MUSLIM FLIC AI, ton agent local pour les conversations, la voix, les images et le code."
  },
  {
    test: /telegram/i,
    answer: "Le canal Telegram possède son propre endpoint : POST /api/telegram/webhook."
  },
  {
    test: /whatsapp/i,
    answer: "Le canal WhatsApp possède son propre endpoint : POST /api/whatsapp/webhook."
  },
  {
    test: /code|javascript|html|css|next\.?js/i,
    answer: "Je peux préparer un squelette de code. Utilise le Studio créatif → Code pour générer un snippet."
  }
];

export function localAgent(message) {
  const clean = String(message || "").trim();
  const hit = rules.find(rule => rule.test.test(clean));

  if (hit) return hit.answer;

  return `J'ai reçu : « ${clean} ».\n\nJe fonctionne actuellement avec le moteur local MUSLIM FLIC AI. Les routes /api/* sont personnalisées afin que tu puisses remplacer le moteur local par ton propre modèle plus tard.`;
    }
