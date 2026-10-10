// Servidor local simples (sem dependências). Uso: npm run dev  → http://localhost:5173/src/
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const RAIZ = normalize(join(import.meta.dirname, ".."));
const PORTA = Number(process.env.PORT) || 5173;
const TIPOS = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".webm": "video/webm", ".xml": "application/xml" };

http.createServer(async (req, res) => {
  try {
    let caminho = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (caminho === "/") { res.writeHead(302, { Location: "/src/" }); return res.end(); }
    let arquivo = normalize(join(RAIZ, caminho));
    if (!arquivo.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }
    if ((await stat(arquivo)).isDirectory()) arquivo = join(arquivo, "index.html");
    const dados = await readFile(arquivo);
    res.writeHead(200, { "Content-Type": TIPOS[extname(arquivo).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(dados);
  } catch {
    res.writeHead(404); res.end("Não encontrado");
  }
}).listen(PORTA, () => console.log(`Esquadrão Sentinela rodando em http://localhost:${PORTA}/src/`));
