# Cenas para gerar no Gemini (Nano Banana)

Cada cena = cenário aprovado + personagem. Anexe, nesta ordem: (1) o cenário, (2) a folha de modelo do personagem, (3) a folha de poses ou de expressões. Arquivos em `referencias/`.

| Nº | Situação | Cenário | Personagem | Ação | Trechos |
| --- | --- | --- | --- | --- | --- |
| 1 | Pronta (`cena01.jpg`) | Escritório | Isca pequeno, pela janela | No telhado vizinho, lançando a vara | 1 |
| 2 | Pronta (`cena02.jpg`) | Escritório | Lupa | Examinando com a lupa erguida | 1 |
| 3 | Pronta (`cena03.jpg`) | Escritório | Lupa | Apontando para o monitor | 3 |
| 4 | A gerar | Escritório | Lupa | Sorriso compreensivo, mão aberta | 2A, 2B |
| 5 | A gerar | Telhado | Isca | Lançando a vara | 1, 8 |
| 6 | A gerar | Telhado | Isca | Puxando a vara, comemorando | 2A |
| 7 | A gerar | Telhado | Isca | Esfregando as mãos, tramando | 2B |
| 8 | A gerar | Telhado | Isca | Caído sentado, tonto, linha cortada | 2C |
| 9 | A gerar | Telhado | Isca | Irritado, trocando a vara por uma rede | 5 |
| 10 | A gerar | Telhado | Isca | Segurando um cartão de crédito gigante | 6A |
| 11 | A gerar | Telhado (janelas acesas) | Isca | Preso na rede | 8 |
| 12 | A gerar | Central (alerta aceso) | Ninguém | Luz vermelha de alerta acesa | 2C |
| 13 | A gerar | Central | Lupa | Braços cruzados, sorrindo | 2C, 7 |
| 14 | A gerar | Central | Lupa | Entregando a insígnia | 8 |
| 15 | A gerar | Celular | Lupa à direita | Fazendo joinha | 5, 6B |
| 16 | A gerar | Central | Lupa | Séria, explicando | 7 |

## Modelo de prompt

```
A imagem 1 é um CENÁRIO aprovado da minha série de animação 2D "Esquadrão Sentinela". As imagens 2 e 3 mostram o personagem oficial (folha de modelo e poses).

Coloque o personagem DENTRO do cenário da imagem 1, criando uma cena de animação.
- NÃO altere o cenário: mesma composição, enquadramento, cores, objetos e iluminação.
- O personagem deve ser IDÊNTICO às imagens 2 e 3: mesmo rosto, cabelo, roupa, cores, acessórios e estilo de traço.
- Escala realista em relação ao ambiente; o personagem fica apoiado no chão, com uma sombra suave.

AÇÃO:
[descrição da cena]

Formato paisagem 16:9. Sem texto, letras, números, logotipos ou marcas d'água.
```

Dica: no escritório não aparece o chão, então a Lupa fica em pé ATRÁS da mesa, com a mesa cobrindo da cintura para baixo.
