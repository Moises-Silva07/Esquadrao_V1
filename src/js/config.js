/* Esquadrão Sentinela · config.js
   Configuração white label. É o ÚNICO arquivo que muda de um cliente para outro. */

/* =====================================================================
   CONFIGURAÇÃO WHITE LABEL — único bloco que muda de um cliente para outro
   ===================================================================== */
const CONFIG_PADRAO = {
  empresa: "Empresa Exemplo",
  dominioOficial: "empresaexemplo.com.br",
  corMarca: "#2f6fdb",
  logo: null,                       // data URI de uma imagem, ou null para usar as iniciais
  canalReporte: "Botão “Reportar phishing” no Outlook",
  contatoAlternativo: "seguranca@empresaexemplo.com.br · ramal 4040",
  midia: "../assets/",               // pasta com img/, audio/ e sfx/ (no pacote SCORM vira "assets/")
  notaMinima: 4,                    // acertos (de 5) para aprovação
  modoDemo: true                    // mostra o painel de personalização
};
let CONFIG = JSON.parse(JSON.stringify(CONFIG_PADRAO));
