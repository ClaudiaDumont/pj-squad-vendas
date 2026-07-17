# Especificação UX/UI — VIP Pampulha 2026

> @teo-ux · Situação: `espaco-vip` · Template: template-3-espaco-vip
> Design System: `pj-designsystem/design-system-teo` (fonte de verdade — só composição, zero invenção)
> **Rascunho gerado por IA — requer revisão e aprovação humana.**

## Direção visual da campanha

- **Tema:** dark nativo do DS (`:root`) — noite de véspera de prova, premium.
- **Cor de ação:** laranja Teo (`--color-brand`) — inalterado, é a identidade.
- **Acento da campanha:** `--energy-lime` reservado EXCLUSIVAMENTE ao universo "membro fundador" (uso canônico do token: *founder/exclusive highlight*) — cria a variação desta campanha sem tocar na marca.
- **Tipografia:** invariante (`--font-display` Lato black italic para títulos, `--font-body` para corpo).
- O que varia vs. outras campanhas: acento lime de fundador, hero de evento com data em destaque, cards de acesso em 3 colunas. O que não varia: logo, tipografia, espaçamentos, navegação, tokens.

## Estrutura de seções (ordem + componente DS + justificativa)

| # | Seção (copy-lp.md) | Componentes DS | Justificativa |
|---|--------------------|----------------|---------------|
| 0 | Navegação | `.nav` + `.nav-pill` + `.nav-cta` | Âncoras: Estrutura · Acessos · Local · FAQ; CTA persistente |
| 1 | **Hero** | `.hero` + `.hero-grid` + `.eyebrow` + `.display` + `.hero-actions` (`.btn.btn-primary`) + `.tag` | Eyebrow "VOLTA DA PAMPULHA 2026 — 06/12"; headline G3; tag "Apenas 400 vagas" (G1). Emocional primeiro: é campanha de pertencimento |
| 2 | **Texto principal** | `.manifesto` | Narrativa antes/durante/depois — o manifesto é o organismo feito para texto longo emocional |
| 3 | **Estrutura oferecida** | `.pillars` > `.pillar` ×7 | 1 pillar por item real do briefing (G4). Aviso 18+ como `.foot-note` dentro do pillar de bebidas |
| 4 | **Tipos de acesso** | `.models` + `.model-grid` + `.model-card` ×3 + `.model-price` + `.price-tag` | Corredor / Acompanhante / Fundador. Card de fundador com `--lime-tint` + `--lime-tint-border` (acento canônico) |
| 5 | **Localização e horários** | `.sec-head` + `.addr-block` | Mapa e endereço [PENDENTE]; horário [PENDENTE] — placeholders visíveis no rascunho, NUNCA no ar |
| 6 | **Vagas + urgência** | `.urgency` + `.strip`/`.strip-track` | Somente G1 (400 vagas) e G2 (04/12 23:59). Countdown ATIVADO — lastro: data real de encerramento |
| 7 | **Reserva/checkout** | `.reserve-shell` + `.form-side` + `.summary-side` + `.founder-block` + `.quantity-stepper` + `.cart` | `founder-block` é o componente nativo para o cupom de fundador; stepper para quantidade de acompanhantes |
| 8 | **Termos específicos** | `.sec-head` + lista tipográfica padrão | Em seção própria legível — nunca escondidos em rodapé ilegível (anti-pattern) |
| 9 | **FAQ** | `.sec-head` + pares pergunta (`--fw-bold`)/resposta | Decisão (2026-07-14, delegada pelo funcionário ao @teo-ux): FAQ em **lista aberta tipográfica** — o DS não tem componente accordion, e a regra de ouro do DS proíbe improvisar componente novo sem necessidade documentada. Mantém consistência com o resto do sistema; evolução para accordion fica como proposta futura, não decisão desta campanha |
| 10 | **CTA final + Footer** | `.btn.btn-primary` + `.foot-logo`/`.foot-meta`/`.foot-note` | Fechamento com repetição do CTA vencedor |
| — | **CTA mobile fixo** | `.m-cta` | Sticky no celular — conversão sempre a um toque |

**Estados obrigatórios (Etapa 5):** página ativa · carrinho/checkout · **esgotado** (`.urgency` com mensagem de esgotado da copy) · **vendas encerradas** (usa mensagem própria da copy). Os 4 já têm copy escrita.

## Comportamento por viewport

- **Desktop (≥1024):** hero em `.hero-grid` 2 colunas (texto + mídia); `.model-grid` 3 colunas; reserve-shell com form + summary lado a lado.
- **Tablet (768–1023):** hero empilhado com mídia abaixo; model-grid 2+1; summary abaixo do form.
- **Celular (<768):** tudo em coluna única; `.m-cta` fixo ativo; strip de urgência compacta; pillars em 1 coluna com ícones à esquerda.

## Acessibilidade (gate próprio — *validar-a11y*)

1. Contraste garantido por tokens do DS (pares já validados AA, inclusive `--text-on-brand` sobre laranja).
2. **Hero com foto:** texto NUNCA direto sobre imagem — overlay escuro (`--surface-glass`) ou texto fora da mídia. Reprovo hero sem isso.
3. Toda imagem com `alt` descritivo — inclusive as dos cards de acesso.
4. Countdown com equivalente textual ("Vendas até 04/12 às 23:59") para leitores de tela.
5. Foco visível (`--focus-ring`) em CTA, cupom e stepper; `reduced-motion` já coberto pelo `base.css`.

## Materiais visuais

**Links de Instagram do briefing (3):** serviram como referência de direção. **Fotos originais recebidas em 2026-07-14, aprovadas pelo funcionário para uso na campanha:**

1. `assets/comunidade-teo-pos-prova.jpeg` — comunidade Teo reunida em ambiente arborizado, camisas laranja, tenda laranja ao fundo. **Uso: HERO** (seção 1) — foto horizontal, transmite comunidade e pertencimento (lastro direto do G3). Requer overlay escuro (`--surface-glass`) atrás do texto do hero para garantir contraste — a cena tem áreas claras.
2. `assets/celebracao-equipe-teo.png` — equipe celebrando com medalhas e bolo comemorativo, painel "#FaçaParteDessaHistória". **Uso: seção "Estrutura oferecida" ou "Benefícios"** (seção 3/4) — reforça G3 (celebração de fim de ano) e G4 (comunidade), formato mais vertical/quadrado, funciona como imagem de apoio, não hero.

Funcionário confirmou seguir apenas com estas duas por enquanto — sem fotos adicionais de estrutura (recovery, alimentação, guarda-volumes) nem imagem OG dedicada neste momento.

**Bridge nano-banana-generator:** segue vetado para gerar imagens retratando o espaço VIP, a estrutura ou o clube (risco de veto do workflow — espaço gerado não seria o real). Com hero e imagem de apoio resolvidos por fotos reais, não há necessidade de acionar o bridge nesta rodada. Se a página exigir uma imagem social/OG (1200×630) e nenhum original for enviado depois, a decisão de usar arte abstrata gerada por IA (sem retratar o espaço) fica para a revisão humana.

## Pendências UX (consolidar na proposta §11)

Nenhuma pendência aberta nesta frente — decisão do FAQ resolvida em 2026-07-14 (ver tabela de seções acima).
