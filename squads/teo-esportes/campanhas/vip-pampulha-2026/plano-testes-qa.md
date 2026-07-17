# Plano de Testes — VIP Pampulha 2026 (Etapa 5 → prepara Etapa 6)

> @teo-qa · Fonte: `proposta.md` §7 (configuração e-commerce), `preview-spec.md` (@teo-ux)
> Este documento é o ROTEIRO de teste. A EXECUÇÃO real (com evidências) só
> acontece na Etapa 6 (`checklists/checklist-publicacao.md`), após a
> implementação existir (Fase 2 — @teo-fullstack). Aqui eu antecipo os
> cenários hostis específicos desta campanha para que nada seja esquecido.

## 1. Validação do preview (`*validar-preview`)

| # | Item | Como validar | Status nesta etapa |
|---|------|---------------|---------------------|
| 1 | Preview desktop/tablet/celular | Conferir os 4 estados × 3 viewports de `preview-spec.md` | ⏳ Aguarda implementação (Fase 2) para captura real |
| 2 | Simulação de carrinho/checkout | Reserve-shell com founder-block e stepper renderizando | ⏳ Aguarda implementação |
| 3 | Estado ESGOTADO | Confirmar que cortesias de fundador continuam ativas mesmo com 400 pagas esgotadas | ⏳ Aguarda implementação — **ponto de atenção**, é regra de negócio pouco comum |
| 4 | Estado VENDAS ENCERRADAS | Página estática, sem checkout acessível | ⏳ Aguarda implementação |
| 5 | Open Graph | Imagem de compartilhamento 1200×630 — proposta não tem imagem OG dedicada, usará uma das 2 fotos aprovadas | ⚠️ Confirmar com @teo-ux/@teo-fullstack qual das 2 fotos vira o crop de OG |

## 2. Roteiro de testes de fluxos críticos (`*testar-fluxos`) — específico desta campanha

### 2.1 Pagamento e Pix (risco R5 — expiração de 2 minutos)

1. **Compra simples, paga a tempo:** iniciar checkout, pagar Pix em <2min → confirma, vaga debitada, e-mail de confirmação enviado.
2. **Pix expira (cenário mais provável desta campanha, dado o prazo curto):** iniciar checkout, não pagar em 2min → vaga devolvida ao pool IMEDIATAMENTE (não pode haver janela de vaga "presa"). Mensagem de Pix expirado exibida (mensagens.md, item 4).
3. **Reforço para R5:** medir taxa de expiração esperada é alta — QA deve rodar este teste múltiplas vezes (mín. 5x) para garantir que a devolução ao pool é 100% consistente, já que a proximidade do prazo aumenta a chance de expiração real em produção.
4. **Pagamento duplicado:** usuário paga o mesmo Pix duas vezes (ex.: confirma no banco duas vezes) → não pode gerar 2 pedidos/cobranças.
5. **Webhook repetido:** gateway reenvia notificação de pagamento confirmado → idempotência (1 único efeito: 1 vaga debitada, 1 e-mail).
6. **Preço manipulado no navegador:** interceptar request e trocar total para R$ 0,00 ou outro valor → servidor rejeita, usa preço próprio (config §7: `total_calculado: servidor`).
7. ~~Cartão~~ — fora de escopo: decisão de 2026-07-14 (@teo-fullstack + responsável) lançar somente com Pix; sem integração de cartão na plataforma. Reavaliar se/quando a fase futura for aprovada.

### 2.2 Cupom de fundador

8. **Cupom válido, primeiro uso:** aplica, zera o valor de 1 unidade "acesso-fundador"; acompanhantes do mesmo pedido mantêm R$ 120,00 cada.
9. **Cupom reutilizado:** mesmo código usado 2x → segunda tentativa rejeitada com erro claro (config: `limite_por_cupom: 1 uso`).
10. **Cupom aplicado em tipo errado:** tentar aplicar cupom de fundador em item "acompanhante" → rejeitado (`nao_aplica_em: acompanhantes`).
11. **Cupom inválido/inexistente:** erro claro, checkout não trava, preço não é zerado por engano.
12. ⚠️ **Bloqueado até Fase 2:** fonte de dados dos fundadores é Supabase (pendência técnica ainda não modelada) — este item de teste só pode ser executado de fato após @teo-fullstack + @teo-data-engineer implementarem a tabela. **Não pode haver checklist de publicação PASS sem este teste executado.**

### 2.3 Estoque, limites e crianças/cortesias (pool separado — regra pouco usual)

13. **Última vaga paga:** comprar a vaga 400 → sistema bloqueia novas compras pagas, exibe ESGOTADO.
14. **Corrida pelas últimas 2 vagas:** duas compras simultâneas nas vagas 399-400 → uma conclui, outra recebe esgotado (nunca overbooking) — testar com concorrência real, não sequencial.
15. **Pedido com múltiplos acompanhantes (ex.: 1 corredor + 5 acompanhantes):** debita as 6 vagas atomicamente — se faltar 1 vaga no pool, o pedido inteiro falha (não completa parcialmente).
16. **Cortesia de fundador após esgotamento das 400 pagas:** confirmar que o cupom de fundador AINDA FUNCIONA (pool separado) — este é o teste mais fácil de esquecer, porque a intuição de QA é "esgotado = tudo bloqueado".
17. **Criança até 5 anos:** confirmar que o formulário/stepper trata criança como acompanhante sem cobrança e sem debitar vaga paga (config §7: `criancas.contabilizacao`).
18. **Capacidade física combinada:** não é testável em software (é validação operacional já feita pela Assessoria), mas o sistema deve permitir métricas de "total de pessoas esperadas" (pagantes + cortesias + crianças) para a Assessoria monitorar contra a capacidade do espaço — sugerir ao @teo-dados na Etapa 7.

### 2.4 Datas e encerramento automático

19. **Encerramento por DATA:** forçar relógio para 04/12/2026 23:59:01 → vendas bloqueiam automaticamente, página de VENDAS ENCERRADAS no ar.
20. **Encerramento por ESTOQUE:** com relógio normal, esgotar as 400 vagas antes de 04/12 → mesma página de encerrado/esgotado deve aparecer coerentemente (ver item 16 — cortesia continua ativa mesmo aqui).
21. **Webhook tardio:** Pix pago às 23:58 de 04/12, confirmação chega às 00:20 de 05/12 → pedido é honrado (criado dentro da janela), alerta enviado à operação (config: `webhook_tardio`).
22. **Janela de retirada da pulseira (regra nova, risco R6):** não é um teste de sistema tradicional, mas o QA deve confirmar que o e-mail/mensagem de confirmação de compra (mensagens.md, item 1) sempre inclui a janela de retirada (26/11–05/12) — item de conteúdo, verificável agora, sem esperar Fase 2.

## 3. Auditoria de segurança (`*auditar-seguranca`) — itens já verificáveis pela spec

- **Dados sensíveis:** formulário não coleta CPF/endereço/data de nascimento (proposta §7 `campos_proibidos`) — ✅ já auditável na spec, sem esperar implementação.
- **Nomes de acompanhantes:** são dado pessoal de terceiros (não o comprador) — QA deve confirmar que ficam restritos ao necessário (emissão de pulseira), sem exposição em exports desnecessários.
- **RBAC de publicação:** a confirmar na Fase 2 — quem pode publicar/editar a campanha.
- **URL de pedido:** `/campanhas/vip-pampulha-2026` — confirmar que pedido de um comprador não é acessível via URL direta por outro usuário (peça crítica dado que há dados de acompanhantes).

## 4. Itens do checklist oficial (`checklists/checklist-publicacao.md`) já cobertos por este plano

| Seção do checklist | Cobertura neste plano |
|---------------------|------------------------|
| 1. Conteúdo | Zero [PENDENTE] confirmado nas revs. 3-4 dos artefatos; políticas publicadas (cancelamento, 18+); aprovação humana registrada (RUN-LOG Wave 10) |
| 2. Compra e pagamento | Itens 1-7, 12 acima |
| 3. Estoque, limites, encerramento | Itens 13-21 acima |
| 4. Permissões e segurança | Itens de auditoria acima (parcial — RBAC pendente de Fase 2) |
| 5. Experiência | `preview-spec.md` completo |
| 6. Operação | Mensagens revisadas (mensagens.md); dashboard/exports são Etapa 7 (@teo-dados) |

## Veredito desta etapa

**Não é PASS/FAIL ainda** — este é o plano de teste, não a execução. A execução real com evidências só ocorre no checklist de publicação (Etapa 6), após a Fase 2 implementar o sistema. **Item bloqueante já identificado:** teste #12 (cupom de fundador) não pode ser executado sem a modelagem do Supabase — isso deve estar pronto antes de qualquer tentativa de rodar o checklist de publicação.
