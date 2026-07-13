# Template de Copy — Produto Físico

> Artefato PRODUTIZÁVEL #3 — situação: `produto-fisico`
> Placeholders `{{...}}` são preenchidos pelo prompt `gerar_copy_lp` do pack
> `prompts/produto-fisico.yaml` e revisados por humano antes de publicar.
> Seções mapeiam os blocos do Template 1 de landing page (briefing §8).

---

## HERO

**Headline:** {{headline}}
<!-- 1 linha. Orgulho de vestir a Teo + especificidade da campanha. Sem clichê genérico. -->

**Subheadline:** {{subheadline}}
<!-- 1-2 linhas. O que é + para quem + janela de compra. -->

**CTA primário:** {{cta_primario}}
<!-- Ação direta: "Garantir minha camisa" — nunca "Saiba mais". -->

## TEXTO PRINCIPAL

{{texto_principal}}
<!-- 2-4 parágrafos. História da campanha (se informada), significado do produto
     para a comunidade Teo, qualidade e ocasião. Específico desta campanha. -->

## BENEFÍCIOS

{{beneficios}}
<!-- 3-6 bullets. Somente benefícios reais informados no briefing. -->

## PRODUTOS

<!-- Repetir por produto: -->
### {{produto_nome}}
{{produto_descricao}}
**Preço:** {{produto_preco}} {{produto_preco_promocional}}
<!-- Descrição sensorial e específica: tecido, caimento, ocasião de uso. -->

## VARIAÇÕES E TAMANHOS

{{guia_variacoes}}
<!-- Guia de escolha: tabela de medidas, diferenças entre modelos, orientação de gênero/corte. -->

## ENTREGA E RETIRADA

{{entrega_retirada}}
<!-- Formas disponíveis, prazos, endereço de retirada, previsão de entrega. Datas reais. -->

## CTA (variações para teste)

1. {{cta_variacao_1}}
2. {{cta_variacao_2}}
3. {{cta_variacao_3}}

## URGÊNCIA (usar apenas com limite real)

{{mensagem_urgencia}}
<!-- Referenciar estoque real ou data real de encerramento. VETO: urgência sem dado real. -->

## ESTOQUE LIMITADO (exibida quando estoque baixo)

{{mensagem_estoque_limitado}}

## VENDAS ENCERRADAS (página pós-encerramento)

{{mensagem_vendas_encerradas}}
<!-- Agradecer, informar próximos passos de quem comprou e como saber de novas campanhas. -->

---

## METADADOS (preenchidos pelo sistema)

- Situação: produto-fisico | Template LP: template-1-produto-fisico
- Gerado por IA em: {{data_geracao}} — **requer revisão e aprovação humana**
- Campos pendentes: {{campos_pendentes}}
