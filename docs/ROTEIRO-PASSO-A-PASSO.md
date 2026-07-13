# Roteiro Passo a Passo — Squad Teo Esportes + App de Landing Pages

> **Projeto:** pj-squad-vendas
> **Objetivo:** Criar (1) um squad de IA dedicado à criação de campanhas de vendas e copies para a Teo Esportes e (2) um app onde os funcionários da empresa criam e publicam landing pages de campanha sozinhos, com a triagem inteligente rodando dentro do app.
> **Criado por:** Orion (@aiox-master) — 2026-07-13
> **Status:** 📋 Planejamento aprovado — aguardando briefing

---

## Decisões já tomadas

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| Ponto de entrada | **squad-creator (squad-chief)**, não o @analyst | A avaliação/triagem do briefing já é a fase inicial do fluxo de criação de squad. O @analyst entra depois, na fase do app. |
| Sequência | **Squad primeiro, app depois** | O squad formaliza a lógica de triagem e os frameworks de copy — isso vira o requisito funcional do motor de IA do app. Sem isso, o PRD do app teria um buraco no meio. |
| Estrutura | **Tudo neste projeto (pj-squad-vendas)** | O app consome os artefatos do squad diretamente (`squads/` = inteligência, `packages/` = código do app). Dividir depois é barato; juntar depois é caro. |
| Modo de criação do squad | **YOLO** (pesquisa web automática, fidelidade 60–75%) | Só existe o briefing inicial. Quando houver materiais reais da Teo Esportes, subir a fidelidade com `*update-mind`. |

## Visão geral das fases

```
FASE 0: Preparação
   ├── 0.1 Briefing em docs/briefing-inicial/
   └── 0.2 *environment-bootstrap (git, GitHub, CI/CD)
         ↓
FASE 1: O CÉREBRO — Squad Teo Esportes (squad-creator)
   ├── 1.1 (Opcional) Pesquisa de mercado (@analyst ou squad spy)
   ├── 1.2 *create-squad com squad-chief (modo YOLO)
   ├── 1.3 Aprovação dos elite minds (você decide)
   ├── 1.4 *validate-squad (9 fases de quality gates)
   └── 1.5 Teste prático: gerar 1 campanha real manualmente
         ↓
FASE 2: O PRODUTO — App de Landing Pages (pipeline AIOX greenfield)
   ├── 2.1 @analyst  → Project Brief
   ├── 2.2 @pm       → PRD
   ├── 2.3 @ux-design-expert → Front-end Spec
   ├── 2.4 @architect → Arquitetura Fullstack
   ├── 2.5 @po       → Shard do PRD + validação
   └── 2.6 Ciclo SDC → @sm → @po → @dev → @qa → @devops (por story)
         ↓
FASE 3: Evolução contínua
   ├── 3.1 *update-mind com materiais reais da Teo Esportes
   └── 3.2 Novas situações de venda → novos templates no squad + app
```

**Como as fases se conectam:** o squad da Fase 1 executa triagem e copy *dentro do Claude Code* (você já pode gerar campanhas manualmente com ele). O app da Fase 2 automatiza exatamente esse processo para os funcionários — por baixo, ele chama a API do Claude com os prompts e heurísticas que o squad formalizou. O squad é, na prática, a especificação do motor de IA do app.

---

## FASE 0 — Preparação

### Passo 0.1 — Colocar o briefing no projeto

**Quem:** Você (manual)
**Onde:** `docs/briefing-inicial/`

Copie o documento inicial para a pasta. O briefing deve cobrir **as duas frentes**:

**Frente A — Campanhas/Copy (alimenta a Fase 1):**
- [ ] Quem é a Teo Esportes (segmento, produtos, público, região)
- [ ] **Lista das situações de venda** que exigem copy própria — este é o item mais importante. Exemplos: lançamento de produto, promoção sazonal (volta às aulas, Black Friday), queima de estoque, recuperação de cliente inativo, venda B2B/atacado, datas comemorativas
- [ ] Tom de voz desejado (mesmo que informal: "somos descontraídos", "falamos com atletas amadores" etc.)
- [ ] Canais usados hoje (Instagram, WhatsApp, e-mail, loja física)
- [ ] Concorrentes conhecidos

**Frente B — App (alimenta a Fase 2):**
- [ ] Quem são os funcionários que vão usar (quantos, nível técnico)
- [ ] O que significa "publicar": domínio próprio? subdomínio por campanha? hospedagem existente?
- [ ] Alguma integração desejada (WhatsApp, pixel do Meta, Google Analytics, CRM)
- [ ] Precisa de aprovação de gestor antes de publicar, ou funcionário publica direto?

> ⚠️ Se algum item não existir ainda, não trave: escreva "não definido". Os agentes de elicitação (@pm, squad-chief) vão perguntar na hora certa. Mas quanto mais completo o briefing, menos idas e vindas.

**Critério de conclusão:** arquivo(s) dentro de `docs/briefing-inicial/`.

### Passo 0.2 — Bootstrap do ambiente

**Quem:** @aiox-master ou @devops
**Comando:** `*environment-bootstrap`

O projeto ainda **não tem git**. Este passo inicializa:
- [ ] Repositório git local
- [ ] Remote no GitHub (requer `gh auth status` ok)
- [ ] CI/CD básico

Pode ser feito a qualquer momento da Fase 0 ou 1, mas é **obrigatório antes da Fase 2** (o ciclo de stories depende de branches e PRs).

---

## FASE 1 — O Cérebro: Squad Teo Esportes

### Passo 1.1 — (Opcional, recomendado) Pesquisa de mercado

**Quem:** `@analyst` (Alex) ou squad `spy` (`@spy:research-head`)
**Por quê:** você só tem o briefing — sem materiais da empresa, uma pesquisa curta sobre mercado esportivo, público e concorrência compensa parcialmente a ausência do modo QUALITY.

**O que pedir:**
```
@analyst
Pesquise o mercado de varejo de artigos esportivos no Brasil com foco em:
1. Sazonalidade de vendas do segmento
2. Estratégias de campanha dos principais players
3. Perfil e gatilhos de compra do público
Salve o resultado em docs/briefing-inicial/pesquisa-mercado.md
```

**Output esperado:** `docs/briefing-inicial/pesquisa-mercado.md`
**Se pular este passo:** o modo YOLO do squad-creator fará pesquisa web automática, porém mais genérica.

### Passo 1.2 — Criar o squad

**Quem:** `@squad-creator-pro:squad-chief`
**Comando:** `*create-squad`

**O que dizer ao ativar:**
```
@squad-creator-pro:squad-chief
Quero criar o squad "teo-esportes" para criação de campanhas de vendas.
Briefing em: docs/briefing-inicial/
Modo: YOLO

REQUISITO CRÍTICO: os artefatos devem nascer PRODUTIZÁVEIS, pois serão
embarcados em um app (Fase 2 do projeto). Isso significa:
1. Heurísticas de triagem em YAML (perguntas → classificação da situação de venda)
2. Prompts estruturados por situação de venda (reutilizáveis via API)
3. Templates de copy de landing page por situação
4. Um agente de triagem como ponto de entrada do squad
```

**Composição esperada do squad** (o diagnóstico do squad-chief pode ajustar):

| Agente | Papel |
|--------|-------|
| Triagem (Tier 0) | Classifica a situação de venda e roteia para o especialista |
| Estrategista de campanha | Define oferta, ângulo, canal e estrutura da campanha |
| Copywriter(s) por situação | Gera a copy específica (headline, corpo, CTA da landing page) |

> 💡 O diagnóstico pode concluir que parte do trabalho deve **delegar** para squads já instalados (hormozi para ofertas, copy-chief para copy, brand, storytelling) em vez de recriar especialistas. Isso é desejável — menos duplicação.

**Durante a execução, você será chamado para:**
1. Aprovar a lista de elite minds pesquisados (passo 1.3)
2. Responder elicitações sobre as situações de venda, se o briefing estiver incompleto

**Output esperado:** `squads/teo-esportes/` com `agents/`, `tasks/`, `templates/`, `workflows/`, `data/`, `config.yaml`, `README.md`

### Passo 1.3 — Aprovar os elite minds

**Quem:** Você (decisão humana obrigatória)

O squad-chief apresentará os especialistas reais pesquisados (copywriters, estrategistas) cujo DNA será clonado. Avalie:
- [ ] O especialista tem relação com varejo/e-commerce/vendas diretas?
- [ ] Os frameworks dele se aplicam ao público da Teo Esportes?

Você pode rejeitar e pedir alternativas antes da criação começar.

### Passo 1.4 — Validar o squad

**Quem:** `@squad-creator-pro:squad-chief`
**Comando:** `*validate-squad teo-esportes`

Roda 9 fases de quality gates (estrutura, agents, tasks, smoke tests). 
- **PASS** → seguir para 1.5
- **FAIL** → o relatório aponta correções; corrigir e revalidar

### Passo 1.5 — Teste prático (gate de saída da Fase 1)

**Quem:** Você + squad recém-criado

Gere **uma campanha real de ponta a ponta** usando o squad no Claude Code:

```
@teo-esportes (ou o agente de triagem do squad)
Preciso de uma campanha para: [situação real, ex: liquidação de chuteiras de inverno]
```

**Critérios de aprovação:**
- [ ] A triagem classificou corretamente a situação de venda
- [ ] A copy gerada é utilizável (com no máximo ajustes leves)
- [ ] O processo perguntou apenas o necessário (fluxo viável para um funcionário leigo no futuro app)

> Este teste valida o "cérebro" antes de investir no app. Se o resultado for fraco, itere no squad (Fase 3.1 antecipada) — é muito mais barato corrigir aqui do que depois do app pronto.

---

## FASE 2 — O Produto: App de Landing Pages

> **Pré-requisitos:** Fase 1 concluída (squad validado + teste prático aprovado) e git inicializado (Passo 0.2).
> **Workflow AIOX:** `greenfield-fullstack`

### Passo 2.1 — Project Brief

**Quem:** `@analyst` (Alex)

```
@analyst
Crie o project brief do app de landing pages da Teo Esportes.
Inputs: docs/briefing-inicial/ + squads/teo-esportes/ (motor de IA já formalizado)
Visão: funcionários criam e publicam landing pages de campanha sozinhos,
com triagem inteligente embutida no app.
```

**Output:** `docs/project-brief.md`
**Opcional:** pedir ao @analyst uma análise de soluções similares (Unbounce, Leadpages, RD Station) para posicionar o que o app precisa e o que não precisa ter.

### Passo 2.2 — PRD

**Quem:** `@pm` (Morgan)
**Comando:** `*create-prd`

**Requisitos já visíveis que o PRD deve cobrir** (o @pm vai elicitar os detalhes):

| # | Requisito | Observação |
|---|-----------|------------|
| 1 | Login/autenticação de funcionários | Perfis: funcionário e gestor (se houver aprovação) |
| 2 | Wizard de triagem | Perguntas guiadas → classificação da situação de venda (usa as heurísticas YAML do squad) |
| 3 | Geração de copy via IA | Chamada à API do Claude com os prompts do squad |
| 4 | Editor de landing page com preview | Funcionário ajusta texto/imagens sobre template |
| 5 | Publicação | Definir: domínio, subdomínio por campanha, hosting |
| 6 | Fluxo de aprovação (se aplicável) | Gestor aprova antes de publicar? |
| 7 | Métricas básicas | Visitas, conversões por campanha |

**Output:** `docs/prd.md`

### Passo 2.3 — Spec de UX/Front-end

**Quem:** `@ux-design-expert` (Uma)

**Ponto crítico:** os usuários são funcionários **não-técnicos**. A triagem deve ser um fluxo guiado (wizard), nunca um formulário genérico. O editor deve ser "escolher e ajustar", não "construir do zero".

**Output:** `docs/front-end-spec.md`

### Passo 2.4 — Arquitetura

**Quem:** `@architect` (Aria)

**Decisões que o architect vai tomar:**
- [ ] Stack (front, back, banco, hosting)
- [ ] Como o app consome os artefatos do squad em runtime (prompts/heurísticas versionados em `squads/teo-esportes/` lidos pelo backend vs. copiados para o app)
- [ ] Estratégia de publicação das landing pages (geração estática? subdomínios? CDN?)
- [ ] Integração com API do Claude (modelo, custos, rate limits)
- [ ] Se banco de dados: @architect decide a tecnologia e **delega o DDL detalhado ao @data-engineer** (Dara)

**Output:** `docs/architecture.md` (fullstack)

### Passo 2.5 — Shard e validação do backlog

**Quem:** `@po` (Pax)
- Shard do PRD em epics: `*shard-doc docs/prd.md docs/prd/`
- Validação de consistência PRD ↔ arquitetura (checklist po-master)

**Output:** `docs/prd/` shardado + epics prontos para stories

### Passo 2.6 — Ciclo de desenvolvimento (SDC, repete por story)

```
@sm  *draft            → cria a story a partir do epic     (docs/stories/N.M.story.md)
@po  *validate-story-draft → GO/NO-GO (checklist de 10 pontos)
@dev *develop-story    → implementa (código em packages/)
@qa  *qa-gate          → PASS / CONCERNS / FAIL
@devops *push          → commit chega ao GitHub (EXCLUSIVO do @devops)
```

**Regras do ciclo:**
- Nenhum agente além do @devops faz `git push` ou cria PR
- Story só é "Done" após QA gate PASS
- Se o QA reprovar repetidamente: `*qa-loop {storyId}` (máx. 5 iterações, depois escala)

---

## FASE 3 — Evolução contínua

### Passo 3.1 — Subir a fidelidade do squad

Quando conseguir materiais reais da Teo Esportes (campanhas antigas, catálogo, tom de voz documentado, fotos de loja, scripts de venda):

```
@squad-creator-pro:squad-chief
*update-mind {slug-do-agente}
```

Isso recalibra os agentes de copy da faixa YOLO (60–75%) para perto da faixa QUALITY (85–95%) **sem recriar o squad** — e o app melhora junto, pois consome os mesmos artefatos.

### Passo 3.2 — Novas situações de venda

Nova situação (ex: "parcerias com escolinhas de futebol") = novo template/task no squad + nova opção na triagem do app:
1. Adicionar a situação nas heurísticas de triagem (`squads/teo-esportes/data/`)
2. Criar o template de copy correspondente (`*create-template` no squad-chief)
3. Story no app para expor a nova opção no wizard (ciclo SDC normal)

---

## Mapa rápido de responsabilidades

| Etapa | Agente/Comando | Você participa? |
|-------|----------------|-----------------|
| 0.1 Briefing | Você | ✅ Total |
| 0.2 Bootstrap | `*environment-bootstrap` | Aprovações git/GitHub |
| 1.1 Pesquisa | `@analyst` | Revisão do resultado |
| 1.2 Criar squad | `@squad-creator-pro:squad-chief` `*create-squad` | Elicitações |
| 1.3 Elite minds | — | ✅ Aprovação obrigatória |
| 1.4 Validação | `*validate-squad teo-esportes` | Revisão se FAIL |
| 1.5 Teste prático | `@teo-esportes` | ✅ Avaliação da campanha |
| 2.1 Brief | `@analyst` | Revisão |
| 2.2 PRD | `@pm` `*create-prd` | ✅ Elicitações (publicação, aprovação, integrações) |
| 2.3 UX | `@ux-design-expert` | Revisão |
| 2.4 Arquitetura | `@architect` | Revisão de decisões |
| 2.5 Backlog | `@po` | Priorização |
| 2.6 Dev | `@sm → @po → @dev → @qa → @devops` | Acompanhamento |
| 3.x Evolução | `*update-mind` / SDC | Fornecer materiais |

## Riscos e salvaguardas

| Risco | Salvaguarda |
|-------|-------------|
| Squad genérico demais (modo YOLO sem materiais) | Passo 1.1 (pesquisa) + gate 1.5 (teste prático) + Fase 3.1 assim que houver materiais |
| App construído antes da triagem estar madura | Sequência squad-primeiro + gate 1.5 obrigatório antes da Fase 2 |
| Escopo do app crescer sem controle | PRD do @pm + validação do @po; toda mudança vira story, nada entra "por fora" |
| Duplicar especialistas que já existem | Diagnóstico do squad-chief verifica ecossistema (hormozi, copy-chief, brand, storytelling) antes de criar |
| Perda de contexto entre sessões | Handoffs automáticos em `.aiox/handoffs/` + este documento como fonte da verdade |

---

## Próxima ação imediata

**➡️ Passo 0.1: colocar o briefing (frentes A e B) em `docs/briefing-inicial/` e avisar no chat.**

A partir daí, a execução segue este documento na ordem. Qualquer desvio ou decisão nova deve ser registrada na tabela "Decisões já tomadas" no topo.

---

*— Orion, orquestrando o sistema 🎯*
