# Checklist — Briefing Completo

> Gate da Fase 2 (@teo-pm). Veredito INCOMPLETO em qualquer seção bloqueia a
> geração de proposta (VT02). Campos obrigatórios por situação:
> `data/situacoes-venda.yaml` → `campos_obrigatorios`.

## 1. Identificação

- [ ] Nome interno e nome público definidos
- [ ] Slug válido (minúsculas, hífens, sem acento) e não usado por campanha ativa
- [ ] Responsável nomeado
- [ ] Visibilidade definida (pública/restrita)

## 2. Classificação

- [ ] Triagem executada com regra citada (ex.: R03)
- [ ] Classificação confirmada por humano (obrigatório se confiança != alta)
- [ ] Template LP e prompt pack resolvidos

## 3. Objetivo e público

- [ ] Objetivo da campanha claro e mensurável
- [ ] Público-alvo descrito (não apenas "todos os alunos")

## 4. Oferta e preços

- [ ] Todos os itens da oferta com descrição e preço (se campanha paga)
- [ ] Preço promocional/combos/lotes com regras completas (quando existirem)
- [ ] Itens inclusos e não inclusos explícitos (quando aplicável)

## 5. Campos específicos da situação

- [ ] TODOS os `campos_obrigatorios` da situação preenchidos
      (conferir lista em data/situacoes-venda.yaml)

## 6. Datas

- [ ] Início < Encerramento
- [ ] Data de evento/entrega coerente com o fim das vendas
- [ ] Fuso e horário de encerramento explícitos

## 7. Formulário do comprador

- [ ] Somente campos necessários
- [ ] CPF e dados sensíveis com justificativa registrada (briefing §7 etapa 8)

## 8. Pagamento (se campanha paga)

- [ ] Formas de pagamento definidas
- [ ] Expiração do Pix definida
- [ ] ZERO credenciais no briefing (veto imediato se presente)

## 9. Políticas

- [ ] Política de cancelamento definida ou marcada [PENDENTE] com dono
- [ ] Política de troca (produto físico) definida ou [PENDENTE] com dono

## Veredito

- **COMPLETO** — todas as seções OK → liberar Fase 3
- **INCOMPLETO** — listar pendências com dono e formato esperado → bloquear
