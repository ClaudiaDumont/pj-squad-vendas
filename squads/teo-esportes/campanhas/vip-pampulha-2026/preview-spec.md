# Especificação de Preview — VIP Pampulha 2026

> @teo-ux · Etapa 5 do fluxo (`wf-criar-campanha`) · Fonte: `ux-spec.md` + `copy-lp.md`
> Proposta APROVADA por Claudia Dumont em 2026-07-14.
> **Rascunho de especificação — os previews reais são gerados/capturados na implementação (Fase 2); este documento define o que deve ser verificado.**

## Os 4 estados obrigatórios

### Estado 1 — Campanha ATIVA (padrão)

- Hero com foto `assets/comunidade-teo-pos-prova.jpeg` + overlay escuro (`--surface-glass`) sob o texto
- Contador/indicador de vagas visível (G1: "apenas 400 vagas") — dado real, não estimado
- Barra/strip de urgência com G2 ("vendas até 04/12 às 23:59") — countdown com equivalente textual
- CTA primário habilitado: "Garantir minha vaga no VIP"
- Todas as seções da copy-lp.md renderizadas: hero, texto principal, estrutura (7 itens + imagem de apoio `assets/celebracao-equipe-teo.png`), tipos de acesso (3 cards, incl. founder-block com acento lime), localização, vagas, termos, FAQ (lista aberta), CTA final

### Estado 2 — Carrinho/checkout (reserve-shell)

- `.reserve-shell` com `.form-side` (nome, e-mail, telefone, tipo de comprador, stepper de acompanhantes + nomes) e `.summary-side` (resumo do pedido, total calculado no servidor)
- `.founder-block` visível com campo de cupom — testar cupom válido (zera 1 unidade fundador) e inválido (erro claro, sem zerar preço)
- Pix: QR code + copia-e-cola, **timer visível de expiração em 2 minutos** — validar que o timer é claramente perceptível (não é sutil, dado o prazo curto real)
- **Somente Pix nesta campanha** — decisão de escopo 2026-07-14: sem opção de cartão na tela de checkout (fica para fase futura)

### Estado 3 — ESGOTADO

- As 400 vagas pagas vendidas → `.urgency` assume mensagem de esgotado (copy-lp.md, seção "ESGOTADO")
- CTA primário desabilitado/substituído por "Vagas esgotadas" + CTA secundário de WhatsApp para lista de interesse
- Cortesias de fundador (pool separado) **continuam disponíveis** mesmo com as 400 pagas esgotadas — UI precisa deixar isso claro (ex.: seletor de tipo de acesso oculta/desabilita só os tipos pagos, mantém fundador ativo se ainda houver cupons válidos)

### Estado 4 — VENDAS ENCERRADAS (pós 04/12 23:59 ou estoque zerado antes)

- Página estática com mensagem de encerramento (copy-lp.md, seção "VENDAS ENCERRADAS")
- Nenhum formulário/checkout acessível — apenas informativo
- Se aplicável, exibir que pedidos já confirmados mantêm o acesso (retirada de pulseira até 05/12)

## Comportamento por viewport (verificar nos 4 estados acima)

| Viewport | Verificações específicas |
|----------|---------------------------|
| **Desktop (≥1024px)** | `.hero-grid` 2 colunas; `.model-grid` 3 colunas (corredor/acompanhante/fundador) lado a lado; `.reserve-shell` com form + summary lado a lado; nav completa visível |
| **Tablet (768–1023px)** | Hero empilha (texto sobre, mídia abaixo); model-grid reflow 2+1; summary abaixo do form no checkout; nav pode colapsar itens secundários |
| **Celular (<768px)** | Tudo em coluna única; `.m-cta` fixo sempre visível (exceto no estado ESGOTADO/ENCERRADAS, onde deve refletir o CTA correspondente); stepper de acompanhantes com alvo de toque ≥44px; timer do Pix (2 min) em destaque máximo — tela pequena não pode escondê-lo |

## Checklist de acessibilidade (*validar-a11y* — executado)

| Item | Verificação | Resultado |
|------|-------------|-----------|
| Contraste hero | Overlay `--surface-glass` sobre `comunidade-teo-pos-prova.jpeg` | ✅ PASS — overlay obrigatório especificado desde o ux-spec.md; sem overlay seria REPROVADO |
| Alt-text das 2 fotos | `assets/comunidade-teo-pos-prova.jpeg` → alt: "Comunidade Teo Esportes reunida após prova, vestindo camisas laranja, em área arborizada"; `assets/celebracao-equipe-teo.png` → alt: "Equipe Teo Esportes celebrando com medalhas e bolo comemorativo" | ✅ PASS — ambos definidos, descritivos, sem texto decorativo genérico |
| Contraste dos cards de acesso | 3 `.model-card` sobre `--surface-card-1/2`; card fundador com `--lime-tint-border` | ✅ PASS — tokens do DS já validados AA (par documentado em tokens.css) |
| Equivalente textual do countdown | Strip de urgência (G2) precisa de texto lido por screen reader, não só barra visual | ✅ PASS — especificado como texto "Vendas até 04/12 às 23:59" |
| Foco visível | CTA, campo de cupom, stepper | ✅ PASS — `--focus-ring` do DS aplicado por padrão nos componentes |
| Navegação por teclado no checkout | Tab order: nome → e-mail → telefone → tipo → stepper → cupom → pagamento → CTA | ⚠️ VERIFICAR na implementação (Fase 2) — não testável em spec estática |
| Timer do Pix (2 min) para leitor de tela | Não pode depender só de contagem visual | ⚠️ REQUISITO NOVO — anunciar via `aria-live` a expiração iminente (ex.: aviso sonoro/textual nos últimos 30s), dado o prazo excepcionalmente curto |

**Veredito a11y (spec):** ✅ APROVADO com 2 itens marcados para verificação/implementação na Fase 2 (não bloqueiam a especificação, mas são requisito para o preview funcional real).

## Handoff para @teo-qa

Este documento define o que os previews devem mostrar. @teo-qa usa esta spec + `proposta.md` §7 (cenários de e-commerce) para montar o plano de teste da Etapa 5/6.
