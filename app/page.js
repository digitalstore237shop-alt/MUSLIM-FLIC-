 "use client";

import { useEffect, useMemo, useState } from "react";

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Bonjour 👋 Je suis MUSLIM FLIC AI. Je peux discuter, générer du code, créer des visuels et répondre à la voix."
  }
];

export default function Home() {
  const [tab, setTab] = useState("dashboard");
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [image, setImage] = useState(null);
  const [code, setCode] = useState("");
  const [notice, setNotice] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mfa-messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("mfa-messages", JSON.stringify(messages));
  }, [messages]);

  const stats = useMemo(() => ({
    messages: messages.filter(m => m.role === "user").length,
    sessions: 1,
    channels: 2
  }), [messages]);

  async function sendMessage() {
    if (!input.trim() || busy) return;
    const text = input.trim();
    setInput("");
    setMessages(m => [...m, { id: Date.now(), role: "user", text }]);
    setBusy(true);
    try {
      const r = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await r.json();
      setMessages(m => [...m, {
        id: Date.now() + 1,
        role: "assistant",
        text: data.answer || "Je n'ai pas de réponse."
      }]);
    } catch {
      setMessages(m => [...m, {
        id: Date.now() + 1,
        role: "assistant",
        text: "Le service local est indisponible."
      }]);
    } finally {
      setBusy(false);
    }
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      setNotice("La synthèse vocale n'est pas disponible sur ce navigateur.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = 1;
    window.speechSynthesis.speak(u);
  }

  function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setNotice("La reconnaissance vocale n'est pas disponible ici.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    setListening(true);
    recognition.onresult = e => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  }

  async function generateImage() {
    setBusy(true);
    setNotice("");
    try {
      const r = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input || "Logo futuriste MUSLIM FLIC AI, agent IA, bleu nuit et violet" })
      });
      const data = await r.json();
      setImage(data.image);
      setTab("studio");
    } finally {
      setBusy(false);
    }
  }

  async function generateCode() {
    setBusy(true);
    try {
      const r = await fetch("/api/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input || "Créer une page de connexion moderne" })
      });
      const data = await r.json();
      setCode(data.code || "");
      setTab("studio");
    } finally {
      setBusy(false);
    }
  }

  function clearChat() {
    setMessages(initialMessages);
    localStorage.removeItem("mfa-messages");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logoMark">M</div>
          <div>
            <strong>MUSLIM FLIC</strong>
            <span>AI AGENT HUB</span>
          </div>
        </div>

        <nav>
          <button className={tab === "dashboard" ? "nav active" : "nav"} onClick={() => setTab("dashboard")}>⌂ <span>Dashboard</span></button>
          <button className={tab === "chat" ? "nav active" : "nav"} onClick={() => setTab("chat")}>◈ <span>Agent IA</span></button>
          <button className={tab === "studio" ? "nav active" : "nav"} onClick={() => setTab("studio")}>✦ <span>Studio créatif</span></button>
          <button className={tab === "channels" ? "nav active" : "nav"} onClick={() => setTab("channels")}>◉ <span>Canaux</span></button>
          <button className={tab === "settings" ? "nav active" : "nav"} onClick={() => setTab("settings")}>⚙ <span>Paramètres</span></button>
        </nav>

        <div className="sidebarBottom">
          <div className="status"><i /> Système local actif</div>
          <small>V2 • API personnalisées</small>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <div className="eyebrow">AI AGENT HUB / V2</div>
            <h1>{tab === "dashboard" ? "Centre de contrôle" : tab === "chat" ? "Agent IA" : tab === "studio" ? "Studio créatif" : tab === "channels" ? "Canaux" : "Paramètres"}</h1>
          </div>
          <div className="topActions">
            <span className="pill">● API locale</span>
            <button className="avatar">MF</button>
          </div>
        </header>

        {notice && <div className="notice">{notice}</div>}

        {tab === "dashboard" && (
          <>
            <section className="hero">
              <div>
                <span className="heroTag">NOUVELLE VERSION</span>
                <h2>Un seul agent.<br /><em>Plusieurs intelligences.</em></h2>
                <p>Chat, voix, images et code dans une interface personnalisée. Les endpoints `/api/*` sont à toi.</p>
                <div className="heroButtons">
                  <button className="primary" onClick={() => setTab("chat")}>Ouvrir l'agent →</button>
                  <button className="secondary" onClick={() => setTab("studio")}>Explorer le studio</button>
                </div>
              </div>
              <div className="orb"><div className="orbCore">MF</div></div>
            </section>

            <section className="stats">
              <div className="stat"><span>Messages</span><strong>{stats.messages}</strong><small>cette session</small></div>
              <div className="stat"><span>Sessions</span><strong>{stats.sessions}</strong><small>locale</small></div>
              <div className="stat"><span>Canaux</span><strong>{stats.channels}</strong><small>Telegram + WhatsApp</small></div>
              <div className="stat"><span>Outils</span><strong>04</strong><small>chat • voix • image • code</small></div>
            </section>

            <section className="sectionGrid">
              <div className="panel">
                <div className="panelTitle"><div><span className="eyebrow">ACTIVITÉ</span><h3>Agent en direct</h3></div><span className="live">LIVE</span></div>
                <div className="activity"><span>●</span><div><b>API Agent</b><p>Endpoint conversation prêt</p></div><time>maintenant</time></div>
                <div className="activity"><span>●</span><div><b>Voice Engine</b><p>Voix navigateur activée</p></div><time>maintenant</time></div>
                <div className="activity"><span>●</span><div><b>Creative Studio</b><p>Image SVG + générateur de code</p></div><time>maintenant</time></div>
              </div>
              <div className="panel quick">
                <span className="eyebrow">ACTIONS RAPIDES</span>
                <button onClick={() => setTab("chat")}>💬 Nouvelle conversation</button>
                <button onClick={generateImage}>✦ Créer une image</button>
                <button onClick={generateCode}>⌘ Générer du code</button>
                <button onClick={startVoice}>◉ Parler à l'agent</button>
              </div>
            </section>
          </>
        )}

        {tab === "chat" && (
          <section className="chatLayout">
            <div className="chatPanel">
              <div className="chatHead"><div><span className="dot" /> Agent MUSLIM FLIC</div><button onClick={clearChat}>Effacer</button></div>
              <div className="messages">
                {messages.map(m => (
                  <div key={m.id} className={m.role === "user" ? "msg user" : "msg"}>
                    <div className="bubble">{m.text}</div>
                    {m.role === "assistant" && <button className="speak" onClick={() => speak(m.text)}>🔊 Écouter</button>}
                  </div>
                ))}
                {busy && <div className="msg"><div className="bubble typing">Traitement<span>•••</span></div></div>}
              </div>
              <div className="composer">
                <button className={listening ? "round listening" : "round"} onClick={startVoice}>🎙</button>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Écris ton message..." />
                <button className="send" onClick={sendMessage}>➤</button>
              </div>
            </div>
            <div className="sideInfo">
              <div className="panel"><span className="eyebrow">CAPACITÉS</span><h3>Ton agent peut</h3><p>Répondre aux messages</p><p>Comprendre la voix du navigateur</p><p>Créer des visuels SVG</p><p>Produire du code</p><p>Exposer tes propres endpoints</p></div>
              <div className="panel"><span className="eyebrow">API</span><code>POST /api/agent</code><code>POST /api/image</code><code>POST /api/code</code></div>
            </div>
          </section>
        )}

        {tab === "studio" && (
          <section>
            <div className="studioGrid">
              <div className="panel toolCard">
                <div className="toolIcon">✦</div><span className="eyebrow">IMAGE ENGINE</span><h3>Créer un visuel</h3>
                <p>Le serveur fabrique un SVG autonome à partir de ton prompt.</p>
                <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Décris ton image..." />
                <button className="primary" onClick={generateImage} disabled={busy}>Générer</button>
                {image && <img className="generatedImage" src={image} alt="Visuel généré" />}
              </div>
              <div className="panel toolCard">
                <div className="toolIcon">⌘</div><span className="eyebrow">CODE ENGINE</span><h3>Générer du code</h3>
                <p>Générateur local de snippets pour démarrer rapidement.</p>
                <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Ex. formulaire de connexion..." />
                <button className="primary" onClick={generateCode} disabled={busy}>Générer</button>
                {code && <pre className="codeBox">{code}</pre>}
              </div>
              <div className="panel toolCard">
                <div className="toolIcon">◉</div><span className="eyebrow">VOICE ENGINE</span><h3>Parler à l'agent</h3>
                <p>Utilise la voix native du navigateur sans clé API externe.</p>
                <button className="primary" onClick={startVoice}>{listening ? "Écoute..." : "Démarrer le micro"}</button>
                <button className="secondary full" onClick={() => speak(messages.at(-1)?.text || "Bonjour")}>Lire la dernière réponse</button>
              </div>
            </div>
          </section>
        )}

        {tab === "channels" && (
          <section className="channelGrid">
            <div className="panel channel"><div className="channelLogo telegram">✈</div><span className="eyebrow">MESSAGERIE</span><h3>Telegram</h3><p>Webhook prévu dans ton API personnalisée.</p><code>POST /api/telegram/webhook</code><span className="planned">PRÊT À CONNECTER</span></div>
            <div className="panel channel"><div className="channelLogo whatsapp">◉</div><span className="eyebrow">MESSAGERIE</span><h3>WhatsApp</h3><p>Endpoint webhook séparé pour garder ton architecture propre.</p><code>POST /api/whatsapp/webhook</code><span className="planned">PRÊT À CONNECTER</span></div>
            <div className="panel channel"><div className="channelLogo custom">API</div><span className="eyebrow">TON INFRASTRUCTURE</span><h3>API personnalisée</h3><p>Tu contrôles les routes et le format des données. Aucun fichier `.env.example` n'est inclus.</p><code>/api/*</code><span className="liveTag">ACTIF</span></div>
          </section>
        )}

        {tab === "settings" && (
          <section className="settingsGrid">
            <div className="panel"><span className="eyebrow">IDENTITÉ</span><h3>MUSLIM FLIC AI</h3><label>Nom de l'agent<input defaultValue="MUSLIM FLIC AI" /></label><label>Description<textarea defaultValue="Agent IA multicanal pour Telegram, WhatsApp, voix, images et code." /></label><button className="primary">Enregistrer localement</button></div>
            <div className="panel"><span className="eyebrow">ARCHITECTURE</span><h3>Mode sans secrets</h3><p className="settingLine">✓ Aucun `.env.example`</p><p className="settingLine">✓ Aucun secret demandé</p><p className="settingLine">✓ API internes sous `/api`</p><p className="settingLine">✓ Voix navigateur</p><p className="settingLine">✓ Stockage de session local</p></div>
          </section>
        )}
      </main>
    </div>
  );
}
