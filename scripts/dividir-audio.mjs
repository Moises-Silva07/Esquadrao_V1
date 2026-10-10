// Divide uma gravação do ElevenLabs (gerada com <break time="1.5s" />) em uma fala por arquivo.
// Uso: npm run audio:dividir -- "LUPA · PARTE 1 de 3 (falas 1 a 12)" audio-bruto/lupa-parte1.mp3
// Os nomes de cada bloco estão em scripts/blocos-audio.json; os textos, em docs/textos-com-pausas-elevenlabs.txt.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ffmpeg from "ffmpeg-static";

const RAIZ = join(import.meta.dirname, "..");
const [bloco, origem] = process.argv.slice(2);
const blocos = JSON.parse(readFileSync(join(import.meta.dirname, "blocos-audio.json"), "utf8"));
if (!bloco || !origem || !blocos[bloco]) {
  console.error("Uso: npm run audio:dividir -- \"<nome do bloco>\" <arquivo.mp3>\nBlocos:\n- " + Object.keys(blocos).join("\n- "));
  process.exit(1);
}
const nomes = blocos[bloco];

// 1) acha os silêncios longos (as pausas de 1,5 s)
const log = spawnSync(ffmpeg, ["-i", origem, "-af", "silencedetect=noise=-42dB:d=0.9", "-f", "null", "-"], { encoding: "utf8" }).stderr;
const ev = [...log.matchAll(/silence_(start|end): ([0-9.]+)/g)];
const dur = Number(/Duration: (\d+):(\d+):([\d.]+)/.exec(log).slice(1).reduce((a, v) => a * 60 + Number(v), 0));
const sil = []; let ini = null;
for (const [, k, v] of ev) { if (k === "start") ini = Number(v); else if (ini !== null) { sil.push([ini, Number(v)]); ini = null; } }
const internos = sil.filter(([a, b]) => a > 0.3 && b < dur - 0.3);
console.log(`${bloco}: ${internos.length} pausas longas; esperado ${nomes.length - 1}`);
if (internos.length !== nomes.length - 1) { console.error("A contagem não bate: gere o bloco de novo no ElevenLabs."); process.exit(2); }

// 2) corta cada fala com respiro natural, fade suave e volume padronizado
const limites = [[null, 0], ...internos, [dur, null]];
nomes.forEach((nome, i) => {
  const st = Math.max(0, limites[i][1] - 0.12);
  const fim = limites[i + 1][0] !== null && i + 1 < limites.length - 1 ? limites[i + 1][0] + 0.55 : dur;
  const d = fim - st;
  execFileSync(ffmpeg, ["-v", "error", "-y", "-ss", st.toFixed(3), "-t", d.toFixed(3), "-i", origem, "-af",
    `silenceremove=start_periods=1:start_threshold=-50dB,afade=t=in:d=0.06,afade=t=out:st=${(d - 0.45).toFixed(3)}:d=0.45,loudnorm=I=-16:TP=-1.5:LRA=11,apad=pad_dur=0.2`,
    "-ar", "44100", "-b:a", "128k", join(RAIZ, "assets", "audio", nome)]);
  console.log(`  ${nome}  ${d.toFixed(2)} s`);
});
