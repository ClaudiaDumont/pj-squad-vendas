# Template de Copy — Campanha Personalizada (blocos modulares)

> Artefato PRODUTIZÁVEL #3 — situação: `personalizada`
> Placeholders `{{...}}` preenchidos pelo prompt `gerar_copy_lp` do pack
> `prompts/personalizada.yaml` SOMENTE após aprovação humana da estrutura de blocos.
> Blocos do Template 6 (briefing §8): incluir apenas os blocos em `blocos_aprovados`,
> na ordem aprovada. Blocos não aprovados NÃO aparecem no output.

---

## BLOCO: hero

**Headline:** {{headline}}
**Subheadline:** {{subheadline}}
**CTA primário:** {{cta_primario}}

## BLOCO: texto

{{texto_principal}}

## BLOCO: beneficios

{{beneficios}}

## BLOCO: produtos

<!-- Repetir por produto: nome, descrição, preço. -->
{{produtos}}

## BLOCO: servicos

{{servicos}}

## BLOCO: tabela_precos

{{tabela_precos}}

## BLOCO: programacao

{{programacao}}

## BLOCO: depoimentos

{{depoimentos}}
<!-- Somente depoimentos reais fornecidos no briefing. -->

## BLOCO: parceiros

{{parceiros}}

## BLOCO: localizacao

{{localizacao}}

## BLOCO: faq

{{faq}}

## BLOCO: formulario

{{texto_apoio_formulario}}

## BLOCO: contagem_regressiva

{{texto_contagem}}
<!-- Apenas com data real de encerramento. -->

## BLOCO: aviso

{{aviso}}
<!-- Informações importantes, políticas, restrições. -->

## BLOCO: whatsapp

{{cta_whatsapp}}

## BLOCO: encerramento (página pós-encerramento)

{{mensagem_encerramento}}

---

## METADADOS (preenchidos pelo sistema)

- Situação: personalizada | Template LP: template-6-personalizada
- Blocos aprovados: {{blocos_aprovados}}
- Gerado por IA em: {{data_geracao}} — **requer revisão e aprovação humana**
- Campos pendentes: {{campos_pendentes}}
