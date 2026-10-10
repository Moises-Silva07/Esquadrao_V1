/* Esquadrão Sentinela · core.js
   Utilidades (formatação, escape de texto) e a ponte SCORM 1.2 com o LMS. */

/* ===================== Utilidades ===================== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const slug = () => CONFIG.empresa.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "") || "empresa";
const iniciais = () => CONFIG.empresa.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase() || "E";
const fmt = t => String(t).split("{EMPRESA}").join(CONFIG.empresa).split("{slug}").join(slug()).split("{dominio}").join(CONFIG.dominioOficial);
const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===================== SCORM 1.2 ===================== */
const SCORM = (() => {
  let api = null, finished = false;
  function find(w) {
    let n = 0;
    try {
      while (w && !w.API && w.parent && w.parent !== w && n < 12) { w = w.parent; n++; }
      return w && w.API ? w.API : null;
    } catch (e) { return null; }
  }
  try { api = find(window) || (window.opener ? find(window.opener) : null); } catch (e) { api = null; }
  const call = (fn, ...a) => { try { return api ? api[fn](...a) : ""; } catch (e) { return ""; } };
  return {
    get ok() { return !!api; },
    init() {
      if (!api) return;
      call("LMSInitialize", "");
      const st = call("LMSGetValue", "cmi.core.lesson_status");
      if (!st || st === "not attempted") call("LMSSetValue", "cmi.core.lesson_status", "incomplete");
      call("LMSCommit", "");
    },
    get(k) { return String(call("LMSGetValue", k) || ""); },
    set(k, v) { call("LMSSetValue", k, String(v)); },
    commit() { call("LMSCommit", ""); },
    finish() { if (api && !finished) { finished = true; call("LMSFinish", ""); } }
  };
})();
function tempoSessao() {
  const s = Math.round((Date.now() - S.inicio) / 1000);
  const p = n => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`;
}
