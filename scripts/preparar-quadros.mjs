// Prepara os quadros do episódio: pega as imagens aprovadas em referencias/cenas/, comprime para o pacote
// e registra a lista em cenas.js (QUADROS_PRONTOS). Faz o mesmo com as artes de duelo (referencias/duelos/ → DUELOS_PRONTOS).
// Uso: npm run quadros:preparar
import { execFile } from "node:child_process";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { promisify } from "node:util";
import ffmpeg from "ffmpeg-static";

const RAIZ = join(import.meta.dirname, "..");
const ENTRADA = join(RAIZ, "referencias", "cenas");
const SAIDA = join(RAIZ, "assets", "img", "quadros");
const CENAS = join(RAIZ, "src", "js", "cenas.js");
const ANTIGAS = new Set(["cena01", "cena02", "cena03"]);   // já estão em assets/img e são usadas pela ilustração
const run = promisify(execFile);

await mkdir(SAIDA, { recursive: true });
const imagens = (await readdir(ENTRADA)).filter(n => [".jpg", ".jpeg", ".png", ".webp"].includes(extname(n).toLowerCase()) && !ANTIGAS.has(basename(n, extname(n))));
let total = 0;
for (const nome of imagens) {
  const id = basename(nome, extname(nome));
  const destino = join(SAIDA, id + ".jpg");
  await run(ffmpeg, ["-y", "-loglevel", "error", "-i", join(ENTRADA, nome), "-vf", "scale=1376:-2", "-q:v", "4", destino]);
  const kb = (await stat(destino)).size / 1024; total += kb;
  console.log(`${id}: ${kb.toFixed(0)} KB`);
}
const ids = (await readdir(SAIDA)).filter(n => n.endsWith(".jpg")).map(n => basename(n, ".jpg")).sort();
let cenas = await readFile(CENAS, "utf8");
cenas = cenas.replace(/const QUADROS_PRONTOS = new Set\(\[[^\]]*\]\);/, `const QUADROS_PRONTOS = new Set([${ids.map(i => `"${i}"`).join(", ")}]);`);
await writeFile(CENAS, cenas);
console.log(`\n${ids.length} quadros registrados no player (${(total / 1024).toFixed(1)} MB)`);

// Artes de duelo da Central de Missões: referencias/duelos/duelo_<n>[_qualquer-nome].jpg → assets/img/duelo_<n>.jpg e DUELOS_PRONTOS em cenas.js
const DUELOS = join(RAIZ, "referencias", "duelos");
await mkdir(DUELOS, { recursive: true });
for (const nome of (await readdir(DUELOS)).filter(n => /^duelo_\d+(_[^.]*)?\.(jpe?g|png|webp)$/i.test(n))) {
  const n = /\d+/.exec(nome)[0];
  await run(ffmpeg, ["-y", "-loglevel", "error", "-i", join(DUELOS, nome), "-vf", "scale=800:-2", "-q:v", "4", join(RAIZ, "assets", "img", `duelo_${n}.jpg`)]);
}
const duelos = (await readdir(join(RAIZ, "assets", "img"))).map(n => /^duelo_(\d+)\.jpg$/.exec(n)).filter(Boolean).map(m => m[1]).sort();
cenas = await readFile(CENAS, "utf8");
cenas = cenas.replace(/const DUELOS_PRONTOS = new Set\(\[[^\]]*\]\);/, `const DUELOS_PRONTOS = new Set([${duelos.join(", ")}]);`);
await writeFile(CENAS, cenas);
console.log(`${duelos.length} artes de duelo registradas${duelos.length ? ": " + duelos.map(n => "duelo_" + n).join(", ") : ""}`);
