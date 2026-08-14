# MUSLIM FLIC AI — Agent Hub V2

Version personnalisée et autonome.

## Principe

Cette version ne contient :
- aucun `.env.example`
- aucune clé API à demander
- aucun secret
- aucune dépendance à un fournisseur IA externe pour fonctionner en démo

Les API internes sont dans `app/api`.

## Endpoints

- `POST /api/agent` — conversation
- `POST /api/image` — génération d'un visuel SVG
- `POST /api/code` — génération locale de snippets
- `POST /api/voice` — statut du moteur vocal navigateur
- `POST /api/telegram/webhook` — webhook Telegram
- `GET /api/whatsapp/webhook` — endpoint WhatsApp
- `POST /api/whatsapp/webhook` — webhook WhatsApp

## Lancer

```bash
npm install
npm run dev
```

Puis ouvrir :

http://localhost:3000

## Architecture

Le projet est volontairement construit avec des routes API propriétaires. Tu peux ensuite remplacer les moteurs locaux dans :

- `lib/agent.js`
- `lib/image.js`
- `lib/code.js`

sans changer l'interface.

## Important

Les endpoints Telegram et WhatsApp sont des points d'entrée personnalisés. Ils ne peuvent pas envoyer de vrais messages à Telegram/WhatsApp sans authentification auprès de leurs plateformes respectives. Cette version ne te demande aucune clé et ne prétend pas avoir une connexion externe déjà activée.
