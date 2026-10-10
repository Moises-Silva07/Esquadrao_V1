# Artes de duelo da Central de Missões

**Para que serve:** cada cartão de missão da Central (e do telão que o Comandante mostra na Missão 0) traz uma arte do herói em posição de luta contra o vilão. O player escurece a arte sozinho: meio escura quando a missão está liberada, quase apagada quando está bloqueada e colorida quando o recruta vence. Por isso, gere a imagem **com luz normal**; não precisa escurecer.

**Sem a arte**, o cartão mostra só o ícone da missão.

**Depois de gerar:** salve em `referencias/duelos/` com o nome indicado em cada cena e rode `npm run quadros:preparar` (ou me peça). O script comprime para `assets/img/` e liga a arte no player.

Situação (07/out/2026): as quatro artes estão prontas e ligadas (`referencias/duelos/duelo_<n>_*.jpg` → `assets/img/duelo_<n>.jpg`). Para trocar uma, salve a nova com o mesmo número e rode `npm run quadros:preparar`.

---

## Nano Banana (Gemini) · imagens

Uma conversa nova por arte. Anexe os arquivos **na ordem numerada**, depois cole o prompt inteiro.

### Duelo 1 · Lupa x A Isca → salvar como `duelo_1.jpg`

Anexos:
1. `referencias/cenarios/cenario_telhado_v1.jpg`
2. `referencias/personagens/lupa_folha_modelo_v1.jpg`
3. `referencias/personagens/lupa_poses_v1.jpg`
4. `referencias/personagens/isca_folha_modelo_v1.jpg`
5. `referencias/personagens/isca_poses_v1.jpg`

```
Crie uma ilustração 2D flat, contorno limpo, cores chapadas e sombreamento simples, no mesmo estilo dos anexos. Formato paisagem 4:3.

Cenário: o telhado da imagem 1, à noite, com a cidade ao fundo. Mantenha o mesmo cenário, sem texto, placas ou logotipos.

Personagens, um de frente para o outro, em posição de luta, como o pôster de um duelo:
- À esquerda: a Isca (imagens 4 e 5), vilão de sobretudo cinza #3B4459, cachecol e faixa do chapéu vermelhos #D84A4A, chapéu cinza #5B6274. Ele está em base de combate, joelhos flexionados, girando a vara de pesca acima da cabeça, com o anzol de envelope voando na direção da heroína. Expressão maliciosa e confiante.
- À direita: a Lupa (imagens 2 e 3), detetive de casaco azul-petróleo #2B5F6E, capa âmbar #F2A93B esvoaçando, calça #25324C, óculos redondos e cabelo preto chanel. Ela está em postura firme de defesa, corpo de lado, erguendo a lupa de cabo de madeira como um escudo; a lente brilha e bloqueia o anzol no meio do caminho. Expressão determinada.

Mantenha os rostos, roupas e proporções exatamente como nas folhas de modelo. Os dois personagens de corpo inteiro, ocupando cada um cerca de 40% da largura, com espaço vazio no centro entre eles, onde o anzol e o brilho da lupa se encontram. Luz de lua azulada com contraluz âmbar vindo da lupa. Sem texto, sem letras, sem logotipos, sem marca d'água.
```

### Duelo 2 · Herói secreto x A Força Bruta → salvar como `duelo_2.jpg`

Anexos:
1. `referencias/cenarios/cenario_sala_escura_v1.jpg`
2. `referencias/viloes/forca_bruta_folha_modelo_v1.jpg`

```
Crie uma ilustração 2D flat, contorno limpo, cores chapadas e sombreamento simples, no mesmo estilo dos anexos. Formato paisagem 4:3.

Cenário: a sala escura da imagem 1. Mantenha o mesmo cenário, sem texto, placas ou logotipos.

Personagens, um de frente para o outro, em posição de luta, como o pôster de um duelo:
- À esquerda: a Força Bruta (imagem 2), gigante feito de blocos de teclas de teclado, olhos vermelhos brilhando. Ele avança com o punho de teclas erguido, pronto para esmurrar, com pequenas teclas soltando do braço pelo impacto. Mantenha o visual exatamente como na folha de modelo.
- À direita: um herói ainda secreto, mostrado só como silhueta escura recortada contra uma luz azul-esverdeada atrás dele (contraluz forte, sem nenhum detalhe de rosto ou roupa). Postura firme de defesa, corpo de lado, segurando à frente uma grande chave antiga, como uma espada.

Os dois de corpo inteiro, cada um ocupando cerca de 40% da largura, com espaço vazio no centro entre eles. Luz vermelha vindo dos olhos da Força Bruta e luz azul-esverdeada atrás do herói. Sem texto, sem letras, sem logotipos, sem marca d'água.
```

### Duelo 3 · Herói secreto x O Vazamento → salvar como `duelo_3.jpg`

Anexos:
1. `referencias/cenarios/cenario_central_v1.jpg`
2. `referencias/viloes/vazamento_folha_modelo_v1.jpg`

```
Crie uma ilustração 2D flat, contorno limpo, cores chapadas e sombreamento simples, no mesmo estilo dos anexos. Formato paisagem 4:3.

Cenário: a central da imagem 1. Mantenha o mesmo cenário, sem texto, placas ou logotipos.

Personagens, um de frente para o outro, em posição de luta, como o pôster de um duelo:
- À esquerda: o Vazamento (imagem 2), vilão que escorre como líquido, com folhas de papel e planilhas pingando do corpo. Ele avança se esticando, com um braço líquido lançando uma onda de folhas soltas na direção do herói. Mantenha o visual exatamente como na folha de modelo.
- À direita: um herói ainda secreto, mostrado só como silhueta escura recortada contra uma luz azul-esverdeada atrás dele (contraluz forte, sem nenhum detalhe de rosto ou roupa). Postura firme de defesa, corpo de lado, erguendo um escudo redondo que segura a onda de folhas.

Os dois de corpo inteiro, cada um ocupando cerca de 40% da largura, com espaço vazio no centro entre eles. Sem texto, sem letras, sem logotipos, sem marca d'água (as folhas de papel não podem ter nada escrito).
```

### Duelo 4 · Heróis secretos x O Camaleão → salvar como `duelo_4.jpg`

Anexos:
1. `referencias/cenarios/cenario_escritorio_v1.jpg`
2. `referencias/viloes/camaleao_folha_modelo_v1.jpg`

```
Crie uma ilustração 2D flat, contorno limpo, cores chapadas e sombreamento simples, no mesmo estilo dos anexos. Formato paisagem 4:3.

Cenário: o escritório da imagem 1. Mantenha o mesmo cenário, sem texto, placas ou logotipos.

Personagens, de frente uns para os outros, em posição de luta, como o pôster de um duelo:
- À esquerda: o Camaleão (imagem 2), vilão de terno, olhos amarelos, língua comprida e cauda enrolada, segurando a maleta de disfarces aberta. Ele está numa pose ardilosa, meio agachado, com uma máscara sorridente na mão, pronto para trocar de rosto. Mantenha o visual exatamente como na folha de modelo.
- À direita: dois heróis ainda secretos, lado a lado, mostrados só como silhuetas escuras recortadas contra uma luz azul-esverdeada atrás deles (contraluz forte, sem nenhum detalhe de rosto ou roupa). Um aponta um radar de mão para o vilão; o outro ergue a mão espalmada, em sinal de "pare".

Todos de corpo inteiro, o vilão ocupando cerca de 40% da largura e a dupla os outros 40%, com espaço vazio no centro. Sem texto, sem letras, sem logotipos, sem marca d'água.
```
