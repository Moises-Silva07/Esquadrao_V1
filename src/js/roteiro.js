/* Esquadrão Sentinela · roteiro.js
   O roteiro como dado: trechos, falas, mudanças de cena, decisões, desafio e quiz. */

/* ===================== Roteiro ===================== */
/* Capítulos da barra do topo, por missão */
const CAPS = {
  0: ["Ameaça", "Comandante", "Vilões", "Enquete", "Esquadrão", "Missões", "Juramento", "Alarme"],
  1: ["Abertura", "Consequência", "Lição", "Desafio", "Virada", "Se eu cair", "Desfecho", "Quiz"]
};
/* As missões da série. Este pacote traz a Missão 0 (recrutamento) e a Missão 1; as outras aparecem na Central como "em breve".
   disponivel: a missão está neste pacote · inicio: trecho onde ela começa · icone: chave de ICONES (cenas.js) */
const MISSOES = [
  { n: 0, titulo: "O Recrutamento", tema: "Boas-vindas", inicio: "m0a", disponivel: true, icone: "escudo" },
  { n: 1, titulo: "A Isca", tema: "Phishing", heroi: "Lupa", inicio: "t1", disponivel: true, icone: "anzol" },
  { n: 2, titulo: "A Força Bruta", tema: "Senhas", heroi: "Chave-Mestra", icone: "chave" },
  { n: 3, titulo: "O Vazamento", tema: "LGPD e dados", heroi: "Guardião", icone: "gota" },
  { n: 4, titulo: "O Camaleão", tema: "Engenharia social", heroi: "Radar e Contraprova", icone: "mascara" }
];

/* ===================== Gamificação ===================== */
/* Patentes: [XP mínimo, nome]. A Missão 0 inteira rende 160 XP (vira Cadete); uma Missão 1 perfeita leva a Elite. */
const PATENTES = [[0, "Recruta"], [150, "Cadete"], [450, "Agente"], [750, "Sentinela"], [950, "Sentinela de Elite"]];
const CONQUISTAS = {
  recruta: { nome: "Recruta Sentinela", desc: "Fez o juramento do esquadrão.", icone: "escudo" },
  olho: { nome: "Olho Vivo", desc: "Reportou o e-mail de phishing de primeira.", icone: "olho" },
  cacador: { nome: "Caçador de Pistas", desc: "Achou os 4 sinais do desafio sem errar.", icone: "lupa" },
  fonte: { nome: "Direto na Fonte", desc: "Conferiu a entrega no app da loja.", icone: "check" },
  reflexo: { nome: "Reflexo Rápido", desc: "Acertou a decisão do SMS em menos de 5 segundos.", icone: "raio" },
  gabarito: { nome: "Gabarito", desc: "Acertou as 5 perguntas do quiz.", icone: "alvo" },
  lupa: { nome: "Insígnia da Lupa", desc: "Concluiu a Missão 1 com aprovação.", icone: "anzol" }
};
/* XP de cada ação. Cada ganho tem uma chave e só conta uma vez (rever a missão não acumula XP de novo). */
const XP = { promessa: 30, m0: 50, pista: 25, pistasPerfeitas: 50, reflexo: 40, quiz: 40, sequencia: 20, aprovado: 150 };

const N = "NARRADOR", L = "LUPA", I = "ISCA", F = "FORÇA BRUTA", C = "COMANDANTE", K = "CAMALEÃO";

/* ===================== Missão 0 · O Recrutamento ===================== */
/* Juramento: os três compromissos do recruta */
const PROMESSAS = [
  ["Desconfiar", "Antes de clicar, olho de novo."],
  ["Verificar", "Confirmo por outro canal, nunca pelo caminho que a mensagem oferece."],
  ["Reportar", "Se algo parecer estranho, ou se eu errar, aviso na hora."]
];
/* Ficha de cada vilão, mostrada no painel holográfico (cena O4) */
const VILOES = {
  isca: { nome: "A Isca", golpe: "Phishing", arma: "E-mail, SMS e WhatsApp falsos", ameaca: 5 },
  forca: { nome: "A Força Bruta", golpe: "Ataque a senhas", arma: "Senha fraca ou repetida", ameaca: 4 },
  vazamento: { nome: "O Vazamento", golpe: "Exposição de dados", arma: "Planilha esquecida, e-mail errado", ameaca: 3 },
  camaleao: { nome: "O Camaleão", golpe: "Engenharia social", arma: "Voz e identidade falsas", ameaca: 5 }
};
/* Estado-base das cenas da Missão 0: limpa o que sobrou da Missão 1 (telas, quadros, personagens recortados) */
const M0 = { bg: "m0", screen: null, fx: null, quadro: null, lupa: false, isca: null, hl: null, step: 0, vilao: null, mapa: 0, pods: null };

const SCENES = {
  inicio: { type: "start", stage: { bg: "title", screen: null, fx: null, quadro: null } },

  /* ---------- Missão 0 · O Recrutamento (só conclusão; o progresso fica em cmi.suspend_data) ----------
     a: arquivo da fala em assets/audio · img: cena (assets/img) · vilao: ficha em destaque · pods: heróis na galeria
     mapa: 1 mostra as missões no painel, 2 também os espaços das insígnias · radio: a fala chega pelo comunicador ("esq"/"dir") */
  m0a: { m: 0, cap: 1, type: "lines", next: "m0b", stage: { ...M0, img: "m0_O1.jpg" }, lines: [
    { who: N, a: "m0_01_narrador.mp3", t: "Toda empresa guarda algo valioso. Dados de clientes. Senhas. Contratos. Dinheiro." },
    { who: N, a: "m0_02_narrador.mp3", t: "E lá fora tem gente tentando entrar. Não pela porta da frente. Por você.", set: { img: "m0_O2.jpg" } }
  ]},
  m0b: { m: 0, cap: 2, type: "lines", next: "m0c", stage: { ...M0, img: "m0_O3.jpg" }, lines: [
    { who: C, a: "m0_03_comandante.mp3", t: "Bom dia, recruta. Eu sou o Comandante do Esquadrão Sentinela." },
    { who: C, a: "m0_04_comandante.mp3", t: "Aqui na {EMPRESA}, a gente tem firewall, antivírus, equipe de TI. Mas nenhuma tecnologia segura um golpe sozinha." },
    { who: C, a: "m0_05_comandante.mp3", t: "Quase todo ataque começa do mesmo jeito: com uma pessoa clicando, respondendo ou acreditando na hora errada. Por isso a nossa melhor defesa é você." }
  ]},
  m0c: { m: 0, cap: 3, type: "lines", next: "m0d", stage: { ...M0, img: "m0_O4.jpg" }, lines: [
    { who: C, a: "m0_06_comandante.mp3", t: "Hã… esses são os que tentam entrar. Conheça o inimigo.", set: { fx: "nervoso" } },
    { who: C, a: "m0_07_comandante.mp3", t: "A Isca. Joga mensagens falsas por e-mail, SMS e WhatsApp, esperando alguém morder.", set: { fx: null, vilao: "isca" } },
    { who: I, a: "m0_08_isca.mp3", t: "Rapidinho, é só clicar aqui!", set: { fx: "holo" } },
    { who: C, a: "m0_09_comandante.mp3", t: "A Força Bruta. Testa milhões de senhas por segundo, e adora quem usa a mesma senha em tudo.", set: { fx: null, vilao: "forca" } },
    { who: C, a: "m0_11_comandante.mp3", t: "O Vazamento. Escorre por planilhas esquecidas e e-mails enviados para a pessoa errada.", set: { vilao: "vazamento" } },
    { who: C, a: "m0_12_comandante.mp3", t: "E o Camaleão. Muda de rosto e de voz. Finge ser do suporte, da diretoria, de um fornecedor.", set: { vilao: "camaleao" } },
    { who: K, a: "m0_13_camaleao.mp3", t: "Oi, aqui é o Comandante. Preciso da sua senha, é urgente.", set: { img: "m0_O5.jpg", vilao: null, fx: "glitch" } },
    { who: C, a: "m0_14_comandante.mp3", t: "Ei! Essa voz é minha! Viu? Nem eu peço sua senha. Nunca.", set: { fx: "vozfalsa" } }
  ]},
  m0d: { m: 0, cap: 4, type: "decision", stage: { ...M0, img: "m0_O4.jpg", vilao: "todos" }, prompt: "Enquete: qual desses você acha que já tentou te enganar?",
    nota: "Não existe resposta certa. Vale a sinceridade.", options: [
    { t: "A Isca (mensagens falsas)", go: "m0e", tag: "Enquete: a Isca", xp: 20, motivo: "Enquete respondida" },
    { t: "A Força Bruta (senhas)", go: "m0e", tag: "Enquete: a Força Bruta", xp: 20, motivo: "Enquete respondida" },
    { t: "O Vazamento (dados expostos)", go: "m0e", tag: "Enquete: o Vazamento", xp: 20, motivo: "Enquete respondida" },
    { t: "O Camaleão (alguém se passando por outra pessoa)", go: "m0e", tag: "Enquete: o Camaleão", xp: 20, motivo: "Enquete respondida" },
    { t: "Nenhum, que eu saiba", go: "m0e", tag: "Enquete: nenhum", xp: 20, motivo: "Enquete respondida" }
  ]},
  m0e: { m: 0, cap: 5, type: "lines", next: "m0f", stage: { ...M0, img: "m0_O3.jpg" }, lines: [
    { who: C, a: "m0_15_comandante.mp3", t: "Seja qual for a sua resposta, nós vamos enfrentar cada um deles, um por missão." },
    { who: C, a: "m0_16_comandante.mp3", t: "Você não vai sozinho. Esta é a Lupa, a melhor detetive do esquadrão.", set: { img: "m0_O6.jpg", pods: "lupa" } },
    { who: L, a: "m0_17_lupa.mp3", t: "Prazer, recruta. Comigo, nenhuma isca passa despercebida.", radio: "dir" },
    { who: C, a: "m0_18_comandante.mp3", t: "Os outros heróis você vai conhecer nas próximas missões. E fique atento: eles podem estar sentados bem do seu lado.", set: { pods: "todos" } }
  ]},
  m0f: { m: 0, cap: 6, type: "lines", next: "m0g", stage: { ...M0, img: "m0_O7.jpg", mapa: 1 }, lines: [
    { who: C, a: "m0_19_comandante.mp3", t: "São quatro missões, uma para cada vilão. Em cada uma, você toma decisões, e elas mudam a história." },
    { who: C, a: "m0_20_comandante.mp3", t: "Errou? Faz parte. Aqui é o lugar certo para errar e aprender." },
    { who: C, a: "m0_21_comandante.mp3", t: "No fim de cada missão tem um desafio rápido. Mandou bem, ganha a insígnia. Com as quatro, você vira um Sentinela completo.", set: { mapa: 2 } },
    { who: C, a: "m0_22_comandante.mp3", t: "Antes de começar, todo Sentinela faz três promessas.", set: { img: "m0_O8.jpg", mapa: 0 } }
  ]},
  m0g: { m: 0, cap: 7, type: "juramento", next: "m0h", stage: { ...M0, img: "m0_O8.jpg" } },
  m0h: { m: 0, cap: 8, type: "lines", next: "m0i", stage: { ...M0, img: "m0_O9.jpg", fx: "alarme" }, lines: [
    { who: L, a: "m0_24_lupa.mp3", t: "Comandante! Atividade suspeita no setor de e-mails.", radio: "esq" },
    { who: C, a: "m0_25_comandante.mp3", t: "É a Isca! Recruta, sua primeira missão começa agora." },
    { who: C, a: "m0_26_comandante.mp3", t: "Lupa, ele é seu. Boa caçada." }
  ]},
  m0i: { m: 0, cap: 8, type: "aceite", stage: { ...M0, img: "m0_O9.jpg", fx: "alarme" } },

  /* Central de Missões: patente, XP, missões e conquistas. Aparece depois da Missão 0 e ao fim de cada missão. */
  hub: { type: "hub", stage: { ...M0, img: "bg_comando.jpg" } },

  /* ---------- Missão 1 · A Isca ---------- */
  t1: { m: 1, cap: 1, type: "lines", next: "d1", stage: { bg: "office", isca: "far", lupa: false, lupaPose: null, screen: null, fx: null, hl: null }, lines: [
    { who: N, t: "Segunda-feira, 8 da manhã. Quarenta e dois e-mails não lidos.", set: { quadro: "q_t1_01" } },
    { who: N, t: "O dia mal começou… e alguém já está pescando.", set: { quadro: "q_t1_02" } },
    { who: N, t: "Um novo e-mail chega com destaque.", set: { quadro: null, screen: "email1" } },
    { who: L, t: "Opa, opa. Antes de clicar… olha de novo.", set: { lupa: true, quadro: "q_t1_04" }, depois: { quadro: "q_t1_05" } },
    { who: L, t: "Prazer, Lupa, do Esquadrão Sentinela. Você é o recruta novo da {EMPRESA}, né?", set: { quadro: "q_t1_05" } },
    { who: L, t: "Então vamos ver do que você é capaz.", set: { quadro: "q_t1_06" } }
  ]},
  d1: { m: 1, cap: 1, type: "decision", tela: "_email", prompt: "O que você faz com esse e-mail?", options: [
    { t: "Clicar no link e atualizar o cadastro", go: "t2a", tag: "Decisão 1: clicou no link", xp: 10, motivo: "Errar também ensina" },
    { t: "Responder perguntando se é verdade", go: "t2b", tag: "Decisão 1: respondeu ao remetente", xp: 30, motivo: "Boa intuição" },
    { t: "Reportar ao TI pelo canal oficial", go: "t2c", tag: "Decisão 1: reportou ao TI", xp: 100, motivo: "Phishing reportado", conq: "olho" }
  ]},
  t2a: { m: 1, cap: 2, type: "lines", next: "t3", stage: { bg: "office", isca: "far", lupa: false, lupaPose: null, screen: "email1", fx: null, hl: null }, lines: [
    { who: N, t: "A página abre: uma tela de login igualzinha à da {EMPRESA}.", set: { screen: "login", lupa: false } },
    { who: N, t: "Usuário… senha… entrar.", set: { quadro: "q_t2a_02" } },
    { who: I, t: "Fisgado! Que peixão!", set: { quadro: "cena06", bg: "roof", isca: "fisgou", fx: "hook", screen: null } },
    { who: I, t: "Com essa senha eu entro no e-mail, no sistema… quem sabe até na folha de pagamento.", set: { quadro: "q_t2a_04" } },
    { who: L, t: "Acontece com gente muito experiente. Mas olha só o que eu teria visto antes.", set: { quadro: "cena04", bg: "office", isca: "far", fx: null, lupa: true } },
    { who: L, t: "Vamos voltar a fita.", set: { quadro: "cena04", fx: "rewind" } }
  ]},
  t2b: { m: 1, cap: 2, type: "lines", next: "t3", stage: { bg: "office", isca: "far", lupa: false, lupaPose: null, screen: "email1", fx: null, hl: null }, lines: [
    { who: N, t: "Você responde: “Isso é verdade?”", set: { screen: "reply1", lupa: false } },
    { who: N, t: "Segundos depois, chega a resposta.", set: { screen: "reply2" } },
    { who: I, t: "Ele respondeu! Agora eu sei que esse endereço existe e que tem alguém lendo.", set: { quadro: "cena07", bg: "roof", isca: "tramando", screen: null } },
    { who: I, t: "Vou caprichar no próximo.", set: { quadro: "q_t2b_04" } },
    { who: L, t: "Quase. Perguntar foi uma boa intuição, mas pro lugar errado: quem responde é o próprio golpista.", set: { quadro: "cena04", bg: "office", isca: "far", lupa: true } },
    { who: L, t: "Desconfiou? Pergunte por outro canal. Bora aprender a enxergar os sinais.", set: { quadro: "q_t1_05" } }
  ]},
  t2c: { m: 1, cap: 2, type: "lines", next: "t3", stage: { bg: "office", isca: "far", lupa: false, lupaPose: null, screen: "email1", fx: null, hl: null }, lines: [
    { who: N, t: "Você clica em Reportar. Na Central Sentinela, um alerta acende.", set: { quadro: "cena12", bg: "central", fx: "alert", screen: null, lupa: false } },
    { who: I, t: "Ei! Quem cortou minha linha?!", set: { quadro: "cena06", bg: "roof", isca: "caido", fx: "cut" }, depois: { quadro: "cena08" } },
    { who: L, t: "Jogada de mestre, recruta.", set: { quadro: "cena13", bg: "central", fx: "stamp", lupa: true, isca: null } },
    { who: L, t: "Esse mesmo e-mail chegou pra outras 300 pessoas. Seu reporte avisou a equipe pra apagar todos.", set: { quadro: "q_t2c_04" } },
    { who: L, t: "Agora deixa eu te mostrar como eu soube na hora.", set: { quadro: "cena13", fx: null } }
  ]},
  t3: { m: 1, cap: 3, type: "lines", next: "t4", stage: { bg: "office", lupa: true, lupaPose: "aponta", isca: null, screen: "tutorial", fx: null, hl: null }, lines: [
    { who: L, t: "Phishing é uma mensagem que finge ser de alguém de confiança pra você entregar senha, dados ou dinheiro.", set: { quadro: "q_t3_01" } },
    { who: L, t: "A Isca joga milhares de anzóis por dia. Mas todo anzol deixa pistas. Cinco delas.", set: { quadro: "q_t3_02" } },
    { who: L, t: "Um: o remetente. Olha o endereço, não só o nome. Esse domínio não é o da {EMPRESA}.", set: { quadro: null, hl: "remetente" } },
    { who: L, t: "Dois: urgência e ameaça. Prazo curto e salário em risco. Pressa desliga o pensamento.", set: { hl: "urgencia" } },
    { who: L, t: "Três: link disfarçado. Passe o mouse em cima, sem clicar, e o endereço real aparece. No celular, segure o dedo.", set: { hl: "link" } },
    { who: L, t: "Quatro: pedido de senha ou dados. RH, TI e banco não pedem sua senha por e-mail. Nunca.", set: { hl: "senha" } },
    { who: L, t: "Cinco: saudação genérica e detalhes estranhos, como “Prezado colaborador”.", set: { hl: "saudacao" } },
    { who: L, t: "Viu um sinal? Já vale desconfiar. Viu dois? Não clica, reporta.", set: { hl: "todos" } }
  ]},
  t4: { m: 1, cap: 4, type: "hotspot", next: "t5", stage: { bg: "office", lupa: true, lupaPose: "aponta", isca: null, screen: null, fx: null, hl: null } },
  t5: { m: 1, cap: 5, type: "lines", next: "d2", stage: { bg: "roof", isca: "irritado", lupa: false, screen: null, fx: null, hl: null }, lines: [
    { who: N, t: "A Isca, irritada, troca de tática.", set: { quadro: "cena09", bg: "roof", isca: "irritado", lupa: false, screen: null, fx: null } },
    { who: I, t: "E-mail não deu? Tudo bem. Todo mundo tá esperando alguma entrega…", set: { quadro: "q_t5_02" } },
    { who: N, t: "No seu celular, uma mensagem de número desconhecido.", set: { quadro: null, bg: "phone", isca: null, screen: "sms" } },
    { who: L, t: "Mesma isca, outro lago. SMS e WhatsApp também têm phishing. E aí, recruta?", set: { quadro: "q_t5_04", lupa: true } }
  ]},
  d2: { m: 1, cap: 5, type: "decision", tela: "_sms", timer: 10, prompt: "Decida rápido: o que você faz?", timeoutGo: "t6b", options: [
    { t: "Pagar, é pouco dinheiro", go: "t6a", tag: "Decisão 2: pagou a taxa", xp: 10, motivo: "Errar também ensina" },
    { t: "Não clicar; conferir no app ou site da loja onde comprei", go: "t6b", tag: "Decisão 2: conferiu na loja", xp: 100, motivo: "Foi direto na fonte", conq: "fonte", reflexo: true }
  ]},
  t6a: { m: 1, cap: 5, type: "lines", next: "t7", stage: { bg: "phone", isca: null, lupa: false, screen: "sms", fx: null, hl: null }, lines: [
    { who: N, t: "O link pede nome, número do cartão, validade e código de segurança.", set: { screen: "card", lupa: false } },
    { who: I, t: "Obrigado pelo cartão! Volte sempre!", set: { quadro: "cena10", bg: "roof", isca: "mao", screen: null, fx: null } },
    { who: L, t: "O golpe nunca foi os R$ 4,90. Era o seu cartão inteiro.", set: { quadro: "q_t5_04", bg: "phone", isca: null, lupa: true } },
    { who: L, t: "Taxa surpresa por link é sinal clássico. Confira sempre direto no site ou app da loja.", set: { quadro: "q_t5_04" } }
  ]},
  t6b: { m: 1, cap: 5, type: "lines", next: "t7", stage: { bg: "phone", isca: null, lupa: false, screen: "sms", fx: null, hl: null }, lines: [
    { who: N, t: "Você abre o app da loja: pedido em trânsito, sem pendências.", set: { screen: "app", lupa: false } },
    { who: L, t: "Isso! Não discutiu com a mensagem, foi direto na fonte.", set: { quadro: "cena15", lupa: true } },
    { who: L, t: "Esse é o hábito que derruba qualquer isca.", set: { quadro: "cena15" } }
  ]},
  t7: { m: 1, cap: 6, type: "lines", next: "t8", stage: { bg: "central", lupa: true, isca: null, screen: null, fx: null, step: 0 }, lines: [
    { who: L, t: "Agora a parte mais importante do treinamento.", set: { quadro: "cena16" } },
    { who: L, t: "Um dia, cansado, com pressa, você pode clicar. Acontece com todo mundo.", set: { quadro: "q_t7_02" } },
    { who: L, t: "O que separa um susto de um desastre é o que você faz nos minutos seguintes.", set: { quadro: "cena16" } },
    { who: L, t: "Primeiro: avise o TI imediatamente, pelo canal oficial. Sem vergonha; ninguém vai te crucificar.", set: { quadro: null, screen: "steps", step: 1 } },
    { who: L, t: "Segundo: troque a senha que você digitou, e em qualquer outro lugar onde usava a mesma.", set: { step: 2 } },
    { who: L, t: "Terceiro: não apague a mensagem. Ela ajuda o TI a bloquear o golpe para todo mundo.", set: { step: 3 } },
    { who: L, t: "Quarto: se envolveu cartão ou banco, ligue para o banco pelo número do verso do cartão.", set: { step: 4 } },
    { who: L, t: "Atacante conta com o silêncio. Quanto mais cedo a gente sabe, menor o estrago.", set: { screen: "report" } }
  ]},
  t8: { m: 1, cap: 7, type: "lines", next: "quiz", stage: { bg: "roof", isca: "lancar", lupa: false, screen: null, fx: null }, lines: [
    { who: N, t: "A Isca tenta lançar a vara de novo…", set: { quadro: "cena05" } },
    { who: N, t: "…mas as janelas da {EMPRESA} se acendem, uma a uma, com reportes.", set: { quadro: "cena05", fx: "lights", isca: "rede" }, depois: { quadro: "cena11" } },
    { who: I, t: "Isso não acaba aqui! Um dia alguém vai estar com pressa…", set: { quadro: "q_t8_03" } },
    { who: L, t: "E nesse dia você vai lembrar: olha de novo.", set: { quadro: "cena13", bg: "central", isca: null, lupa: true, fx: null } },
    { who: L, t: "Bem-vindo ao Esquadrão Sentinela, recruta. Primeira insígnia conquistada.", set: { quadro: "cena13", fx: "badge" }, depois: { quadro: "cena14" } },
    { who: F, t: "123456… senha123… {slug}2026… Achei!", set: { quadro: null, bg: "dark", lupa: false, fx: null } },
    { who: N, t: "Próxima missão: A Força Bruta." }
  ]},
  quiz: { m: 1, cap: 8, type: "quiz", stage: { bg: "central", lupa: true, isca: null, screen: null, fx: null } },
  fim: { m: 1, cap: 8, type: "end", stage: { bg: "central", lupa: true, isca: null, screen: null, fx: "badge" } }
};

const HOTSPOTS = {
  dominio: "Nome da empresa pendurado num domínio que não é o oficial.",
  ameaca: "Ameaça com prazo: a pressa trabalhando para o golpista.",
  validar: "“Valide sua conta” é pedido de login disfarçado.",
  anexo: "Anexo .html inesperado abre uma página falsa."
};

const QUIZ = [
  { q: "Você recebe um e-mail do “Banco” pedindo para confirmar sua senha num link, senão a conta será bloqueada. O que mais denuncia o golpe?",
    o: ["O e-mail ter o logo do banco", "O pedido de senha combinado com ameaça de bloqueio", "Ter chegado numa segunda-feira"], c: 1,
    e: "Banco nenhum pede senha por e-mail, e ameaça com prazo é a pressa trabalhando a favor do golpista." },
  { q: "Como conferir para onde um link leva antes de clicar?",
    o: ["Clicar e ver se a página parece certa", "Passar o mouse sobre o link (ou segurar o dedo, no celular) e ler o endereço real", "Encaminhar para um colega clicar"], c: 1,
    e: "O texto do link pode dizer qualquer coisa; o endereço real é que conta." },
  { q: "O remetente é “Diretoria {EMPRESA}” e o endereço é diretoria@{slug}-corp-mail.com. Isso prova que é legítimo?",
    o: ["Sim, tem o nome da empresa", "Não. O nome no meio do endereço pode ser imitação; o que vale é o domínio oficial (@{dominio})", "Sim, se tiver assinatura no final"], c: 1,
    e: "Golpista adora pendurar o nome da empresa num domínio parecido." },
  { q: "Chega no WhatsApp: “Sua encomenda está retida, pague R$ 4,90 no link”. O melhor caminho é:",
    o: ["Pagar, é um valor baixo", "Responder pedindo mais detalhes", "Ignorar o link e conferir no site ou app oficial da loja"], c: 2,
    e: "Vá direto na fonte; nunca pelo caminho que a mensagem te oferece." },
  { q: "Você clicou num link suspeito e digitou sua senha. Qual a primeira coisa a fazer?",
    o: ["Apagar o e-mail e torcer para nada acontecer", "Avisar o TI imediatamente e trocar a senha", "Esperar para ver se aparece algo estranho"], c: 1,
    e: "Minutos contam. Avisar rápido transforma um desastre num susto." }
];
