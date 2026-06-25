# CLAUDE.md — Conversão KG para SC

## Visão Geral

PWA de calculadora de conversão de quilogramas para sacas de café, com divisão entre patrão e meeiro. Projeto pessoal de Rildo Júnior, voltado para uso no campo.

**URL de produção:** https://rildojunior.github.io/conversionKgToSc/

## Stack

Vanilla HTML + CSS + JavaScript. Sem framework, sem build step, sem dependências de pacotes. Deploy direto via GitHub Pages.

## Estrutura de Arquivos

```
index.html      — estrutura da UI
style.css       — estilos (tema escuro, paleta Espresso/Areia/Terracota/Trigo)
scripts.js      — toda a lógica de cálculo e manipulação de DOM
sw.js           — Service Worker para cache offline (PWA)
manifest.json   — manifesto da PWA
assets/         — ícones PWA e SVGs sociais:
  favicon.svg           — favicon vetorial + logo na tela inicial
  favicon-16.png        — favicon 16×16 (fallback)
  favicon-32.png        — favicon 32×32 (fallback)
  apple-touch-icon.png  — ícone iOS/iPadOS (180×180)
  icon-192.png          — ícone Android/Windows (purpose: any)
  icon-512.png          — ícone Android/Windows (purpose: any)
  icon-maskable-192.png — ícone adaptável Android (purpose: maskable)
  icon-maskable-512.png — ícone adaptável Android (purpose: maskable)
  icon-1024.png         — master para lojas (App Store / Play Store)
  github.svg            — ícone social
  instagram.svg         — ícone social
CNAME           — domínio customizado para GitHub Pages
```

## Lógica de Negócio

### Entradas
- **Peso por saca** (`#oneBag`): peso de uma saca em kg (padrão 60kg). Persiste via `localStorage`.
- **Peso total** (`#weightBag`): peso total da pesagem em kg.

### Saídas (exibidas na tela de resultado)
Todas as saídas são formatadas como `Xsc e Ykg`.

| Seção | % meeiro | Patrão recebe | Meeiro recebe |
|-------|----------|---------------|---------------|
| 20%   | 20%      | 60% do total  | 40% do total  |
| 10%   | 10%      | 55% do total  | 45% do total  |
| Meia  | 50%      | 50% do total  | 50% do total  |

### Fórmula de cálculo (`calculate` em scripts.js)
```js
// Sacas inteiras
percSc = parseInt((weightBag * percentage) / oneBag)
// Kg restante
percKg = parseInt(percSc * oneBag - (weightBag * percentage)) * -1
```

O total geral usa `calculateTotalMaster`, que divide o peso total pelo peso por saca.

## PWA / Service Worker

- Cache name atual: **`kg-para-sc-v6`** (em `sw.js`)
- Para forçar atualização do PWA nos dispositivos dos usuários: incrementar o número no `CACHE_NAME` (ex: `v6` → `v7`).
- Estratégia: cache-first, com fallback para rede.
- Registrado inline no `index.html` via `navigator.serviceWorker.register('/sw.js')`.

## Persistência

O valor do campo "Peso por saca" é salvo em `localStorage` com a chave `oneBag` e restaurado ao carregar a página.

## Fluxo de UI

1. Usuário preenche os dois campos e clica em "CALCULAR".
2. A seção `.result` recebe a classe `active` (exibe overlay com os resultados).
3. Botão "VOLTAR" remove a classe `active` e retorna ao formulário.

## Paleta de Cores

Cores oficiais do projeto (usar sempre estas, sem introduzir novas):

| Nome      | Hex       | Uso principal                        |
|-----------|-----------|--------------------------------------|
| Espresso  | `#261913` | Fundo do app e dos ícones PWA        |
| Areia     | `#EAD6AE` | Labels, fundo do footer, ícone (any) |
| Terracota | `#C1683F` | Botões, destaques, acento do ícone   |
| Trigo     | `#E7C893` | Hover / variação de destaque         |

As variáveis CSS em `style.css` mapeiam diretamente esta paleta:
- `--color-bg: #261913`
- `--color-primary: #C1683F`
- `--color-primary-light: #EAD6AE`

## Convenções

- Idioma: português brasileiro (PT-BR) em toda a UI.
- Não há transpiler ou bundler. Editar os arquivos diretamente.
- Não usar `console.log` em produção.
- Manter o `parseInt` nos cálculos — trunca intencionalmente (não arredonda).
- O logo (`assets/favicon.svg`) é exibido na tela inicial acima do título, via `.app-header > .app-logo`.

## Regras de Commit

Todo commit deve seguir o padrão **Conventional Commits**:

```
<tipo>(escopo opcional): <descrição curta em minúsculas>
```

Tipos permitidos: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`, `perf`, `test`.

Exemplos:
- `feat: adicionar botão de copiar resultado`
- `fix: corrigir cálculo do total`
- `style: ajustar espaçamento do card de resultado`
- `chore: atualizar versão do cache do PWA`

## Regras de Deploy

- **Nunca fazer `git push` sem perguntar ao usuário antes.**
- **Antes de qualquer push**, incrementar o `CACHE_NAME` em `sw.js` (ex: `kg-para-sc-v6` → `kg-para-sc-v7`) para forçar a atualização do PWA nos dispositivos onde o app está instalado.
