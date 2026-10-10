# Missão 0 · O Recrutamento

> **Integrada ao player** (outubro/2026). O pacote SCORM abre na Missão 0 e, ao aceitar o chamado, leva à Central de Missões, de onde começa a Missão 1. Onde está cada coisa:
> - Roteiro e falas: `src/js/roteiro.js` (trechos `m0a` a `m0i` e `hub`); desenho e animação das cenas: `m0HTML()` em `src/js/cenas.js`; câmeras: `CAMERAS` em `src/js/animacao.js`.
> - Cenas prontas: `assets/img/m0_O1.jpg` a `m0_O9.jpg`; falas: `assets/audio/m0_*.mp3`.
> - Fontes: cenas em alta e originais da IA em `referencias/missao0/`; folhas do Comandante em `referencias/missao0/comandante/`; vilões em `referencias/viloes/`; logo do broche em `referencias/marca/`.
> - Textos do ElevenLabs: `docs/missao0-elevenlabs.txt`; script do broche: `scripts/colar-broche.py`.

Episódio de abertura do Esquadrão Sentinela. O Comandante (o presidente da empresa, como herói) recebe o colaborador, apresenta os vilões e o esquadrão, explica como as missões funcionam, conduz o juramento e encerra com o alarme que chama a Missão 1. Depois disso, o colaborador cai no **painel de missões**.

| Item | Definição |
| --- | --- |
| Duração | cerca de 3 a 4 minutos |
| Quando aparece | uma vez, antes da Missão 1; quem já concluiu entra direto no painel |
| Objetivo | engajar, explicar o formato e criar o compromisso do recruta (desconfiar, verificar, reportar) |
| Interações | enquete sem resposta certa, juramento em 3 cartões, aceite da primeira missão |
| LMS | só conclusão, sem nota (gravada em `cmi.suspend_data` como `m0: true`, junto com XP e conquistas) |
| Insígnia | "Recruta Sentinela" |
| Ids no roteiro | `m0a` ameaça → `m0b` Comandante → `m0c` vilões → `m0d` enquete → `m0e` esquadrão → `m0f` missões → `m0g` juramento → `m0h` alarme → `m0i` aceite → `hub` |
| XP | enquete 20 · cada promessa 30 · aceite 50 = 160 XP (sobe para Cadete) |

> **Versão exclusiva (Francal).** A Missão 0 usa a imagem e a voz do presidente como Comandante, o broche e a estação com a marca Francal, e o áudio diz "Francal". Antes de usar: autorização por escrito do uso de imagem, voz e marca. Para vender a outros clientes, é preciso uma versão genérica, com um Comandante fictício e o áudio dizendo "empresa".

---

## Personagens

| Personagem | Papel na Missão 0 | Visual | Voz (ElevenLabs, Eleven v3) |
| --- | --- | --- | --- |
| **Comandante** | conduz tudo; líder simpático que fica nervoso de verdade com os vilões | terno azul-marinho, gravata azul, capa cinza, óculos, cabelo grisalho, broche da empresa na lapela esquerda | voz "ABDALA" (Voice Design): grave, calma, senhor de uns 70 anos |
| **Narrador** | abre a missão | (não aparece) | "Will – Deep, Smooth and Affectionate" |
| **Lupa** | heroína da Missão 1; fala pelo comunicador | não aparece nas cenas (está em campo) | "Carla – Children's Story Narrator", com efeito de rádio |
| **Isca** | vilão da Missão 1; fala pelo painel holográfico | silhueta vermelha no painel | voz "ISCA", com efeito de holograma |
| **Força Bruta** | vilã da Missão 2 | silhueta no painel | (sem fala na Missão 0) |
| **Vazamento** | vilão da Missão 3 | silhueta no painel | (sem fala) |
| **Camaleão** | vilão da Missão 4; imita a voz do Comandante | salta do painel com glitch na cena O5 | a voz do Comandante com efeito de "duas vozes" metálico |

Folhas de modelo em `referencias/missao0/comandante/`, `referencias/viloes/` e `referencias/herois/`.

---

## Roteiro cena a cena

Cada fala toca o arquivo indicado em `assets/audio/` (campo `a` da fala em `src/js/roteiro.js`). A legenda usa `{EMPRESA}`, que vira o nome configurado em `CONFIG.empresa`.

### Cena 1 · O que está em jogo — `m0a`

Animação: estrelas piscando, feixe dourado pulsando com pacotes de dados descendo até a cidade, brilho do sol e do anel da estação; câmera aproximando devagar.

| Imagem | Quem | Fala | Arquivo |
| --- | --- | --- | --- |
| `m0_O1.jpg` estação vista de fora | Narrador | Toda empresa guarda algo valioso. Dados de clientes. Senhas. Contratos. Dinheiro. | `m0_01_narrador.mp3` |
| `m0_O2.jpg` Comandante de costas | Narrador | E lá fora tem gente tentando entrar. Não pela porta da frente. Por você. | `m0_02_narrador.mp3` |

### Cena 2 · O Comandante — `m0b`

Animação: painel holográfico tremeluzindo com faixa de varredura e plataforma dourada pulsando.

| Imagem | Quem | Fala | Arquivo |
| --- | --- | --- | --- |
| `m0_O3.jpg` braços abertos | Comandante | Bom dia, recruta. Eu sou o Comandante do Esquadrão Sentinela. | `m0_03_comandante.mp3` |
| `m0_O3.jpg` | Comandante | Aqui na {EMPRESA}, a gente tem firewall, antivírus, equipe de TI. Mas nenhuma tecnologia segura um golpe sozinha. | `m0_04_comandante.mp3` |
| `m0_O3.jpg` | Comandante | Quase todo ataque começa do mesmo jeito: com uma pessoa clicando, respondendo ou acreditando na hora errada. Por isso a nossa melhor defesa é você. | `m0_05_comandante.mp3` |

### Cena 3 · Os vilões — `m0c`

Animação: gota de suor no primeiro "Hã"; a cada vilão citado, o foco escurece os outros, uma mira vermelha trava na silhueta e aparece o dossiê (golpe, arma, nível de perigo); na fala da Isca, "transmissão interceptada". O Camaleão entra em corte seco com tremor de câmera, falhas de imagem e, no "Ei!", o carimbo VOZ FALSA.

| Imagem | Quem | Fala | Arquivo |
| --- | --- | --- | --- |
| `m0_O4.jpg` silhuetas no painel, Comandante ajeitando a gravata | Comandante (nervoso) | Hã… esses são os que tentam entrar. Conheça o inimigo. | `m0_06_comandante.mp3` |
| `m0_O4.jpg` | Comandante | A Isca. Joga mensagens falsas por e-mail, SMS e WhatsApp, esperando alguém morder. | `m0_07_comandante.mp3` |
| `m0_O4.jpg` | Isca (holograma) | Rapidinho, é só clicar aqui! | `m0_08_isca.mp3` |
| `m0_O4.jpg` | Comandante | A Força Bruta. Testa milhões de senhas por segundo, e adora quem usa a mesma senha em tudo. | `m0_09_comandante.mp3` |
| `m0_O4.jpg` | Comandante | O Vazamento. Escorre por planilhas esquecidas e e-mails enviados para a pessoa errada. | `m0_11_comandante.mp3` |
| `m0_O4.jpg` | Comandante | E o Camaleão. Muda de rosto e de voz. Finge ser do suporte, da diretoria, de um fornecedor. | `m0_12_comandante.mp3` |
| `m0_O5.jpg` Camaleão salta do painel, Comandante pula de susto | Camaleão (voz falsa) | Oi, aqui é o Comandante. Preciso da sua senha, é urgente. | `m0_13_camaleao.mp3` |
| `m0_O5.jpg` | Comandante | Ei! Essa voz é minha! Viu? Nem eu peço sua senha. Nunca. | `m0_14_comandante.mp3` |

(O número 10 ficou vago: a fala da Força Bruta foi cortada a pedido, porque ela tem a própria história na Missão 2.)

### Enquete — `m0d` (sobre `m0_O4.jpg`, com as quatro miras)

"Qual desses você acha que já tentou te enganar?" Não há resposta certa; qualquer escolha vale 20 XP e segue para `m0e`.

A) A Isca (mensagens falsas) · B) A Força Bruta (senhas) · C) O Vazamento (dados expostos) · D) O Camaleão (alguém se passando por outra pessoa) · E) Nenhum, que eu saiba

### Cena 4 · O esquadrão (`m0e`) e Cena 5 · Como funciona (`m0f`)

Animação: na galeria, a Lupa se materializa em holograma no 2º nicho com a placa "Lupa · detetive"; a fala dela chega pelo comunicador (cartão com avatar e ondas); depois os nichos 3 e 4 mostram "?". Nas missões, um telão ao lado do Comandante mostra os quatro cartões com a arte de duelo, acendendo um a um; em "ganha a insígnia" surgem os espaços das insígnias. A varredura holográfica não é usada nas cenas O2, O3 e O7, onde o Comandante fica na frente do painel.

| Imagem | Quem | Fala | Arquivo |
| --- | --- | --- | --- |
| `m0_O3.jpg` | Comandante | Seja qual for a sua resposta, nós vamos enfrentar cada um deles, um por missão. | `m0_15_comandante.mp3` |
| `m0_O6.jpg` galeria dos heróis | Comandante | Você não vai sozinho. Esta é a Lupa, a melhor detetive do esquadrão. | `m0_16_comandante.mp3` |
| `m0_O6.jpg` | Lupa (rádio) | Prazer, recruta. Comigo, nenhuma isca passa despercebida. | `m0_17_lupa.mp3` |
| `m0_O6.jpg` | Comandante | Os outros heróis você vai conhecer nas próximas missões. E fique atento: eles podem estar sentados bem do seu lado. | `m0_18_comandante.mp3` |
| `m0_O7.jpg` + **mapa** | Comandante | São quatro missões, uma para cada vilão. Em cada uma, você toma decisões, e elas mudam a história. | `m0_19_comandante.mp3` |
| `m0_O7.jpg` + mapa | Comandante | Errou? Faz parte. Aqui é o lugar certo para errar e aprender. | `m0_20_comandante.mp3` |
| `m0_O7.jpg` + mapa | Comandante | No fim de cada missão tem um desafio rápido. Mandou bem, ganha a insígnia. Com as quatro, você vira um Sentinela completo. | `m0_21_comandante.mp3` |
| `m0_O8.jpg` juramento | Comandante | Antes de começar, todo Sentinela faz três promessas. | `m0_22_comandante.mp3` |

O **telão das missões** (`mapa: 1` no estado da cena, `2` com as insígnias; `telaMissoesHTML()` em cenas.js) cobre o painel da O7 com os 4 cartões de duelo, acendendo um a um. Ele reflete o progresso real: liberada em dourado, concluída em verde, bloqueada em cinza.

### Cena 6 · O juramento — `m0g` (sobre `m0_O8.jpg`, com brasas douradas subindo)

Três cartões aparecem em ordem; o recruta toca em cada um para aceitar, e o cartão acende em dourado com um som:

Cada promessa vale 30 XP; com as três, a conquista **Recruta Sentinela**.

1. **Desconfiar:** "Antes de clicar, olho de novo."
2. **Verificar:** "Confirmo por outro canal, nunca pelo caminho que a mensagem oferece."
3. **Reportar:** "Se algo parecer estranho, ou se eu errar, aviso na hora."

Com os três aceitos, aparecem a insígnia **Recruta Sentinela** e a caixa do **canal de reporte** do cliente (`CONFIG.canalReporte` e `CONFIG.contatoAlternativo`), e toca a fala:

| Quem | Fala | Arquivo |
| --- | --- | --- |
| Comandante | Esse é o canal da Central Sentinela. Guarde bem: é a sua arma mais poderosa. | `m0_23_comandante.mp3` |

Os textos ficam em `PROMESSAS` (roteiro.js); a tela, em `renderJuramento()` (player.js).

### Cena 7 · O alarme — `m0h` (sobre `m0_O9.jpg`)

Animação: entrada em corte seco com tremor, sirene sintetizada, pulso vermelho, dois giroflex no teto e a faixa "ALERTA · ATIVIDADE SUSPEITA NO SETOR DE E-MAILS"; a fala da Lupa chega pelo comunicador.

| Quem | Fala | Arquivo |
| --- | --- | --- |
| Lupa (rádio) | Comandante! Atividade suspeita no setor de e-mails. | `m0_24_lupa.mp3` |
| Comandante | É a Isca! Recruta, sua primeira missão começa agora. | `m0_25_comandante.mp3` |
| Comandante | Lupa, ele é seu. Boa caçada. | `m0_26_comandante.mp3` |

### Aceite — `m0i`

Cartão "Chamado da Central · Missão 1 · A Isca", com a recompensa possível, e o botão **Aceitar a missão**: grava `m0: true`, soma 50 XP (promoção a Cadete) e abre a Central de Missões.

---

## Central de Missões (depois da Missão 0)

Tela `hub` (sobre a cena O2): patente, barra de XP, cartões das missões e conquistas. As missões vêm de `MISSOES` em roteiro.js:

| Missão | Vilão | Tema | Herói | Neste pacote |
| --- | --- | --- | --- | --- |
| 0 | — | Boas-vindas | Comandante | sim |
| 1 | A Isca | Phishing | Lupa | sim |
| 2 | A Força Bruta | Senhas | Chave-Mestra (secreto até liberar) | em breve |
| 3 | O Vazamento | LGPD e dados | Guardião (secreto até liberar) | em breve |
| 4 | O Camaleão | Engenharia social | Radar e Contraprova (secreto até liberar) | em breve |

Estados do cartão: **concluída** (verde, estrelas da melhor nota, "Rever"), **liberada** (dourada, botão pulsando), **bloqueada** (cadeado, "Conclua a Missão N") e **em breve** (não está neste pacote). Estrelas da Missão 1: 3 com 5 acertos, 2 com aprovação, 1 com 2 ou 3 acertos.

Patentes (por XP): Recruta 0 · Cadete 150 · Agente 450 · Sentinela 750 · Sentinela de Elite 950. Conquistas: Recruta Sentinela, Olho Vivo, Caçador de Pistas, Direto na Fonte, Reflexo Rápido, Gabarito, Insígnia da Lupa. Regras em `XP`, `PATENTES` e `CONQUISTAS` (roteiro.js); motor em `src/js/progresso.js`.

---

## Arquivos

| O quê | Onde |
| --- | --- |
| Cenas prontas para o player (1600 px) | `assets/img/m0_O1.jpg` … `m0_O9.jpg` |
| 25 falas | `assets/audio/m0_01` … `m0_26` (sem o 10) |
| Cenas em resolução cheia, com broche | `referencias/missao0/O3…O9_*.jpg` |
| Cenas originais da IA, sem broche | `referencias/missao0/cenas-originais/` |
| Folhas do Comandante (modelo, expressões, poses, nervoso) | `referencias/missao0/comandante/` |
| Folhas dos vilões (Força Bruta, Vazamento, Camaleão) | `referencias/viloes/` (a da Isca está em `referencias/personagens/`) |
| Logo do broche | `referencias/marca/francal_broche.png` |
| Cenários vazios (salão, galeria v2, estação) | `referencias/cenarios/` |
| Textos para o ElevenLabs | `docs/missao0-elevenlabs.txt` |
| Script do broche | `scripts/colar-broche.py` |

### Como as cenas foram feitas

Nano Banana (Gemini), sempre com a mesma ordem de anexos: cenário aprovado → folha de modelo do personagem → expressões ou poses. Uma conversa por cena. Sem texto nem logotipo na arte; o que é texto ou marca entra pelo player.

O **broche** da lapela é colado depois por `scripts/colar-broche.py`, porque a IA inventa um símbolo diferente a cada geração. Na O8, o broche da IA foi apagado antes (`O8_juramento_sem_broche.jpg`) e a logo foi colada na lapela esquerda do personagem.

### Como os áudios foram feitos

- Gerados no **Eleven v3** com tags de emoção (`[nervous]`, `[gulps]`, `[startled]`, `[solemn]`...) e `[long pause]` entre as falas.
- Cortados com `npm run audio:dividir`. Para regravar, os blocos estão em `scripts/blocos-audio.json` (`M0 · COMANDANTE · BLOCO 1 de 4` … `4 de 4`, `M0 · NARRADOR`, `M0 · LUPA`), iguais aos de `docs/missao0-elevenlabs.txt`. As gravações brutas e as versões sem efeito foram descartadas na limpeza de outubro/2026.
- Efeitos aplicados com o ffmpeg de `ffmpeg-static`:

```bash
# Camaleão: duas vozes (aguda + grave) com tremor e eco metálico
-filter_complex "[0]asetrate=44100*1.12,aresample=44100,atempo=0.893[a];[0]asetrate=44100*0.88,aresample=44100,atempo=1.136[b];[a][b]amix=inputs=2:weights=1 0.8,vibrato=f=6:d=0.3,flanger=delay=2:depth=5:regen=50,aecho=0.8:0.5:10:0.35,highpass=f=180,lowpass=f=6000,loudnorm=I=-16:TP=-1.5"
# Lupa pelo rádio (m0_17 e m0_24)
-af "highpass=f=380,lowpass=f=3300,acompressor=threshold=-20dB:ratio=6:attack=5:release=60,volume=2.2,alimiter=limit=0.9,loudnorm=I=-16:TP=-1.5"
# Isca pelo holograma (m0_08)
-af "highpass=f=220,lowpass=f=5200,vibrato=f=9:d=0.12,aecho=0.8:0.4:35:0.25,afade=t=in:d=0.04,apad=pad_dur=0.25,loudnorm=I=-16:TP=-1.5"
```


---

## Pendências e ideias para o Claude Code

1. ~~**Animação:** câmera lenta e transições entre O1…O9; tremor no pulo do Comandante (O5); luzes girando no alarme.~~ Feito.
2. **Risada do Vazamento:** efeito sonoro borbulhante na fala `m0_11` (ainda não existe em `assets/sfx/`).
3. **Abertura (O1):** é um rascunho com a logo desenhada pela IA. Regenerar sem texto e colar a logo verdadeira, como no broche.
4. **Galeria com insígnias:** a cena O6 pode mostrar, nos nichos, os heróis das missões já vencidas (hoje mostra a Lupa e "?").
5. **Versão genérica:** Comandante fictício, áudio com "empresa" e estação sem marca, para vender a outros clientes.
6. **Autorizações:** imagem, voz e marca do presidente e dos colaboradores que viraram heróis, por escrito.
