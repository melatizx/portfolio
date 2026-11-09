# Relatório de compliance — redesign do front-end (v2)

**Modo:** exhaustivo. **Spec:** briefing mais recente do usuário (seções "NÃO ALTERAR OS DADOS", 1–13, 16, 24, 27, 28), que substitui o anterior.
**Método:** o redesign foi feito antes; esta auditoria é uma passada separada, sem alterar nada.

## Resumo
22 requisitos verificados: 20 implementados, 2 parciais (Low, ambos pré-existentes e fora do escopo permitido). Nenhum Critical/High.

## Matriz
| ID | Requisito | Resultado | Conf. | Evidência | Sev. |
|---|---|---|---|---|---|
| R01 | Backend/models/controllers/repos/DB intocados | implemented | 0.95 | Só `index.html`, `css/style.css`, `js/nav.js` mudaram; `js/infra.js` é novo; nenhum `.java`/`pom`/`properties` tocado | — |
| R02 | `api.js` (endpoints/fetch) intocado | implemented | 0.99 | md5 idêntico (929c707d…) | — |
| R03 | `main.js` (renderização) intocado | implemented | 0.99 | md5 idêntico (25963372…) | — |
| R04 | IDs usados pelo JS presentes no HTML | implemented | 0.97 | 16/16 `getElementById` conferidos | — |
| R05 | Classes emitidas pelo JS estilizadas | implemented | 0.9 | 24/24 com regra em `style.css` | — |
| R06 | Sem dados hardcoded no HTML | implemented | 0.95 | `grep` sem e-mail/URL; containers só "Carregando..." | — |
| R07 | Footer sem dados estáticos | implemented | 0.9 | Footer agora só `© <ano>` + "Topo ↑" | — |
| R08 | Remover totalmente a imagem de servidores | implemented | 0.95 | `grep hero-servers` em html/css/js: 0; nenhuma requisição a `.png` além do logo, nos 6 viewports | — |
| R09 | Sem outra imagem/foto/ilustração externa no fundo | implemented | 0.95 | Infra 100% DOM+CSS gerada em `infra.js` | — |
| R10 | Camada global `fixed; inset:0; z-index:0; pointer-events:none` | implemented | 0.97 | `.infrastructure-background`; teste: `pe=none`, z=0/1/10 (infra/main/navbar) | — |
| R11 | Nunca bloqueia cliques/seleção | implemented | 0.9 | `elementFromPoint` no centro retorna conteúdo; `user-select:none` só na camada | — |
| R12 | Racks, LEDs, linhas, pulsos de dados | implemented | 0.9 | `.rack`, `.led`, `.bus`, `.pulse`; screenshots 1440/768/390 | — |
| R13 | LEDs discretos, fases/intervalos distintos, nunca sincronizados | implemented | 0.9 | `--dur` 5–15s e `--delay` negativo aleatório por LED (PRNG fixo); sem neon | — |
| R14 | Pulsos lentos, um por linha, sem partículas aleatórias | implemented | 0.9 | ciclo 26–46s, ~28% ativo; 2–3 simultâneos no desktop | — |
| R15 | Profundidade (far/mid/near) | implemented | 0.9 | 3 camadas com bordas, brilho e tamanho de LED/pulso distintos | — |
| R16 | Composição por viewport, não imagem escalada | implemented | 0.95 | desktop 17 racks/117 elementos; tablet 10/58; mobile 5/27; rebuild ao mudar de perfil (testado 1440→390) | — |
| R17 | Parallax sutil, 1 listener, rAF, sem JS pesado | implemented | 0.9 | 1 `scroll` listener em `infra.js`; rAF só enquanto assenta (lerp 0.1); deslocamento saturado (tanh) ≤ ~110px, só `transform` | — |
| R18 | Hero com infra mais visível, mais discreta nas outras seções | implemented | 0.9 | opacidade do stage 1 → 0.4 em ~0.9 viewport | — |
| R19 | Sem canvas/libs; sem `setInterval` | implemented | 0.97 | `grep` em infra.js/nav.js: vazio | — |
| R20 | `prefers-reduced-motion`: composição estática | implemented | 0.95 | teste: pulsos `display:none`, LEDs sem animação, transform `none`, racks presentes; também reage a mudança em runtime | — |
| R21 | Sem overflow horizontal (1920/1440/1024/768/480/390) | implemented | 0.95 | `scrollWidth == clientWidth` nos 6 | — |
| R22 | Hero centralizado, sem imagem, dados via API | partial | 0.85 | `#heroName`/`#heroTagline` vazios. O cargo digitado (`ROLES`) já está hardcoded em `main.js:29` e foi preservado | Low |
| R23 | Paleta preta, sem neon/azul forte | partial | 0.85 | Paleta conforme o pedido; um único acento `#b9dcc9` (verde quase branco) em ~18% dos LEDs e no ponto do hero. `<title>` mantém o nome (pré-existente) | Low |
| R24 | Arquitetura separada: api / main / nav / infra | implemented | 0.97 | `infra.js` não referencia API nem dados | — |

## Comportamento não documentado
- Logo da navbar apontava para `icons/melati-logo.png` (inexistente); agora `icons-img/melati-logo.png`.
- `Escape` fecha o menu mobile; `aria-hidden`/`aria-label` atualizados.
- `white-space: pre-line` na descrição da experiência (preserva quebras do banco).
- `infra.js` pausa animações CSS com a aba oculta.
- O arquivo `icons-img/hero-servers.png` **continua no disco**, sem nenhuma referência. Apague-o se quiser removê-lo do repositório.

## Ambiguidades
- "Subtítulo pequeno": não foi adicionado texto novo (seria conteúdo inventado); vale a tagline vinda da API.
- "Let's build something." é o texto de exemplo do pedido anterior, usado como título decorativo.
- Projetos não têm imagem na API; o bloco usa composição abstrata em CSS.

## Log de buscas
Diff da pasta static vs original; md5 de main.js/api.js; `getElementById` em main.js/nav.js/infra.js; classes de template strings em main.js; `grep` de `hero-servers|hero__visual` (vazio); `grep` de `setInterval|canvas` (vazio); `grep` de `fetch|/api/` em infra.js/nav.js (só comentário); requisições de rede por viewport; `elementFromPoint`; contagem de elementos; A/B de performance (completo 56,7 fps; sem infra 60,3; sem animações CSS 57,0; renderizador por software).

## Limites da verificação
Backend Spring não foi executado (sem banco); testei contra mock com a forma dos DTOs. Google Fonts não carregou no sandbox (fallback system-ui). FPS medido em renderizador por software, onde o custo real em GPU tende a ser menor. Confirme no seu navegador.

## Recomendações
- Código: mover `ROLES` e o nome do `<title>` para o perfil da API (exige mexer em JS de dados, fora do escopo).
- Spec: decidir se `<title>` e o texto de contato podem ser estáticos.
