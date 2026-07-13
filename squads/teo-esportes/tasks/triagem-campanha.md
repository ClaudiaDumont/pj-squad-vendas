# Task: Triagem de Campanha

**Agente:** @teo-triagem | **Fase:** 1 do wf-criar-campanha | **Elicit:** true

## Purpose

Classificar a situação de venda de uma nova campanha aplicando
`data/heuristicas-triagem.yaml`, resolvendo template, prompt pack e campos
obrigatórios via `data/situacoes-venda.yaml`.

## Inputs

- Descrição da campanha pelo funcionário (texto livre ou formulário)

## Elicitation

Aplicar SOMENTE as perguntas de `heuristicas-triagem.yaml`, na ordem,
respeitando `exibir_se`. Respostas já implícitas na descrição podem ser
inferidas, mas devem ser confirmadas com o funcionário no resultado.
Máximo 5 perguntas — nunca inventar perguntas extras.

## Steps

1. Ler `data/heuristicas-triagem.yaml` e `data/situacoes-venda.yaml`
2. Coletar respostas (q1..q5 conforme aplicável)
3. Avaliar `regras_classificacao` em ordem — first-match-wins; sem match → fallback
4. Aplicar `modificadores`
5. Resolver `template_lp`, `prompt_pack`, `copy_template` no catálogo
6. Calcular `campos_pendentes` (comuns + da situação)
7. Emitir resultado no `output_schema` e pedir confirmação humana

## Veto Conditions

- ❌ Classificar sem citar a regra aplicada
- ❌ Avançar com `confianca: baixa` sem confirmação humana (VT01)
- ❌ Avançar para proposta com `campos_pendentes` não vazio (VT02)
- ❌ `personalizada` sem `modelo_venda_definido` (VT03)

## Output Example

```yaml
resultado:
  situacao: evento-festa
  confianca: alta
  regra_aplicada: R03
  modificadores: { requer_lotes: true, requer_checkout: true, requer_pix: true }
  template_lp: template-2-evento-festa
  prompt_pack: prompts/evento-festa.yaml
  copy_template: templates/copy-evento-festa-tmpl.md
  campos_pendentes: [local, lotes_ou_precos, limite_participantes, data_encerramento]
  requer_revisao_humana: false
```

## Completion Criteria

- Resultado emitido no output_schema com regra citada
- Confirmação humana registrada (obrigatória se confiança != alta)
- Handoff para @teo-pm com resultado completo
