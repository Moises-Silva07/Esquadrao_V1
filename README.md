# Esquadrão Sentinela

Treinamento interativo de segurança da informação, com heróis, vilões, decisões e quiz. É white label (nome, cor e logo do cliente) e é entregue em SCORM 1.2 para qualquer LMS ou intranet.

**Missão 0 · O Recrutamento:** o Comandante apresenta os vilões, o esquadrão e o juramento do Sentinela.

**Missão 1 · A Isca:** a Lupa ensina o colaborador a reconhecer e reportar phishing por e-mail, SMS e WhatsApp.

Gamificado: XP, patentes, conquistas, estrelas e uma Central de Missões, com o progresso salvo no LMS.

## Começando

Requer [Node.js](https://nodejs.org) 20.11 ou mais recente.

```bash
npm install
npm run dev          # abre em http://localhost:5173/src/
npm run build:scorm  # gera dist/esquadrao-sentinela-m1-scorm12.zip
```

## Personalizar para um cliente

Edite `src/js/config.js` (empresa, domínio oficial, cor, logo, canal de reporte) e rode `npm run build:scorm`.

## Usar com o Claude Code

Abra esta pasta no Claude Code. O arquivo `CLAUDE.md` explica a arquitetura, as regras do produto e o roteiro de animação. Um bom primeiro pedido:

> Leia o CLAUDE.md e faça a Etapa 1 do roteiro de animação (movimento de câmera e vida no palco). Rode o projeto e me mostre como ficou.

## Documentos

- `docs/missao0-roteiro.md`: Missão 0 cena a cena, animações, Central de Missões e gamificação
- `docs/missao0-elevenlabs.txt`: textos da Missão 0 para o ElevenLabs
- `docs/esquadrao-sentinela-roteiro-completo.md`: universo, personagens, roteiro e quiz
- `docs/storyboard-modulo1-a-isca.pdf`: storyboard quadro a quadro
- `docs/narracao-modulo1-a-isca.csv`: as 58 falas com nome de arquivo
- `docs/textos-com-pausas-elevenlabs.txt`: textos prontos para regravar as vozes
