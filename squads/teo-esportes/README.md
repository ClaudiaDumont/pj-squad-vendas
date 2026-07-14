# 🏃 Squad Teo Esportes — Campanhas de Vendas

Squad especializado na **criação, publicação e administração de campanhas de
vendas** da Teo Esportes: camisas comemorativas, festas, espaços VIP em provas,
recovery, programas corporativos e inscrições gratuitas.

> **Requisito de nascença:** todos os artefatos são **produtizáveis** — serão
> embarcados no app "Loja - Teo Esportes" (Fase 2) via API.
> Briefing completo: `docs/briefing-inicial`.

## Ponto de entrada

**`@teo-triagem`** — descreva o que a Teo quer vender ("quero vender as camisas
de 10 anos") e o agente classifica a **situação de venda** em até 5 perguntas,
resolve template/prompts e aciona o squad na ordem certa.

## Situações de venda (classificadas pela triagem)

| Situação | Exemplo | Modelo de venda |
|----------|---------|-----------------|
| `produto-fisico` | Camisas, uniformes, kits | Carrinho + variações + estoque |
| `evento-festa` | Festa junina, fim de ano | Ingressos + lotes |
| `espaco-vip` | VIP Pampulha, provas RJ | Acesso limitado |
| `servico-recovery` | Recovery, sessões | Reserva/agenda |
| `programa-corporativo` | B2B para empresas | Captura de lead |
| `inscricao-gratuita` | Treinões, aulas abertas | Inscrição |
| `personalizada` | Fora do padrão | Blocos modulares (fallback) |

## Agentes

| Agente | Tier | Papel (briefing §4) |
|--------|------|---------------------|
| `@teo-triagem` | 0 | **Entrada** — triagem + orquestração |
| `@teo-pm` | 1 | Briefing estruturado + gate de completude (§4.1) |
| `@teo-estrategista` | 1 | Posicionamento, proposta de valor, gatilhos com lastro (§4.2) |
| `@teo-ecommerce` | 1 | Modelo de venda, estoque, lotes, checkout (§4.5) |
| `@teo-copywriter` | 2 | Copy completa via prompt packs (§4.3) |
| `@teo-ux` | 2 | Template, seções, Design System, a11y (§4.4) |
| `@nano-banana-generator` | 2 | **Bridge cross-squad** — criação/tratamento de imagens (canônico: squad `design`) |
| `@teo-fullstack` | 2 | Implementação da plataforma — Fase 2 (§4.6) |
| `@teo-qa` | 3 | Gate de publicação + segurança (§4.7) |
| `@teo-dados` | 3 | Métricas, relatórios, acompanhamento (§4.8) |

## Artefatos produtizáveis (contrato com o app)

1. **Heurísticas de triagem** — `data/heuristicas-triagem.yaml`
   Perguntas → regras determinísticas (first-match-wins) → situação de venda.
   Consumo: wizard do app + endpoint de classificação.
2. **Prompt packs por situação** — `prompts/*.yaml` (contrato em `prompts/_contrato.yaml`)
   5 prompts por situação (`gerar_proposta`, `gerar_copy_lp`, `gerar_faq`,
   `gerar_mensagens`, `gerar_divulgacao`) com variáveis `{{...}}` e guardrails
   anti-invenção. Consumo: endpoint de geração de conteúdo.
3. **Templates de copy por situação** — `templates/copy-*-tmpl.md`
   Seções com placeholders mapeadas aos blocos das landing pages (briefing §8).
   Consumo: seed de `campaign_templates` + editor de conteúdo.
4. **Agente de triagem** — `agents/teo-triagem.md`
   Executa as heurísticas; no app, a mesma lógica roda como serviço.

Catálogo que amarra tudo: `data/situacoes-venda.yaml` (situação → template LP,
prompt pack, copy template, campos obrigatórios).

## Fluxo (workflow `wf-criar-campanha`, briefing §5)

```
1. Triagem ──► 2. Briefing ──► 3. Proposta ──► 4. REVISÃO HUMANA ──►
5. Preview ──► 6. PUBLICAÇÃO (gate QA) ──► 7. Acompanhamento ──► 8. Encerramento
```

Gates inegociáveis:
- **Etapa 4:** nada publica sem aprovação humana registrada.
- **Etapa 6:** checklist de publicação (`checklists/checklist-publicacao.md`)
  100% PASS com evidências — inclui pagamento duplicado, webhook repetido,
  encerramento automático e RBAC.

## Regras de IA (briefing §15)

Todo conteúdo gerado: editável, rotulado como IA, com aprovação humana,
histórico de versões e **zero invenção** — lacunas viram `[PENDENTE: ...]`.

## Estrutura

```
squads/teo-esportes/
├── agents/          # 9 agentes + 1 bridge (teo-triagem é a entrada)
├── data/            # heuristicas-triagem.yaml + situacoes-venda.yaml
├── prompts/         # _contrato.yaml + 7 packs por situação
├── templates/       # 7 copy templates + briefing + proposta
├── tasks/           # triagem, gerar-proposta, validar-publicacao
├── checklists/      # briefing completo + publicação
├── workflows/       # wf-criar-campanha.yaml (8 fases)
├── config.yaml
└── README.md
```

## Referências externas obrigatórias

- **Projeto existente:** `pj-landing-vendas` — analisar antes de qualquer
  implementação (gera `docs/ANALISE-PROJETO-ATUAL.md`).
- **Design System:** `pj-designsystem/design-system-teo` — obrigatório em toda
  interface.

---
*Criado com Squad Creator Pro | 2026-07-13 | Modo YOLO*
