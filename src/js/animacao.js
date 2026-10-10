/* Esquadrão Sentinela · animacao.js
   Vida no palco: câmera lenta em cada cenário, transição entre cenários e troca suave das camadas
   (personagens, efeitos) quando o estado muda. Sem biblioteca: CSS para os movimentos, requestAnimationFrame para a câmera.
   Com prefers-reduced-motion, as cenas aparecem estáticas e as trocas são instantâneas. */

/* ===================== Câmera ===================== */
/* o: ponto para onde a câmera se aproxima (% do quadro); z: zoom mínimo e máximo; T: segundos de um ciclo (aproxima e volta);
   mao: balanço de câmera na mão (celular). Zoom sempre ≥ 1 em torno da origem: nunca aparece borda preta. */
const CAMERAS = {
  title:   { o: [46, 42], z: [1, 1.06], T: 26 },
  cena01:  { o: [16, 30], z: [1, 1.07], T: 24 },   // aproxima da Isca pescando, lá fora
  office:  { o: [52, 46], z: [1, 1.05], T: 26 },   // entre a Lupa e o monitor
  roof:    { o: [30, 58], z: [1, 1.06], T: 22 },   // Isca no telhado
  central: { o: [50, 36], z: [1, 1.05], T: 28 },
  phone:   { o: [49, 50], z: [1.03, 1.06], T: 20, mao: true },
  dark:    { o: [51.6, 22], z: [1, 1.1], T: 36 },   // avança devagar até os olhos da Força Bruta
  /* Missão 0: uma câmera por cena da estação */
  m0_O1:   { o: [54, 45], z: [1, 1.1], T: 30 },     // aproxima da estação
  m0_O2:   { o: [50, 42], z: [1, 1.08], T: 26 },    // o Comandante de costas, olhando a Terra
  m0_O3:   { o: [50, 38], z: [1, 1.06], T: 24 },
  m0_O4:   { o: [46, 44], z: [1, 1.05], T: 26 },
  m0_O5:   { o: [62, 42], z: [1.02, 1.08], T: 9 },  // susto: câmera mais nervosa
  m0_O6:   { o: [40, 42], z: [1, 1.06], T: 26 },
  m0_O7:   { o: [50, 40], z: [1, 1.04], T: 26 },
  m0_O8:   { o: [30, 32], z: [1, 1.07], T: 24 },
  m0_O9:   { o: [55, 38], z: [1.01, 1.06], T: 7 },  // alarme
  bg_comando: { o: [50, 45], z: [1, 1.05], T: 30 }  // salão vazio: fundo da Central de Missões
};
/* Entradas em corte seco (o susto do Camaleão e o alarme): sem transição, com tremor */
const CORTE_SECO = new Set(["m0_O5", "m0_O9"]);
/* Quadros: cada imagem ganha um ponto de aproximação diferente (fixo pelo nome), para a câmera não repetir sempre o mesmo movimento */
const ORIGENS_QUADRO = [[50, 40], [38, 42], [62, 42], [50, 55], [42, 35], [58, 35]];
function camQuadro(nome) {
  let h = 0; for (const c of nome) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return { o: ORIGENS_QUADRO[h % ORIGENS_QUADRO.length], z: [1, 1.06], T: 24 };
}
/* Telas desenhadas "dentro" do cenário (no monitor ou no celular): acompanham a câmera para não descolar do fundo */
const TELA_NA_CENA = new Set(["email1", "login", "reply1", "reply2", "sms", "card", "app"]);

function camTransform(c, agora) {
  const t = (agora - c.t0) / 1000;
  const e = (1 - Math.cos(2 * Math.PI * t / c.T)) / 2;      // 0 → 1 → 0, começa e termina parado
  let tr = `scale(${(c.z[0] + (c.z[1] - c.z[0]) * e).toFixed(4)})`;
  if (c.mao) {
    const x = Math.sin(t * .9) * .3, y = Math.cos(t * 1.1) * .3, r = Math.sin(t * 1.3) * .22 + Math.sin(t * .7) * .1;
    tr = `translate(${x.toFixed(3)}%, ${y.toFixed(3)}%) rotate(${r.toFixed(3)}deg) ${tr}`;
  }
  return tr;
}
function cameraLoop(agora) {
  let ultima = null;
  for (const sh of $("art").children) if (sh._cam) { ultima = sh._cam; sh.firstElementChild.style.transform = camTransform(ultima, agora); }
  const scr = $("screen");
  if (ultima && TELA_NA_CENA.has(S.stage.screen)) {
    scr.style.transformOrigin = `${ultima.o[0]}% ${ultima.o[1]}%`;
    scr.style.transform = camTransform(ultima, agora);
  } else if (scr.style.transform) scr.style.transform = "";
  requestAnimationFrame(cameraLoop);
}

/* ===================== Planos e transições ===================== */
const TRANSICAO_MS = { fade: 750, wipe: 700, dip: 1350, cut: 0 };
function tipoTransicao(de, para) {
  if (!de) return "fade";                                                       // abertura: entra direto
  if (de === "title" || de === "dark" || para === "dark") return "dip";       // pelo preto
  if (de === "roof" || para === "roof") return "wipe";                          // corte para o covil da Isca
  return "fade";
}

/* Desenha o estado do palco. Se o fundo mudou, cria um plano novo e faz a transição;
   se não, troca só as camadas que mudaram (o resto continua animando de onde estava). */
function montarCena(p) {
  const art = $("art");
  const tpl = document.createElement("template");
  tpl.innerHTML = p.layers;
  const atual = art.lastElementChild && art.lastElementChild._cam ? art.lastElementChild : null;
  if (atual && atual.dataset.bg === p.bg) trocarCamadas(atual.firstElementChild, tpl.content);
  else novoPlano(art, atual, p, tpl.content);
}

function novoPlano(art, antigo, p, camadas) {
  const shot = document.createElement("div");
  shot.className = "shot";
  shot.dataset.bg = p.bg;
  shot.dataset.palco = p.palco;
  const cfg = CAMERAS[p.cam] || (p.palco === "quadro" ? camQuadro(p.cam) : CAMERAS.office);
  /* mesma câmera (ex.: cena02 → cena03): continua o movimento de onde estava, sem salto */
  const t0 = antigo && antigo._camKey === p.cam ? antigo._cam.t0 : performance.now();
  shot._cam = { ...cfg, t0 }; shot._camKey = p.cam;
  const cam = document.createElement("div");
  cam.className = "cam";
  cam.style.transformOrigin = `${cfg.o[0]}% ${cfg.o[1]}%`;
  cam.innerHTML = `<img class="bg" src="${IMG(p.bg)}" alt="">`;
  for (const n of [...camadas.children]) {
    n._html = n.outerHTML;
    if (n.classList.contains("char")) n.classList.add("in-cut");
    cam.appendChild(n);
  }
  shot.appendChild(cam);
  if (reduced) { art.replaceChildren(shot); return; }
  cam.style.transform = camTransform(shot._cam, performance.now());
  [...art.children].forEach(c => { if (c !== antigo) c.remove(); });   // trocas rápidas: só o plano anterior fica
  const tipo = CORTE_SECO.has(p.cam) ? "cut" : tipoTransicao(antigo && antigo.dataset.palco, p.palco);
  shot.classList.add("pending");
  art.appendChild(shot);
  /* só começa a transição com o fundo carregado: evita um quadro preto no meio do crossfade */
  const iniciar = () => {
    if (!shot.isConnected) return;
    shot.classList.replace("pending", "enter-" + tipo);
    if (antigo && antigo.isConnected) {
      antigo.classList.add("leave-" + tipo);
      setTimeout(() => antigo.remove(), TRANSICAO_MS[tipo]);
    }
  };
  const bg = cam.firstElementChild;
  if (bg.complete) iniciar();
  else Promise.race([bg.decode().catch(() => {}), new Promise(r => setTimeout(r, 700))]).then(iniciar);
}

/* Pré-carrega fundos e recortes para as trocas de cena não esperarem a rede */
function preCarregarImagens() {
  const nomes = ["cena01.jpg", "cena02.jpg", "cena03.jpg", "bg_escritorio.jpg", "bg_telhado.jpg", "bg_central.jpg", "bg_celular.jpg", "bg_sala.jpg",
    "lupa_frente.png", "lupa_tresquartos.png", ...Object.keys(ISCA_POSE).map(p => `isca_${p}.png`), ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `m0_O${n}.jpg`), "bg_comando.jpg"];
  preCarregarImagens.cache = nomes.map(n => { const i = new Image(); i.src = IMG(n); return i; });
}

function trocarCamadas(cam, camadas) {
  const velhas = new Map();
  for (const n of cam.children) if (n.dataset.k && !n.classList.contains("out") && !n.classList.contains("out-swap")) velhas.set(n.dataset.k, n);
  let ant = cam.querySelector(".bg");
  for (const n of [...camadas.children]) {
    const k = n.dataset.k, html = n.outerHTML, v = velhas.get(k);
    if (v && v._html === html) { velhas.delete(k); ant = v; continue; }   // igual: mantém, sem reiniciar a animação
    n._html = html;
    if (v) {                                    // troca (ex.: pose da Isca): a nova entra por cima e a antiga some por baixo
      velhas.delete(k); v.after(n); sair(v, true);
      if (n.classList.contains("char")) n.classList.add("in-swap");
    } else {
      if (n.classList.contains("char")) n.classList.add("in-walk");   // personagem entra em cena
      ant.after(n);
    }
    ant = n;
  }
  velhas.forEach(v => sair(v));
}
function sair(n, troca) {
  if (reduced) { n.remove(); return; }
  n.classList.add(troca ? "out-swap" : "out");
  setTimeout(() => n.remove(), troca ? 320 : 480);
}

preCarregarImagens();
if (!reduced) requestAnimationFrame(cameraLoop);
