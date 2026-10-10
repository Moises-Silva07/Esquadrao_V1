/* Esquadrão Sentinela · progresso.js
   Gamificação: XP, patentes, conquistas e o progresso salvo entre sessões.
   No LMS o progresso vai em cmi.suspend_data (SCORM 1.2, até 4096 caracteres); fora dele, no localStorage do navegador.
   As regras (quanto vale cada ação, patentes, conquistas) ficam em roteiro.js: XP, PATENTES, CONQUISTAS. */

const PROG = (() => {
  const CHAVE = "esquadrao-sentinela";
  /* m0: recrutamento feito · xp: total · k: chaves de XP já ganhas · c: conquistas · nota: melhor nota (acertos) por missão */
  const vazio = () => ({ m0: false, xp: 0, k: [], c: [], nota: {} });
  let d = vazio();

  function carregar() {
    let txt = "";
    if (SCORM.ok) txt = SCORM.get("cmi.suspend_data");
    else try { txt = localStorage.getItem(CHAVE) || ""; } catch (e) {}
    try { d = { ...vazio(), ...(txt ? JSON.parse(txt) : {}) }; } catch (e) { d = vazio(); }
  }
  function salvar() {
    const txt = JSON.stringify(d);
    if (SCORM.ok) { SCORM.set("cmi.suspend_data", txt); SCORM.commit(); }
    else try { localStorage.setItem(CHAVE, txt); } catch (e) {}
  }
  /* Patente atual, XP mínimo dela e a próxima ([xp, nome] ou null na última) */
  function patente(xp = d.xp) {
    let i = 0;
    while (i + 1 < PATENTES.length && xp >= PATENTES[i + 1][0]) i++;
    return { i, nome: PATENTES[i][1], min: PATENTES[i][0], prox: PATENTES[i + 1] || null };
  }
  const passou = n => n === 0 ? d.m0 : (d.nota[n] ?? -1) >= CONFIG.notaMinima;

  return {
    carregar, patente, passou,
    get xp() { return d.xp; },
    get m0() { return d.m0; },
    tem: id => d.c.includes(id),
    nota: n => d.nota[n] ?? null,
    /* Missão liberada: está no pacote e a anterior foi concluída (a 1 depende só do recrutamento) */
    liberada(n) {
      const m = MISSOES.find(x => x.n === n);
      return !!(m && m.disponivel && (n === 0 || passou(n - 1)));
    },
    /* Soma XP uma única vez por chave; avisa na tela e anuncia promoção de patente */
    ganhar(chave, xp, motivo) {
      if (!xp || d.k.includes(chave)) return 0;
      const antes = patente().i;
      d.k.push(chave); d.xp += xp; salvar();
      toastXP(xp, motivo);
      const p = patente();
      if (p.i > antes) setTimeout(() => { toast(`${ic("estrela")}<span><small>Promoção!</small><b>Agora você é ${esc(p.nome)}</b></span>`, "grande patente"); efeito("insignia", .55); }, 900);
      hud(true);
      return xp;
    },
    conquistar(id) {
      if (d.c.includes(id) || !CONQUISTAS[id]) return;
      d.c.push(id); salvar();
      const c = CONQUISTAS[id];
      setTimeout(() => { toast(`${ic(c.icone)}<span><small>Conquista desbloqueada</small><b>${esc(c.nome)}</b></span>`, "grande"); efeito("insignia", .5); }, 450);
    },
    marcarM0() { d.m0 = true; salvar(); },
    registrarNota(n, ok) { if (ok > (d.nota[n] ?? -1)) { d.nota[n] = ok; salvar(); } },
    zerar() { d = vazio(); salvar(); hud(); }
  };
})();

/* ===================== Na tela: placar de XP e avisos ===================== */
function hud(pulso) {
  const el = $("xpHud"); if (!el) return;
  const p = PROG.patente();
  const pct = p.prox ? Math.round((PROG.xp - p.min) / (p.prox[0] - p.min) * 100) : 100;
  el.innerHTML = `${ic("estrela")}<b>${PROG.xp}</b> XP <span class="xp-pat">· ${esc(p.nome)}</span><span class="xp-bar"><i style="width:${pct}%"></i></span>`;
  el.title = p.prox ? `Faltam ${p.prox[0] - PROG.xp} XP para ${p.prox[1]}` : "Patente máxima";
  if (pulso) {
    el.classList.remove("pulso"); void el.offsetWidth; el.classList.add("pulso");
    /* o topo fica translúcido durante a cena: acende por um instante para mostrar o ganho */
    const fr = $("frame"); fr.classList.add("hud-on"); clearTimeout(hud.t); hud.t = setTimeout(() => fr.classList.remove("hud-on"), 2600);
  }
}
function toast(html, cls = "") {
  const box = $("toasts"); if (!box) return;
  const t = document.createElement("div");
  t.className = "toast " + cls; t.innerHTML = html;
  box.appendChild(t);
  while (box.children.length > 3) box.firstElementChild.remove();
  setTimeout(() => { t.classList.add("sai"); setTimeout(() => t.remove(), 450); }, cls.includes("grande") ? 3800 : 2400);
}
function toastXP(xp, motivo) {
  toast(`<b class="t-xp">+${xp} XP</b>${motivo ? `<span>${esc(motivo)}</span>` : ""}`);
  bip("xp");
}
