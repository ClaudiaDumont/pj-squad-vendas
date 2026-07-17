# RUN-LOG — Pipeline vip-pampulha-2026

> Consolidação de handoffs (regra `.claude/rules/handoff-consolidation.md`).
> Handoff ativo mais recente permanece individual em `.aiox/handoffs/`.
> Originais arquivados em `.aiox/handoffs/_archive/vip-pampulha-2026/`.

**Contexto estratégico:** venda de 400 acessos ao Espaço VIP da Teo Esportes na
Volta da Pampulha 2026 (06/12/2026, Clube CEU da UFMG), R$ 120,00 por pessoa,
cortesia para fundadores via cupom. Workflow `wf-criar-campanha` (8 etapas),
publicação condicionada a revisão humana (Etapa 4) e QA (Etapa 6).

## Wave 1: Triagem — 2026-07-14

**Status:** ✅ DONE · **Agente:** @teo-triagem

### Entregue
- Classificação: `espaco-vip` (regra R05, confiança ALTA), confirmada pelo funcionário
- Respostas: q1=acesso_em_prova, q2=pago, q4=limitado_simples
- Modificadores: requer_checkout, requer_pix (M04), requer_limite_vagas (M03)
- Resolvidos: template-3-espaco-vip, prompts/espaco-vip.yaml, copy-espaco-vip-tmpl.md

### Decisões
- Classificação confirmada por humano registrada (quem: funcionário da sessão)

### Original
Arquivado: `_archive/vip-pampulha-2026/handoff-teo-triagem-to-teo-pm-20260714.yaml`

## Wave 2: Briefing — 2026-07-14

**Status:** ✅ DONE · **Agente:** @teo-pm

### Entregue
- `briefing.md` com veredito **COMPLETO** (todos os campos_obrigatorios preenchidos)
- 9 critérios de aceite definidos (bloco 13)

### Decisões
- Cortesia de fundador via cupom/código exclusivo no checkout
- Sem limite de acompanhantes por comprador (até esgotar 400 vagas)
- Reembolso integral até 29/11/2026; depois sem reembolso
- Encerramento: 04/12/2026 23:59 (Brasília); formulário mínimo sem CPF

### Carry-forward
- Pendências não bloqueantes (donos: Assessoria): retirada de pulseira, horário do espaço, regra crianças, hora de abertura das vendas, expiração Pix (30 min proposto), ponto focal

### Original
Arquivado: `_archive/vip-pampulha-2026/handoff-teo-pm-to-teo-estrategista-20260714.yaml`

## Wave 3: Estratégia — 2026-07-14

**Status:** ✅ DONE · **Agente:** @teo-estrategista

### Entregue
- `proposta.md` seções 1-5, 8, 9, 11 (posicionamento, proposta de valor, estrutura da LP)
- 5 gatilhos aprovados com lastro (G1 escassez 400 vagas; G2 prazo 04/12; G3 simbolismo fim de ano; G4 estrutura 7 itens; G5 cortesia fundador)
- Gatilhos vetados: distância da largada, "esgota em horas", "melhor vista", promessa clínica de recovery, "open bar"

### Decisões
- Hierarquia da LP: emocional → estrutura → preço/cupom → termos/FAQ
- Riscos registrados: percepção open bar, cortesias consomem estoque, compra em bloco, estacionamento limitado

### Original
Arquivado: `_archive/vip-pampulha-2026/handoff-teo-estrategista-to-teo-copywriter-20260714.yaml`

## Wave 4: Copy — 2026-07-14

**Status:** ✅ DONE · **Agente:** @teo-copywriter

### Entregue
- `copy-lp.md` (todas as seções do template, incl. estados esgotado/encerrado, 3 CTAs)
- `faq.md` (12 perguntas, 6 com [PENDENTE])
- `mensagens.md` (6 transacionais, versões e-mail + WhatsApp/tela)
- `proposta.md` seções 6 e 10 preenchidas

### Carry-forward
- Novas pendências de copy: distância da prova ("18 km" a confirmar), endereço/mapa, canal pós-esgotamento, CTA pós-prova

### Original
Arquivado: `_archive/vip-pampulha-2026/handoff-teo-copywriter-to-teo-ux-20260714.yaml`

## Wave 5: UX — 2026-07-14

**Status:** ✅ DONE · **Agente:** @teo-ux

### Entregue
- `ux-spec.md`: 11 seções mapeadas a componentes reais do DS Teo; acento lime exclusivo de fundador; countdown ativado (lastro G2); 3 viewports; gate a11y (overlay obrigatório no hero, alt-text, equivalente textual do countdown)
- `proposta.md` §5 e §11 atualizados

### Decisões
- Instagram = referência, não asset: originais + direito de uso solicitados
- Imagem IA vetada para retratar o espaço real (risco de veto do workflow); permitida só arte abstrata de fundo, com decisão humana
- FAQ em lista aberta (DS não tem accordion — sem improviso de componente)

### Handoff ativo
`.aiox/handoffs/handoff-teo-ux-to-teo-ecommerce-20260714.yaml`

## Wave 6: Configuração e-commerce — 2026-07-14

**Status:** ✅ DONE · **Agente:** @teo-ecommerce

### Entregue
- `proposta.md` §7: configuração auditável do modelo `acesso` (pool único de 400 vagas transacional, 3 tipos de acesso, cupom fundador uso único, Pix 30min proposto, encerramento automático por data ou esgotamento, formulário mínimo sem CPF)
- 6 cenários simulados para o plano de teste do @teo-qa (esgotamento, Pix expirado, cupom inválido, débito atômico, webhook tardio, corrida nas últimas vagas)

### Decisões
- Preço e total SEMPRE do servidor (briefing §13); cortesia só via cupom válido, nunca preço zero direto
- Vaga fica reservada durante a janela do Pix e volta ao pool ao expirar

### Carry-forward
- Pendências 14-15 (lista de fundadores/códigos; cota estimada de cortesias — receita máx. R$ 48.000 com zero cortesias)

**ETAPA 3 CONCLUÍDA — proposta completa. Próximo: Etapa 4 (revisão humana, gate inegociável).**

## Wave 7: Revisão humana (rodada 1) — 2026-07-14

**Status:** 🔄 PARTIAL · **Agente:** @teo-triagem (orquestração) · **Revisor:** funcionário da sessão

### Delivered
- 6 pendências resolvidas via respostas do funcionário: regime de consumo (à vontade),
  cortesias de fundador (pool separado, NÃO consomem as 400 vagas), retirada de
  pulseira (antecipada), horário do espaço (05:00–11:30), endereço completo
  (Av. Alfredo Camarate, 617, São Luiz, BH/MG) + distância confirmada (18 km),
  2 fotos originais recebidas e salvas em `assets/`
- Todos os artefatos atualizados: briefing.md, proposta.md, copy-lp.md, faq.md,
  mensagens.md, ux-spec.md — termo "open bar" removido da lista de vetados/riscos,
  substituído por "à vontade"

### Carry-forward (pendências abertas — 11 no total, ver proposta §11)
- Local/período da retirada da pulseira
- Regra para crianças
- Hora de abertura das vendas em 15/11
- Confirmação da expiração do Pix (30 min)
- Ponto focal responsável
- Canal de aviso pós-esgotamento / CTA pós-prova
- Fotos de apoio da estrutura + imagem OG + direito de uso das 2 fotos recebidas
- Decisão FAQ (lista aberta vs. accordion)
- Lista de fundadores + códigos de cortesia
- Capacidade física do espaço (400 pagantes + N cortesias)

## Wave 8: Revisão humana (rodada 2) — 2026-07-14

**Status:** 🔄 PARTIAL · **Agente:** @teo-triagem (orquestração) · **Revisor:** funcionário da sessão

### Delivered
- 4 pendências resolvidas: retirada de pulseira (26/11–05/12/2026, Espaço Teo
  Esportes), crianças até 5 anos não pagam, lista de fundadores via Supabase
  (nova dependência técnica para a Fase 2), fotos aprovadas para uso (as 2
  já recebidas — sem material adicional por ora)
- Todos os artefatos atualizados: briefing.md, proposta.md (§3, 6, 7, 8, 10, 11),
  copy-lp.md, faq.md, mensagens.md, ux-spec.md

### Decisions
- Fonte de dados de fundadores = Supabase → nova dependência técnica registrada
  para @teo-fullstack + @teo-data-engineer na Fase 2 (não bloqueia a Etapa 4,
  mas deve entrar no planejamento de implementação)
- Crianças até 5 anos contam como acompanhante para acesso/pulseira, sem
  debitar vaga paga

### Blockers Resolved
- Nenhum blocker formal — pendências eram informativas, não vetos

### Carry-forward to next wave
1. Hora de abertura das vendas em 15/11
2. Confirmação da expiração do Pix (30 min proposto)
3. Ponto focal nomeado como responsável
4. Canal de aviso pós-esgotamento / CTA da mensagem pós-prova
5. Procedimento para quem comprar e não retirar a pulseira até 05/12 (novo —
   identificado ao atualizar a mensagem de véspera)
6. Decisão FAQ: lista aberta vs. accordion (evolução do DS)
7. Capacidade física do espaço: 400 pagantes + N cortesias + crianças isentas

## Wave 9: Revisão humana (rodada 3) — 2026-07-14

**Status:** ✅ DONE (conteúdo) · **Agente:** @teo-triagem (orquestração) · **Revisor:** funcionário da sessão

### Delivered
- 7 pendências resolvidas: abertura das vendas (15/11 00:00), expiração do Pix
  (2 min), ponto focal (Thiago Aguiar e Teo), retirada sem opção no dia (regra
  definitiva), capacidade física do espaço (confirmada)
- 2 decisões delegadas ao squad, resolvidas sem inventar fora do briefing:
  canal de aviso/CTA pós-prova → WhatsApp (canal já existente no funil, sem
  canal novo); FAQ → lista aberta (padrão do DS, sem criar componente novo)
- Todos os artefatos atualizados: briefing.md, proposta.md (§1, 3, 7, 8, 9, 10, 11),
  copy-lp.md, faq.md, mensagens.md, ux-spec.md

### Decisions
- Pix de 2 minutos registrado como risco R5 (janela curta vs. padrão de
  mercado) — sinalizado para confirmação explícita na aprovação, não bloqueia
- Retirada obrigatória sem opção no dia registrada como risco R6 (compradores
  de última hora podem ficar sem acesso) — mitigado via clareza na copy/e-mail

### Carry-forward to next wave
- Única pendência real remanescente: modelagem da tabela de fundadores no
  Supabase + integração com o cupom de cortesia (dependência técnica de Fase 2,
  dono @teo-fullstack + @teo-data-engineer — não bloqueia a Etapa 4)
- Fotos de apoio adicionais (estrutura) seguem opcionais — funcionário
  autorizou publicar só com as 2 fotos atuais

### Handoff ativo
Conteúdo da proposta está pronto para aprovação formal — restam apenas os
riscos R5 (Pix 2min) e R6 (retirada sem opção no dia) para confirmação
explícita do aprovador antes de assinar o checklist "Aprovação" no rodapé de
`proposta.md`.

## Wave 10: Aprovação humana registrada — 2026-07-14

**Status:** ✅ DONE · **Agente:** @teo-triagem (orquestração) · **Aprovador:** Claudia Dumont

### Delivered
- Riscos R5 (Pix 2min) e R6 (retirada sem opção no dia) confirmados
  explicitamente pelo aprovador como intencionais
- Checklist "Aprovação" (rodapé de `proposta.md`) assinado: copy, preços/datas,
  estrutura e pendências bloqueantes todas marcadas ✅
- **ETAPA 4 CONCLUÍDA — GATE INEGOCIÁVEL CUMPRIDO**

### Next
Etapa 5 (Preview): @teo-ux + @teo-qa geram previews em 3 viewports e simulam
os 4 estados (ativa, checkout, esgotado, vendas encerradas). Pendência técnica
de Fase 2 (Supabase de fundadores) segue registrada para @teo-fullstack +
@teo-data-engineer, sem bloquear o preview.

## Wave 11: Preview (Etapa 5) — 2026-07-14

**Status:** ✅ DONE (spec) · **Agentes:** @teo-ux + @teo-qa

### Entregue
- `preview-spec.md` (@teo-ux): os 4 estados (ativa, checkout, esgotado, vendas
  encerradas) mapeados a componentes reais, comportamento nos 3 viewports,
  checklist a11y executado — 5 itens PASS, 2 itens marcados para verificação
  na implementação (navegação por teclado no checkout; anúncio aria-live da
  expiração do Pix de 2min, dado o prazo excepcionalmente curto)
- `plano-testes-qa.md` (@teo-qa): 22 cenários de teste específicos desta
  campanha, mapeados às 6 seções do checklist oficial de publicação

### Decisões
- Estado ESGOTADO precisa deixar claro que cortesias de fundador continuam
  ativas mesmo com as 400 vagas pagas esgotadas (pool separado) — ponto fácil
  de esquecer na implementação, documentado explicitamente
- Timer do Pix (2 min) precisa de destaque máximo na UI mobile e anúncio
  para leitor de tela — decorrência direta do risco R5 já aprovado

### Blocker identificado (não bloqueia a spec, bloqueia a Etapa 6)
- Teste #12 do plano de QA (cupom de fundador) não pode ser executado sem a
  modelagem da tabela de fundadores no Supabase (Fase 2, @teo-fullstack +
  @teo-data-engineer) — checklist de publicação não pode dar PASS sem isso

### Next
Etapa 6 (Publicação): requer a implementação real (Fase 2) existir para que
@teo-qa execute `checklists/checklist-publicacao.md` com evidências. Até lá,
o pipeline de conteúdo/design está com todos os artefatos aprovados e prontos.

## Wave 12: Fase 2 iniciada — Análise + Modelagem (@teo-fullstack) — 2026-07-14

**Status:** ✅ DONE (análise e modelagem) · **Agente:** @teo-fullstack
**Projeto:** pj-landing-vendas (fora deste repositório de squad)

### Entregue
- `pj-landing-vendas/docs/ANALISE-PROJETO-ATUAL.md`: análise obrigatória
  antes de código (gate do próprio agente). Descoberta-chave: a plataforma
  não tem arquitetura de "campanhas" genérica — foi construída só para a
  venda de camisas. `orders.delivery_mode` é enum fechado sem valor para
  "acesso presencial"; catálogo é hardcoded em TS; só há integração Pix
  (Efí), sem cartão.
- `pj-landing-vendas/docs/MODELO-DE-DADOS-espaco-vip.md`: 7 migrations
  propostas, todas ADITIVAS — nova tabela `campaigns`, coluna
  `orders.campaign_id`, novo valor `presencial` no enum `delivery_mode`,
  novo membro `kind: "acesso"` na union `OrderItem`, nova tabela
  `founder_campaign_benefits` (reaproveita `founders`, benefício por
  campanha), nova RPC `create_founder_campaign_order` (clona o padrão
  atômico já existente, sem alterar a RPC original da camisa), tabela
  `campaign_stock` (contador transacional das 400 vagas, cortesias não
  tocam este contador — implementa a regra de pool separado).

### Decisions (confirmadas pelo responsável em 2026-07-14)
- **Pagamento:** lançamento somente com Pix — cartão exigiria nova
  integração de gateway; fica para fase futura. **Propagado de volta** para
  proposta.md, briefing.md, faq.md, plano-testes-qa.md, preview-spec.md
  (todas as menções a "cartão" corrigidas nesta wave).
- **Fundadores:** reaproveitar a tabela `founders` existente; benefício de
  cortesia passa a ser por campanha (nova tabela
  `founder_campaign_benefits`), não altera a lógica da campanha da camisa.
- **Elegibilidade:** TODOS os fundadores cadastrados são elegíveis no VIP,
  sem lista/seed adicional.

### Impacto na campanha da camisa (produção)
Zero regressão — todas as 7 migrations são aditivas; a RPC
`create_free_founder_order` original não é alterada; `OrderItem` mantém os
membros `single`/`combo` intocados.

### Carry-forward
- Migrations ainda não escritas como arquivos `.sql` reais (próximo passo:
  `*implementar {story}`, começando pela fundação — migrations 1-2-3 —
  seguida de rodar a suíte de testes existente antes de avançar).
- Bloqueio já conhecido (Wave 11): teste de cupom de fundador não pode ser
  concluído no checklist de publicação até a tabela
  `founder_campaign_benefits` e a RPC estarem implementadas de fato.

### Next
Implementação incremental das migrations (Fase 2), depois componentes de UI
específicos do VIP (seletor de tipo de acesso, stepper de acompanhantes,
founder-block), depois a Etapa 6 (checklist de publicação) pode rodar com
evidências reais.

## Wave 13: Implementação — fundação de backend (@teo-fullstack) — 2026-07-14

**Status:** 🔄 PARTIAL · **Agente:** @teo-fullstack
**Projeto:** pj-landing-vendas

### Entregue
- **7 migrations SQL escritas** (`supabase/migrations/202607142*`), cada uma
  com par de rollback — NÃO aplicadas no banco ainda (Supabase CLI
  indisponível neste ambiente; decisão confirmada: deixar arquivos prontos
  para aplicação por @devops/responsável quando o ambiente estiver disponível).
- **Módulos de aplicação isolados** (`lib/vip/`): types, pricing, stock
  (wrapper das RPCs de reserva/liberação/confirmação), founder-benefit
  (cortesia por campanha), validation (Zod), create-order (orquestração
  completa do pedido — reserva de vagas, Pix de 120s, RPC de cortesia).
- **Webhook da camisa estendido sem regressão**: `process-webhook.ts` ganhou
  roteamento por campanha (`isCamisaOrder` + hook `onPaidCampaign`) — os 188
  testes originais continuam 100% verdes.
- **24 novos testes unitários** cobrindo pricing (regra "cortesia não
  debita o pool de 400"), estoque transacional e benefício de fundador.
  Suíte total: 212 testes / 31 arquivos, 100% verde. `tsc --noEmit` limpo.

### Decisão de arquitetura corrigida durante a implementação
Ao inspecionar o código real, descobri que a proposta original de modelagem
(estender a union `OrderItem` da camisa com `kind: "acesso"`) arriscava
quebra silenciosa em 22 arquivos consumidores (`PRICE[item.kind]` undefined
para o novo caso, sem erro de compilação). **Corrigido para tipo isolado por
campanha** (`AccessOrderItem`, módulo próprio `lib/vip/`, zero import
cruzado com `lib/pricing.ts`/`config/catalog.ts`) — decisão confirmada com
Claudia Dumont antes de codar. Documentado em
`pj-landing-vendas/docs/MODELO-DE-DADOS-espaco-vip.md`.

### Carry-forward (o que falta para a Etapa 6 rodar com evidências reais)
1. Route handler HTTP `app/api/vip/orders/route.ts`
2. Conectar `onPaidCampaign` no route handler do webhook (lógica já pronta
   em `process-webhook.ts`, falta só a "fiação")
3. Componentes de UI (seletor de acesso, stepper de acompanhantes,
   founder-block) e a página da campanha
4. Templates de e-mail transacional (conteúdo já existe em `mensagens.md`)
5. Testes de integração cobrindo os 22 cenários do `plano-testes-qa.md`
6. Aplicar as migrations de fato quando o Supabase CLI estiver disponível

### Next
Continuar a implementação incremental: route handler HTTP primeiro (permite
testar o fluxo ponta a ponta), depois UI, depois e-mails e testes de
integração.

## Nota de arquitetura — Modelagem de fundadores (registrada 2026-07-15)

**Contexto:** decisão de dados confirmada por Claudia Dumont para orientar a
implementação pendente da Fase 2 (tabela `founder_campaign_benefits` +
cupom, ver Wave 12/13) e qualquer campanha futura com benefício de fundador.

**Regra fixada:**
1. A tabela geral de cadastro dos alunos deve ter **1 coluna**
   (`eh_membro_fundador: sim/nao`) — a condição de "ser fundador" é um
   atributo do aluno, não da campanha. Fonte única de verdade.
2. Cada campanha tem sua própria tabela de pedidos/vendas/orders. Essa
   tabela deve conter o flag de **uso do benefício naquela campanha
   específica** (ex.: `usou_beneficio_fundador: sim/nao`), registrado por
   pedido.
3. **Não criar uma tabela de "membro fundador" por campanha.** Ser
   fundador é global (item 1); o consumo do benefício é local a cada
   campanha, dentro da tabela de orders já existente daquela campanha
   (item 2).

Documentado em `proposta.md` §7 (`cupom_fundador.modelagem_dados`).
Dono da implementação: @teo-fullstack + @teo-data-engineer.

## Gap de Design System identificado — Hero full-bleed com card sobreposto (registrado 2026-07-15)

**Contexto:** Claudia Dumont pediu um modelo de hero inspirado em referência
externa (JIANO Furniture) — foto de fundo cobrindo a seção inteira, com um
card translúcido (glass) sobreposto contendo eyebrow, título e CTA. @teo-ux
NÃO implementou esse modelo porque ele **não existe documentado** em
`pj-designsystem/design-system-teo` — o único `.hero` oficial
(`organisms/sections.css:6-24`, exemplo real em `index.html:551-564`) é um
grid de 2 colunas (texto | mídia lateral), sem foto cobrindo a seção.

**Por que não foi implementado sem aprovação:** já ocorreram dois incidentes
nesta mesma campanha causados por inventar estrutura de hero fora do padrão
documentado (foto full-bleed com `min-height` fixo, sem lastro no DS) —
gerou bugs de proporção, tipografia e contraste que precisaram ser revertidos
(ver correção da Wave 11 e handoff seguinte). Regra fixada em
`squads/teo-esportes/agents/teo-ux.md` ("ESTRUTURA > TOKEN ISOLADO",
"BUSCA COMPLETA ANTES DE DECLARAR GAP"): nenhum layout de seção é inventado
sem existir primeiro no DS oficial.

**Especificação técnica da extensão proposta** (para Claudia avaliar e, se
aprovado, adicionar formalmente ao design-system-teo como novo organism ou
variante de `.hero`):

| Elemento | Proposta usando tokens JÁ EXISTENTES |
|---|---|
| Container | `.hero--media` (novo modificador) — `position: relative`, `min-height` fluido (não fixo em px), `overflow: hidden` |
| Foto de fundo | `background-image` com a foto da campanha + overlay em gradiente (mesmo princípio já usado em `--surface-glass`, mas seria preciso um novo token de overlay-sobre-mídia, ex. `--overlay-media: linear-gradient(...)`) |
| Card sobreposto | `background: var(--surface-glass)` + `backdrop-filter: blur(14px)` — reaproveita exatamente o padrão já usado no `header.site` (`organisms/header-footer.css:14-15`), aplicado a um card em vez do header |
| Raio do card | `var(--radius-lg)` ou `var(--radius-xl)` — já existentes |
| Texto no card | `.eyebrow` + `.display` + `.lead` — primitivos já existentes em `tokens/base.css` e `atoms/typography.css`, sem mudança |
| Sombra do card | `var(--shadow-xl)` — já existente |
| Contraste | **Pendência a resolver na documentação:** como o fundo real do card é sempre a foto (não `--bg-app`), a cor do texto dentro do card precisaria de uma regra fixa por tema (mesmo problema já identificado na correção anterior) — sugestão: formalizar um par de tokens tipo `--text-on-media`/`--text-on-media-muted` com valor FIXO (não dependente de tema), para qualquer card/overlay sobre foto deixar de ser decisão ad-hoc por campanha |

**Gaps reais a decidir e formalizar no DS** (não implementados até aprovação):
1. Não existe hoje um organism/modificador de hero "full-bleed com card sobreposto" — só o grid de 2 colunas.
2. Não existe um token de overlay padrão para foto de fundo (gradiente escuro consistente entre campanhas).
3. Não existe um par de tokens de texto fixo para "sobre mídia/imagem" (ver tabela acima) — hoje cada campanha resolveria isso de forma diferente, o que é exatamente o tipo de inconsistência que o DS existe para prevenir.

**Next:** aguardando Claudia decidir se formaliza esse padrão no
`design-system-teo` (organism novo + tokens de overlay/texto-sobre-mídia). Só
após essa atualização @teo-ux implementa o novo hero no preview desta
campanha, referenciando os arquivos/linhas oficiais atualizados.

### Resolução — Gap formalizado e implementado (2026-07-15)

**Status:** ✅ DONE. Claudia formalizou os 3 pontos no `design-system-teo`:
- `.hero--media` (organism, `organisms/sections.css:42-85`) — full-bleed + card glass, documentado em `GUIA-DE-USO.md:206-264` e `README.md:129` (seção "Texto sobre imagem/mídia de fundo fixo").
- `--overlay-media` (`tokens.css:72`) — gradiente escuro fixo entre mídia e texto.
- `--text-on-media` / `--text-on-media-muted` (`tokens.css:67-68`) — cor de texto fixa nos dois temas (branco / branco 72%), validada contra o overlay.

`preview.html` desta campanha atualizado para usar o organism oficial:
`<link>` adicionado para `organisms/sections.css`; markup trocado para
`<section class="hero hero--media"><div class="hero-media-bg">...</div>
<div class="hero-media-card">...</div></section>` (estrutura idêntica ao
exemplo de `GUIA-DE-USO.md:222-232`); zero cor/overlay hardcoded — tudo vem
dos tokens novos via `<link>`. `.hero-tags` (elemento específico desta
campanha, fora do organism) mantido local, usando `var(--text-on-media)`.

Regra registrada em `teo-ux.md`: `.hero--media` (full-bleed) e `.hero-grid`
(2 colunas) são os dois modelos oficiais de hero — a escolha depende do
briefing, nunca inventar um terceiro sem reportar gap primeiro.
