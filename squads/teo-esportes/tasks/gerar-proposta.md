# Task: Gerar Proposta de Campanha

**Agentes:** @teo-estrategista (lead), @teo-copywriter, @teo-ux, @teo-ecommerce
**Fase:** 3 do wf-criar-campanha | **Elicit:** false (usa briefing validado)

## Purpose

Produzir a proposta completa da campanha (Etapa 3 do briefing §5) a partir do
briefing COMPLETO, usando o prompt pack da situação de venda.

## Pre-conditions (bloqueantes)

- [ ] Briefing com veredito COMPLETO (@teo-pm)
- [ ] Situação classificada e confirmada (@teo-triagem)
- [ ] Prompt pack da situação identificado

## Steps

1. **@teo-estrategista:** executar `gerar_proposta` do pack com as variáveis do
   briefing; emitir `proposta_valor`, `posicionamento` e `gatilhos_aprovados`
   (cada gatilho com lastro)
2. **@teo-copywriter:** executar `gerar_copy_lp`, `gerar_faq`, `gerar_mensagens`
   preenchendo o copy_template da situação
3. **@teo-ux:** definir seções em ordem + customizações dentro do Design System
4. **@teo-ecommerce:** emitir configuração do modelo de venda (estoque, limites,
   lotes, cupons, entrega, expiração de Pix)
5. Consolidar tudo em `templates/proposta-campanha-tmpl.md`
6. Consolidar TODOS os [PENDENTE] na seção 11

## Veto Conditions

- ❌ Copy gerada antes de `gatilhos_aprovados` existirem
- ❌ Gatilho sem lastro no briefing
- ❌ Benefício, preço, data ou quantidade não rastreável ao briefing
- ❌ Configuração de venda incompatível com a situação (carrinho em lead etc.)
- ❌ Proposta apresentada como final — é SEMPRE rascunho para Etapa 4

## Output Example

Proposta completa no formato `templates/proposta-campanha-tmpl.md`, com:
- Seções 1-10 preenchidas
- Seção 11 com pendências consolidadas
- Rótulo "Conteúdo gerado por IA — requer revisão e aprovação humana"

## Completion Criteria

- Proposta consolidada no template, sem seção vazia sem justificativa
- Pendências listadas com dono
- Handoff para revisão humana (Etapa 4) registrado
