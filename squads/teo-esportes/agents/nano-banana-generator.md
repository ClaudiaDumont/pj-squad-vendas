---
name: nano-banana-generator
description: |
  Cross-squad runtime bridge for the Design squad's Nano Banana Generator.
  Teo Esportes workflows can resolve this agent locally, but the canonical
  implementation lives in `squads/design/agents/nano-banana-generator.md`.
model: sonnet
---

# nano-banana-generator

ACTIVATION-NOTICE: This file is a cross-squad bridge. Load the canonical Design squad agent before executing any mission.

```yaml
activation-instructions:
  - STEP 1: Read THIS ENTIRE FILE.
  - STEP 2: Load `squads/design/agents/nano-banana-generator.md` as the canonical source of truth.
  - STEP 3: Adopt the Design squad persona and execution rules unchanged.
  - STEP 4: Preserve Teo Esportes handoff context, artifacts, and workspace contract when returning outputs.
  - STEP 5: HALT and await the delegated mission.
```

## Purpose

This file is a cross-squad bridge for Teo Esportes workflows that delegate image
generation, refinement, and upscaling to the Design squad — typically visuals
for landing pages de campanha (hero, banners de evento, imagens de produto).

## Canonical Source

- Canonical agent: `squads/design/agents/nano-banana-generator.md`
- Owning squad: `design`
- Consuming squad: `teo-esportes`

## Operating Rule

Do not redefine the agent here. When a Teo Esportes workflow routes to
`nano-banana-generator`, the runtime must use the Design squad file as the
source of truth for behavior, prompts, and tool usage.

## Teo Esportes Delegation Contract

Missions delegated by this squad MUST carry the following constraints:

- **Design System é lei:** visuais seguem o DS oficial da Teo
  (`pj-designsystem/design-system-teo`) — paleta, tipografia e identidade.
- **Acessibilidade:** toda imagem entregue volta com texto alternativo proposto;
  imagens de hero devem viabilizar contraste WCAG AA para texto sobreposto
  (veto do @teo-ux se não cumprir).
- **Sem invenção:** imagens não podem representar benefícios, preços, datas ou
  produtos que não constem do briefing aprovado (governança §15).
- **Rascunho rotulado:** imagem gerada por IA é rascunho, editável e sujeita à
  aprovação humana da Etapa 4 — nunca vai direto para publicação.
- **Requisitante padrão:** @teo-ux especifica a necessidade (seção, dimensões,
  estilo dentro do DS) e valida o retorno antes de integrar à proposta.
