import "./globals.css";

export const metadata = {
  title: "MUSLIM FLIC AI",
  description: "Agent IA — Telegram, WhatsApp, vocal, image et code"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
