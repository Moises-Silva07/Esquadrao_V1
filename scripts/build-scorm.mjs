// Gera o pacote SCORM 1.2 em dist/esquadrao-sentinela-m1-scorm12.zip
// Uso: npm run build:scorm
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import AdmZip from "adm-zip";

const RAIZ = join(import.meta.dirname, "..");
const SAIDA = join(RAIZ, "dist", "scorm");
const ZIP = join(RAIZ, "dist", "esquadrao-sentinela-m1-scorm12.zip");

async function listar(dir) {
  const itens = [];
  for (const nome of await readdir(dir)) {
    const p = join(dir, nome);
    if ((await stat(p)).isDirectory()) itens.push(...await listar(p)); else itens.push(p);
  }
  return itens;
}

await rm(join(RAIZ, "dist"), { recursive: true, force: true });
await mkdir(SAIDA, { recursive: true });
await cp(join(RAIZ, "src"), SAIDA, { recursive: true });
await cp(join(RAIZ, "assets"), join(SAIDA, "assets"), { recursive: true });

// Configuração do pacote do cliente: mídia dentro do pacote e sem o painel de demonstração
const cfgPath = join(SAIDA, "js", "config.js");
let cfg = await readFile(cfgPath, "utf8");
cfg = cfg.replace(/midia:\s*"[^"]*"/, 'midia: "assets/"').replace(/modoDemo:\s*true/, "modoDemo: false");
await writeFile(cfgPath, cfg);

const arquivos = (await listar(SAIDA)).map(p => relative(SAIDA, p).split(sep).join("/")).sort();
const manifesto = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="esquadrao-sentinela-m1-a-isca" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata><schema>ADL SCORM</schema><schemaversion>1.2</schemaversion></metadata>
  <organizations default="org-sentinela">
    <organization identifier="org-sentinela">
      <title>Esquadrão Sentinela · Missão 0 (Recrutamento) e Missão 1 (A Isca)</title>
      <item identifier="item-m1" identifierref="res-m1" isvisible="true">
        <title>O Recrutamento e A Isca (phishing)</title>
        <adlcp:masteryscore>80</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="res-m1" type="webcontent" adlcp:scormtype="sco" href="index.html">
${arquivos.map(f => `      <file href="${f}"/>`).join("\n")}
    </resource>
  </resources>
</manifest>
`;
await writeFile(join(SAIDA, "imsmanifest.xml"), manifesto);

const zip = new AdmZip();
zip.addLocalFolder(SAIDA);
zip.writeZip(ZIP);
console.log(`Pacote gerado: ${relative(RAIZ, ZIP)} (${arquivos.length + 1} arquivos)`);
