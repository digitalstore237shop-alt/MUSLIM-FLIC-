function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function createSvgImage(prompt = "MUSLIM FLIC AI") {
  const safe = escapeXml(prompt.slice(0, 90));

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bg"><stop stop-color="#33267a"/><stop offset="1" stop-color="#070912"/></radialGradient>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#a58cff"/><stop offset="1" stop-color="#4e63ff"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="22"/></filter>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <circle cx="512" cy="470" r="260" fill="#7964ff" opacity=".22" filter="url(#glow)"/>
  <circle cx="512" cy="470" r="205" fill="#0e1326" stroke="url(#g)" stroke-width="5"/>
  <rect x="422" y="380" width="180" height="180" rx="48" fill="url(#g)"/>
  <text x="512" y="494" text-anchor="middle" font-family="Arial,sans-serif" font-size="74" font-weight="900" fill="white">MF</text>
  <text x="512" y="760" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" font-weight="800" fill="white">MUSLIM FLIC AI</text>
  <text x="512" y="810" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#aeb6d0">${safe}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
