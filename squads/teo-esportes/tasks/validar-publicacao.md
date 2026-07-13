# Task: Validar Publicação

**Agente:** @teo-qa | **Fase:** 6 do wf-criar-campanha | **Elicit:** false

## Purpose

Executar o gate final antes da publicação da campanha, aplicando
`checklists/checklist-publicacao.md` com evidências item a item.

## Pre-conditions (bloqueantes)

- [ ] Proposta aprovada por humano autorizado (Etapa 4, com registro)
- [ ] Previews validados (Etapa 5)
- [ ] Campanha montada em ambiente de homologação

## Steps

1. Executar `checklists/checklist-publicacao.md` seção por seção
2. Para cada item: registrar PASS/FAIL + evidência (passos, resultado, log/print)
3. Executar obrigatoriamente os cenários hostis:
   - Pagamento duplicado
   - Webhook repetido (idempotência)
   - Pix expirado (devolução de estoque)
   - Compra no limite de estoque/vagas
   - Encerramento automático (data e estoque)
   - Acesso a pedido de terceiro (deve falhar)
4. Emitir veredito: **PASS** (100% dos itens) ou **FAIL** (lista de reprovados)
5. Se PASS: liberar publicação e notificar @teo-dados para baseline

## Veto Conditions

- ❌ Qualquer item do checklist em FAIL
- ❌ [PENDENTE] visível em página pública
- ❌ Teste de compra/pagamento não executado em homologação
- ❌ Aprovação humana da Etapa 4 sem registro de autor
- ❌ "Aprovar com ressalvas" — não existe; ressalva é FAIL com plano

## Output Example

```markdown
## Veredito: FAIL (2 itens)
| Item | Status | Evidência |
|------|--------|-----------|
| Webhook idempotente | ❌ | 2 e-mails enviados no replay do evento pix.pago |
| Página de encerrada | ❌ | não testada com data forçada |
| Compra teste Pix | ✅ | pedido #H-102 pago em homolog, estoque debitado |
→ Retorna para @teo-fullstack. Re-teste apenas dos itens reprovados + regressão do fluxo de pagamento.
```

## Completion Criteria

- Veredito emitido com evidência por item
- FAIL: handoff com cenário de reprodução por item
- PASS: publicação liberada + baseline notificado a @teo-dados
