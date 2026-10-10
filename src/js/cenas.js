/* Esquadrão Sentinela · cenas.js
   Como cada cena é desenhada: imagem de fundo, personagens recortados e as telas (e-mail, SMS, login...) sobrepostas.
   Cada camada traz data-k: o palco (animacao.js) só troca a camada cuja marcação mudou, sem reiniciar as outras. */

/* ===================== Cenas (imagens) ===================== */
const IMG = n => CONFIG.midia + "img/" + n;
/* Posição dos personagens recortados: [centro X %, base %, altura %] */
const ISCA_POSE = { lancar: [30, 26, 48], fisgou: [30, 26, 54], tramando: [28, 26, 56], irritado: [28, 26, 56], caido: [30, 24, 44], rede: [28, 26, 56], mao: [28, 26, 56] };
/* side: de onde o personagem entra quando aparece no meio de um cenário; act: atuação da pose (player.css, .act-*) */
function charHTML(k, file, [x, y, h], { cls = "", side = "left", act = "" } = {}) {
  return `<div class="char ${cls}" data-k="${k}" data-side="${side}" style="left:${x}%;bottom:${y}%;height:${h}%"><div class="ctr"><div class="act${act ? " act-" + act : ""}"><img src="${IMG(file)}" alt=""></div></div></div>`;
}
function signHTML() {
  return `<div class="sign" data-k="sign" style="background:${esc(CONFIG.corMarca)}"><span>${esc(CONFIG.empresa)}</span></div>`;
}
function windowsHTML() {
  let w = "";
  for (let r = 0; r < 9; r++) for (let c = 0; c < 6; c++) {
    if ((r * 5 + c * 2) % 7 === 3) continue;
    /* ordem embaralhada (mas fixa): as janelas acendem "uma a uma", espalhadas pelo prédio */
    w += `<i style="left:${67.6 + c * 3.95}%;top:${26.4 + r * 8.8}%;animation-delay:${((r * 37 + c * 61) % 54) * 55}ms"></i>`;
  }
  return `<div class="lights" data-k="lights">${w}</div>`;
}

/* Ambiência: pequenos movimentos que impedem a cena de ficar 100% parada */
const ESTRELAS = [[3.8, 18.2], [17.4, 5.1], [43.3, 4.6], [56.6, 6.8], [85.2, 2.3], [49.4, 13.4], [61.8, 13.7], [8.6, 8.4], [33, 9.5]];
function skyHTML() {
  return `<div class="sky" data-k="sky"><b class="beacon" style="left:16.1%;top:25.8%"></b>${ESTRELAS.map(([x, y], i) => `<i style="left:${x}%;top:${y}%;animation-delay:${(i * 0.77) % 3.1}s"></i>`).join("")}</div>`;
}
function steamHTML(x) {
  return `<div class="steam" data-k="steam" style="left:${x}%"><i></i><i></i><i></i></div>`;
}
function centralHTML() {
  return `<div class="central-amb" data-k="amb"><div class="scan"><i></i></div><b class="shield-glow"></b>
    <i class="strip" style="left:88.5%;top:31.2%;width:11.5%"></i><i class="strip" style="left:88.5%;top:45.3%;width:11.5%;animation-delay:1.1s"></i><i class="strip" style="left:0;top:30.2%;width:9.6%;animation-delay:.6s"></i></div>`;
}
function darkHTML() {
  const dust = [[14, 44], [22, 58], [31, 38], [38, 52], [26, 30], [45, 40], [18, 66], [34, 62]];
  return `<div class="dark-amb" data-k="amb">${dust.map(([x, y], i) => `<i class="mote" style="left:${x}%;top:${y}%;animation-delay:-${i * 1.3}s"></i>`).join("")}<b class="bf-eyes"></b></div>
    <div class="bf-term" data-k="term"><p style="animation-delay:.9s">&gt; 123456 <s>✗</s></p><p style="animation-delay:1.9s">&gt; senha123 <s>✗</s></p><p style="animation-delay:2.9s">&gt; ${esc(slug())}2026 <u>✓</u></p><p class="ok" style="animation-delay:3.8s">ACESSO LIBERADO</p></div>`;
}

/* Efeitos do telhado. O SVG usa a mesma proporção do palco (16:9), então as coordenadas não distorcem. */
function hookHTML() {
  const ini = "M23 14 Q50 4 70 22", fim = "M23 14 Q40 4 52 18";
  /* sem animação: a linha já aparece recolhida, como no último quadro */
  const puxa = reduced ? "" : `<animate attributeName="d" values="${ini};${ini};${fim}" keyTimes="0;.33;1" dur="2.4s" calcMode="spline" keySplines="0 0 1 1;.45 0 .2 1" fill="freeze"/>`;
  const anzol = reduced ? "" : `<g class="hookhead"><path d="M-1.1 -.75h2.2v1.5h-2.2z M-1.1 -.75 L0 .15 L1.1 -.75" fill="#f4ecd0" stroke="#5a4a2a" stroke-width=".14" stroke-linejoin="round"/>
      <animateMotion dur=".6s" fill="freeze" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines="0 0 .58 1" path="${ini}"/></g>`;
  return `<svg class="line-ov" data-k="hook" viewBox="0 0 100 56.25" preserveAspectRatio="none" aria-hidden="true">
      <path class="hook-line" pathLength="1" d="${reduced ? fim : ini}" stroke="#e8e2c8" stroke-width=".25" fill="none">${puxa}</path>${anzol}</svg>
    <div class="badge-hook" data-k="hookb"><div class="bh-card">crachá<br>fisgado</div></div>`;
}
function cutHTML() {
  return `<svg class="line-ov" data-k="cut" viewBox="0 0 100 56.25" preserveAspectRatio="none" aria-hidden="true">
      <path class="cut-a" d="M23 14 Q36 7.5 47 10.5" stroke="#e8e2c8" stroke-width=".25" fill="none"/>
      <path class="cut-b" d="M47 10.5 Q60 13 70 22" stroke="#e8e2c8" stroke-width=".25" fill="none"/>
      <g transform="translate(47 10.5)"><g class="snap"><path d="M0 -2.4V2.4M-2.4 0H2.4M-1.6 -1.6L1.6 1.6M-1.6 1.6L1.6 -1.6" stroke="#fff6c8" stroke-width=".35" stroke-linecap="round"/></g></g></svg>
    <div class="burst" data-k="burst">LINHA CORTADA!</div>`;
}

/* ===================== Missão 0 (cenas prontas da estação) ===================== */
/* Posições medidas nas artes (1600×893), em % do quadro: centro X de cada silhueta no painel da O4 e de cada nicho da galeria O6 */
const VILAO_X = { isca: 32, forca: 44, vazamento: 57, camaleao: 66 };
const NICHO_X = [22.8, 40.9, 59.1, 77.2];
/* Painel holográfico com varredura: [esquerda, topo, largura, altura]. Só onde o Comandante não fica na frente do painel (O2, O3 e O7 ficam sem). */
const PAINEL = { m0_O9: [34, 28, 32, 27], m0_O4: [23, 16, 50, 54], m0_O5: [23, 16, 50, 54] };
const COM_ANEL = new Set(["m0_O2", "m0_O3", "m0_O4", "m0_O5", "m0_O7", "m0_O9", "bg_comando"]);   // salas com a plataforma dourada no centro

function m0HTML(st, cena) {
  let h = "";
  const pn = PAINEL[cena], verm = cena === "m0_O9" ? " vermelho" : "";
  if (pn) h += `<div class="holo-scan${verm}" data-k="scan" style="left:${pn[0]}%;top:${pn[1]}%;width:${pn[2]}%;height:${pn[3]}%"><i></i></div>`;
  if (COM_ANEL.has(cena)) h += `<b class="anel${verm}" data-k="anel"></b>`;
  switch (cena) {
    case "m0_O1": h += espacoHTML(); break;
    case "m0_O4": h += viloesHTML(st); break;
    case "m0_O5": h += glitchHTML(st); break;
    case "m0_O6": h += galeriaHTML(st); break;
    case "m0_O7": if (st.mapa) h += telaMissoesHTML() + (st.mapa > 1 ? insigniasTelaHTML() : ""); break;
    case "m0_O8": h += brasasHTML(); break;
    case "m0_O9": h += alarmeHTML(); break;
  }
  if (st.fx === "nervoso") h += `<i class="suor" data-k="suor"></i>`;
  if (st.com) h += radioHTML(st.com);
  return h;
}
/* O1: a estação no espaço. Estrelas piscando, o feixe dourado pulsando e pacotes de dados descendo até a cidade */
function espacoHTML() {
  const est = [[12.8, 19.6], [22, 8], [40, 6], [66, 12], [88, 9], [93, 30], [8, 40], [30, 28], [72, 30], [60, 4], [47, 14]];
  return `<div class="sky" data-k="sky">${est.map(([x, y], i) => `<i style="left:${x}%;top:${y}%;animation-delay:${(i * .63) % 3.1}s"></i>`).join("")}</div>
    <div class="feixe-o1" data-k="feixe"></div>
    <div class="pacotes" data-k="pacotes"><i></i><i style="animation-delay:1s"></i><i style="animation-delay:2s"></i></div>
    <b class="sol" data-k="sol"></b><b class="luz-anel" data-k="luzanel"></b>`;
}
/* O4: os vilões no painel. O citado ganha foco, mira e ficha; "todos" (enquete) marca os quatro */
function viloesHTML(st) {
  const v = st.vilao;
  if (v === "todos") return Object.keys(VILAO_X).map((k, i) => `<div class="mira leve" data-k="mira-${k}" style="left:${VILAO_X[k]}%;animation-delay:${i * .15}s"><i></i><i></i><i></i><i></i></div>`).join("");
  if (!v || !VILOES[v]) return "";
  const f = VILOES[v];
  return `<div class="foco" data-k="foco" style="--x:${VILAO_X[v]}%"></div>
    <div class="mira" data-k="mira" style="left:${VILAO_X[v]}%"><i></i><i></i><i></i><i></i><span class="varre"></span></div>
    <div class="dossie" data-k="dossie"><p class="d-k">Dossiê · ameaça identificada</p><p class="d-n">${esc(f.nome)}</p>
      <p><b>Golpe:</b> ${esc(f.golpe)}</p><p><b>Arma:</b> ${esc(f.arma)}</p>
      <p class="d-a">Perigo <span>${[1, 2, 3, 4, 5].map(i => `<i class="${i <= f.ameaca ? "on" : ""}"></i>`).join("")}</span></p></div>` +
    (st.fx === "holo" ? `<div class="holo-fala" data-k="holofala" style="left:${VILAO_X[v]}%">transmissão interceptada</div>` : "");
}
/* O5: o Camaleão salta do painel. Falhas de imagem, tremor no susto e, quando o Comandante percebe, o carimbo de voz falsa */
function glitchHTML(st) {
  let h = `<div class="glitch" data-k="glitch"><i style="top:18%"></i><i style="top:44%;animation-delay:.7s"></i><i style="top:63%;animation-delay:1.3s"></i></div><div class="tremor" data-k="tremor"></div>`;
  if (st.fx === "vozfalsa") h += `<div class="tremor2" data-k="tremor2"></div><div class="voz-falsa" data-k="vozfalsa"><b>Voz falsa</b><span>Ninguém de verdade pede sua senha</span></div>`;
  return h;
}
/* O6: galeria dos heróis. A Lupa aparece em holograma no 2º nicho; os outros nichos guardam heróis ainda secretos */
function galeriaHTML(st) {
  let h = NICHO_X.map((x, i) => `<b class="feixe" data-k="feixe${i}" style="left:${x}%;animation-delay:${i * .6}s"></b>`).join("");
  if (st.pods) h += `<div class="holo-heroi" data-k="lupa" style="left:${NICHO_X[1]}%"><img src="${IMG("lupa_frente.png")}" alt=""><i class="linhas" style="-webkit-mask-image:url(${IMG("lupa_frente.png")});mask-image:url(${IMG("lupa_frente.png")})"></i></div><div class="placa on" data-k="placa1" style="left:${NICHO_X[1]}%">Lupa · detetive</div>`;
  if (st.pods === "todos") h += [2, 3].map(i => `<div class="misterio" data-k="nicho${i}" style="left:${NICHO_X[i]}%;animation-delay:${(i - 2) * .3}s">?</div><div class="placa" data-k="placa${i}" style="left:${NICHO_X[i]}%">em breve</div>`).join("");
  return h;
}
/* O7: a tela das missões. Um telão ao lado do Comandante com as quatro missões em arte de duelo, acendendo uma a uma.
   Mostra o progresso real (liberada, concluída, bloqueada); com mapa 2, os espaços das insígnias. */
function estadoMapa(n) { return PROG.passou(n) ? "feita" : n === 1 || PROG.liberada(n) ? "aberta" : "bloqueada"; }
function telaMissoesHTML() {
  return `<div class="tela-missoes" data-k="mapa"><p class="tm-tit">Quatro missões · quatro vilões</p><div class="tm-grid">${MISSOES.filter(m => m.n > 0).map((m, i) =>
    `<div class="tm-card ${estadoMapa(m.n)}" style="animation-delay:${.35 + i * .4}s">${dueloHTML(m)}<p class="tm-n">Missão ${m.n}</p><p class="tm-t">${esc(m.titulo)}</p><p class="tm-d">${esc(m.tema)}</p></div>`).join("")}</div></div>`;
}
function insigniasTelaHTML() {
  /* mesma moldura do telão (título invisível) para as insígnias caírem em cima de cada cartão */
  return `<div class="tela-missoes ins" data-k="mapains"><p class="tm-tit" aria-hidden="true">Quatro missões · quatro vilões</p><div class="tm-grid">${MISSOES.filter(m => m.n > 0).map((m, i) =>
    `<span class="tm-ins${PROG.passou(m.n) ? " ganha" : ""}" style="animation-delay:${i * .3}s" title="Insígnia da Missão ${m.n}">${ic("escudo")}</span>`).join("")}</div></div>`;
}

/* Arte de duelo de cada missão (herói x vilão), usada no telão das missões (O7) e na Central. O CSS escurece conforme o estado.
   As artes ficam em assets/img/duelo_<n>.jpg; npm run quadros:preparar gera a partir de referencias/duelos/ e atualiza esta lista. */
const DUELOS_PRONTOS = new Set([1, 2, 3, 4]);
function dueloHTML(m) {
  return DUELOS_PRONTOS.has(m.n) ? `<div class="duelo"><img class="d-bg" src="${IMG(`duelo_${m.n}.jpg`)}" alt=""></div>` : `<div class="duelo vazio">${ic(m.icone)}</div>`;
}
/* O8: o juramento. Brasas douradas subindo e uma aura quente em volta do Comandante */
function brasasHTML() {
  const b = [[6, 9], [12, 4], [18, 11], [24, 7], [31, 12], [37, 5], [43, 10], [49, 8], [55, 13], [9, 6], [27, 9], [40, 7], [52, 11], [15, 13]];
  return `<b class="aura" data-k="aura"></b><div class="brasas" data-k="brasas">${b.map(([x, d], i) => `<i style="left:${x}%;animation-duration:${d}s;animation-delay:-${(i * 1.7) % d}s"></i>`).join("")}</div>`;
}
/* O9: o alarme. Pulso vermelho, sirenes girando no teto, faixa de alerta e o tremor da chegada */
function alarmeHTML() {
  return `<div class="pulso-vermelho" data-k="pulso"></div>
    <div class="sirene" data-k="sirene1" style="left:24.5%"><i></i></div><div class="sirene" data-k="sirene2" style="left:76%"><i style="animation-delay:-.7s"></i></div>
    <div class="alert-banner m0" data-k="banner">ALERTA · ATIVIDADE SUSPEITA NO SETOR DE E-MAILS</div><div class="tremor" data-k="tremor"></div>`;
}
/* Comunicador: a Lupa fala de campo, pelo rádio (lado: "esq" ou "dir") */
function radioHTML(lado) {
  return `<div class="radio ${lado}" data-k="radio"><span class="r-av"><img src="${IMG("lupa_frente.png")}" alt=""></span><span class="r-tx"><b>Lupa</b><small>comunicador · canal seguro</small><span class="ondas">${"<i></i>".repeat(9)}</span></span></div>`;
}

/* Ícones (missões, conquistas, patentes): traço simples na cor do texto */
const ICONES = {
  anzol: `<path d="M14 2.5v10.5a5 5 0 0 1-10 0v-2.5l3 2.5"/><circle cx="14" cy="2.5" r=".6"/>`,
  chave: `<circle cx="7.5" cy="16" r="4.5"/><path d="M10.7 12.8 20 3.5m-4.2 4.2 3 3m-5.3-.8 2 2"/>`,
  gota: `<path d="M12 3s6.5 7 6.5 11.2a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/>`,
  mascara: `<path d="M3 6c3 1.6 6 1.6 9 0s6-1.6 9 0v4.5a9 9 0 0 1-18 0z"/><path d="M7.3 11h2.6M14.1 11h2.6M9 15.6c2 1.2 4 1.2 6 0"/>`,
  escudo: `<path d="M12 2.5 19.5 5.5v6c0 4.8-3.3 8.6-7.5 10.5-4.2-1.9-7.5-5.7-7.5-10.5v-6z"/>`,
  olho: `<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>`,
  lupa: `<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 6 6"/>`,
  check: `<path d="m4 12.5 5 5L20 6.5"/>`,
  raio: `<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>`,
  alvo: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>`,
  estrela: `<path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.3l-5.6 2.9 1.1-6.3L2.9 9.5l6.3-.9z"/>`,
  cadeado: `<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`
};
const ic = n => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONES[n] || ""}</svg>`;

/* Câmera por cenário (animacao.js). Os fundos do escritório (cena02, cena03, bg_escritorio) têm o mesmo enquadramento,
   então dividem a câmera "office": a troca entre eles não dá salto, e o monitor sobreposto continua no lugar. */
/* Quadros: uma imagem aprovada por fala (assets/img/quadros/). A lista é mantida por: npm run quadros:preparar */
const QUADROS_PRONTOS = new Set(["cena06", "cena07", "q_t1_01", "q_t1_04", "q_t1_05", "q_t1_06", "q_t2a_02", "q_t2a_04", "q_t2b_04"]);
/* Fala com quadro: a imagem ocupa a cena inteira e as telas sobrepostas somem */
const quadroAtivo = st => (st.bg !== "m0" && st.quadro && QUADROS_PRONTOS.has(st.quadro) && st.quadro) || null;
function sceneParts(st) {
  const quadro = quadroAtivo(st);
  if (quadro) return { bg: "quadros/" + quadro + ".jpg", cam: "q:" + quadro, palco: "quadro", layers: "" };
  let bg = "bg_escritorio.jpg", cam = "office", layers = "";
  switch (st.bg) {
    case "m0": {
      const cena = (st.img || "m0_O1.jpg").replace(/\.jpg$/, "");
      return { bg: cena + ".jpg", cam: cena, palco: "m0", layers: m0HTML(st, cena) };
    }
    case "office":
      if (st.lupa) bg = st.lupaPose === "aponta" ? "cena03.jpg" : "cena02.jpg";
      else if (st.isca === "far" && !st.screen) { bg = "cena01.jpg"; cam = "cena01"; }
      layers = steamHTML(bg === "cena01.jpg" ? 65.6 : 43.5);
      if (st.screen === "tutorial") layers += `<div class="dim" data-k="dim"></div>`;
      break;
    case "title":
      bg = "bg_telhado.jpg"; cam = "title";
      layers = skyHTML() + signHTML() + windowsHTML() + charHTML("lupa", "lupa_frente.png", [46, 27, 58], { cls: "lupa", side: "up" }) +
        `<div class="title-ov" data-k="title"><span>ESQUADRÃO</span><span>SENTINELA</span></div>`;
      break;
    case "roof":
      bg = "bg_telhado.jpg"; cam = "roof";
      layers = skyHTML() + signHTML() + (st.fx === "lights" ? windowsHTML() : "");
      if (st.isca && ISCA_POSE[st.isca]) layers += charHTML("isca", `isca_${st.isca}.png`, ISCA_POSE[st.isca], { cls: "isca", side: "left", act: st.isca });
      if (st.fx === "hook") layers += hookHTML();
      if (st.fx === "cut") layers += cutHTML();
      if (st.isca === "caido") layers += `<div class="dizzy" data-k="dizzy">✦ ✧ ✦</div>`;
      break;
    case "central":
      bg = "bg_central.jpg"; cam = "central";
      layers = centralHTML();
      if (st.fx === "alert") layers += `<div class="alarm-wash" data-k="wash"></div><div class="alarm" data-k="alarm"></div><div class="alert-banner" data-k="banner">ALERTA · PHISHING REPORTADO</div>`;
      if (st.lupa) layers += charHTML("lupa", "lupa_frente.png", [80, 2, 86], { cls: "lupa", side: "right" });
      break;
    case "phone":
      bg = "bg_celular.jpg"; cam = "phone";
      if (st.lupa) layers += charHTML("lupa", "lupa_tresquartos.png", [82, 0, 82], { cls: "lupa", side: "right" });
      break;
    case "dark":
      bg = "bg_sala.jpg"; cam = "dark";
      layers = darkHTML();
      break;
  }
  return { bg, cam, palco: st.bg, layers };
}

/* ===================== Telas dentro da cena ===================== */
const PISTAS = {
  remetente: () => `Pista 1 · O domínio é <span class="mono">atualiza-cadastro.net</span>. O oficial é <span class="mono">@${esc(CONFIG.dominioOficial)}</span>.`,
  urgencia: () => `Pista 2 · Prazo curto + ameaça ao salário.`,
  link: () => `Pista 3 · Passe o mouse no botão: o destino real aparece embaixo e não é da empresa.`,
  senha: () => `Pista 4 · Pede usuário e senha. RH, TI e banco nunca pedem isso por e-mail.`,
  saudacao: () => `Pista 5 · “Prezado colaborador”: nem sabe o seu nome.`
};

const ORDEM_PISTAS = ["remetente", "urgencia", "link", "senha", "saudacao"];
const SCREENS = {
  email1(st) { return `<div class="closeup mon">${SCREENS._email()}</div>`; },
  _email() {
    return `<div class="mail">
      <div class="mail-bar"><span>Caixa de entrada · 42 não lidos</span><span class="mono">08:00</span></div>
      <div class="mail-head">
        <div><b>De:</b> RH Comunicados &lt;rh@atualiza-cadastro.net&gt;</div>
        <div class="subj">URGENTE: Atualização cadastral obrigatória até hoje às 12h</div>
      </div>
      <div class="mail-body">
        <p>Prezado colaborador,</p>
        <p>Identificamos pendências no seu cadastro. Caso não atualize até as 12h, o pagamento deste mês poderá ser suspenso.</p>
        <p>Para regularizar, confirme seu usuário e senha no link abaixo.</p>
        <p><span class="fakebtn">Clique aqui para regularizar</span></p>
      </div>
    </div>`;
  },
  tutorial(st) {
    const atual = st.hl === "todos" ? ORDEM_PISTAS.length - 1 : ORDEM_PISTAS.indexOf(st.hl);
    const estado = k => { const i = ORDEM_PISTAS.indexOf(k); return i < 0 || i > atual ? "" : (i === atual && st.hl !== "todos" ? " mk-on mk-now" : " mk-on"); };
    const mk = (k, html, num = true) => `<span class="mk${estado(k)}">${num && estado(k) ? `<b class="num">${ORDEM_PISTAS.indexOf(k) + 1}</b>` : ""}${html}</span>`;
    const showUrl = atual >= 2;
    return `<div class="fullmail"><div class="mail">
      <div class="mail-bar"><span>Caixa de entrada · 42 não lidos</span><span class="mono">08:00</span></div>
      <div class="mail-head">
        <div><b>De:</b> RH Comunicados ${mk("remetente", "&lt;rh@atualiza-cadastro.net&gt;")}</div>
        <div><b>Para:</b> você</div>
        <div class="subj">${mk("urgencia", "URGENTE: Atualização cadastral obrigatória até hoje às 12h")}</div>
      </div>
      <div class="mail-body">
        <p>${mk("saudacao", "Prezado colaborador,")}</p>
        <p>Identificamos pendências no seu cadastro. ${mk("urgencia", "Caso não atualize até as 12h, o pagamento deste mês poderá ser suspenso.", false)}</p>
        <p>${mk("senha", "Para regularizar, confirme seu usuário e senha no link abaixo.")}</p>
        <p>${mk("link", `<span class="fakebtn">Clique aqui para regularizar</span>`)}</p>
        <p class="sig">Departamento de Recursos Humanos</p>
      </div>
      ${showUrl ? `<div class="hoverbar">🔗 http://atualiza-cadastro.net/login-colaborador</div>` : ""}
    </div>
    ${st.hl && st.hl !== "todos" && PISTAS[st.hl] ? `<p class="clue">${PISTAS[st.hl]()}</p>` : ""}
    ${st.hl === "todos" ? `<p class="clue">5 sinais. Viu um? Desconfie. Viu dois? Não clique: <b>reporte.</b></p>` : ""}
    </div>`;
  },
  login() {
    return `<div class="closeup mon"><div class="browser">
      <div class="urlbar"><span class="dots"><i></i><i></i><i></i></span><span class="url">http://atualiza-cadastro.net/login-colaborador</span></div>
      <div class="portal-head">${logoHTML()}<span>Portal do Colaborador · ${esc(CONFIG.empresa)}</span></div>
      <div class="form">
        <label>Usuário</label><div class="field">seu.nome</div>
        <label>Senha</label><div class="field">••••••••••</div>
        <span class="submit">Entrar</span>
        
      </div>
    </div></div>`;
  },
  reply1() { return SCREENS._reply(false); },
  reply2() { return SCREENS._reply(true); },
  _reply(answered) {
    return `<div class="closeup mon"><div class="mail">
      <div class="mail-bar"><span>Conversa · 2 mensagens</span><span class="mono">08:05</span></div>
      <div class="mail-body" style="padding-top:1em">
        <p><b>Você</b> para rh@atualiza-cadastro.net<br>Isso é verdade?</p>
        ${answered ? `<p style="border-top:1px solid #e3e8f0;padding-top:.7em"><b>RH Comunicados</b> &lt;rh@atualiza-cadastro.net&gt;<br>Sim, é oficial. Faltam 2 horas. Regularize agora para não perder o pagamento.</p>` : `<p class="sig">Enviado. Aguardando resposta…</p>`}
      </div></div></div>`;
  },
  sms() { return `<div class="onphone">${SCREENS._sms()}</div>`; },
  _sms() {
    return `<div class="phone-ui">
      <div class="ph-head">Número desconhecido<small>+55 11 9 4821-0073</small></div>
      <div class="ph-body"><div class="ph-time">Hoje, 10:14</div>
        <div class="bubble">Sua encomenda está retida. Pague a taxa de R$ 4,90 para liberar a entrega: <a>entrega-rapida-br.info/taxa</a></div>
      </div></div>`;
  },
  card() {
    return `<div class="onphone"><div class="phone-ui">
      <div class="ph-head">entrega-rapida-br.info<small>Taxa de liberação · R$ 4,90</small></div>
      <div class="ph-body form" style="padding:.9em .8em">
        <label>Nome no cartão</label><div class="field">SEU NOME</div>
        <label>Número do cartão</label><div class="field">5502 •••• •••• 4417</div>
        <label>Validade · Código</label><div class="field">08/29 · •••</div>
        <span class="submit">Pagar R$ 4,90</span>
      </div></div></div>`;
  },
  app() {
    return `<div class="onphone"><div class="phone-ui">
      <div class="ph-head">Loja Lumen<small>Minhas compras</small></div>
      <div class="ph-body"><div class="app-card">
        <b>Pedido nº 48213</b><span class="small-note">Fone de ouvido sem fio</span>
        <span class="ok-pill">Em trânsito · sem pendências</span>
        <span class="small-note">Previsão de entrega: quinta-feira</span>
      </div></div></div></div>`;
  },
  steps(st) {
    const items = ["Avise o TI imediatamente, pelo canal oficial.", "Troque a senha digitada, e onde mais usava a mesma.", "Não apague a mensagem: ela ajuda a bloquear o golpe.", "Envolveu cartão? Ligue para o banco pelo número do verso."];
    return `<div class="closeup" style="left:13%;top:5%;width:52%"><div class="steps-card"><h3>Caiu num golpe? Os 4 passos</h3><ol>
      ${items.map((t, i) => `<li class="${i + 1 === st.step ? "on" : i + 1 < st.step ? "done" : ""}"><span class="n">${i + 1}</span><span>${t}</span></li>`).join("")}
      </ol></div></div>`;
  },
  report() {
    return `<div class="closeup" style="left:13%;top:16%;width:52%"><div class="report-card">
      <span class="k">${esc(CONFIG.empresa)} · canal de reporte</span>
      <span class="v">${esc(CONFIG.canalReporte)}</span>
      <span>${esc(CONFIG.contatoAlternativo)}</span>
    </div></div>`;
  }
};

function logoHTML() {
  return CONFIG.logo ? `<span class="logo"><img src="${esc(CONFIG.logo)}" alt=""></span>` : `<span class="logo">${esc(iniciais())}</span>`;
}

const BADGE_RECRUTA = `<svg viewBox="0 0 200 230" aria-hidden="true"><path d="M100 8 L186 40 L178 130 Q160 190 100 222 Q40 190 22 130 L14 40 Z" fill="#92b4ea" stroke="#fff3d6" stroke-width="6"/><path d="M100 52 l14 30 33 4 -24 23 6 33 -29 -16 -29 16 6 -33 -24 -23 33 -4z" fill="#f2a93b" stroke="#281904" stroke-width="5" stroke-linejoin="round"/><text x="100" y="196" text-anchor="middle" font-family="Bricolage Grotesque, Trebuchet MS, sans-serif" font-size="21" font-weight="800" fill="#0d1322">RECRUTA</text></svg>`;
const BADGE_SVG =`<svg viewBox="0 0 200 230" aria-hidden="true"><defs><clipPath id="badgeClip"><path d="M100 8 L186 40 L178 130 Q160 190 100 222 Q40 190 22 130 L14 40 Z"/></clipPath><linearGradient id="badgeShine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><path d="M100 8 L186 40 L178 130 Q160 190 100 222 Q40 190 22 130 L14 40 Z" fill="#f2a93b" stroke="#fff3d6" stroke-width="6"/><circle cx="92" cy="100" r="34" fill="none" stroke="#281904" stroke-width="12"/><line x1="116" y1="124" x2="146" y2="156" stroke="#281904" stroke-width="14" stroke-linecap="round"/><text x="100" y="198" text-anchor="middle" font-family="Bricolage Grotesque, Trebuchet MS, sans-serif" font-size="22" font-weight="800" fill="#281904">LUPA</text><g clip-path="url(#badgeClip)"><g transform="rotate(20 100 115)"><rect class="shine" x="-90" y="-20" width="70" height="280" fill="url(#badgeShine)"/></g></g></svg>`;
