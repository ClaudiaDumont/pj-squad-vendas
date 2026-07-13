# Checklist — Publicação de Campanha

> Gate da Fase 6 (@teo-qa). Publicação SOMENTE com 100% PASS + evidência por
> item. Não existe "aprovado com ressalvas". (Briefing §4.7 e §7 etapa 10.)

## 1. Conteúdo

- [ ] Zero [PENDENTE] em qualquer página pública
- [ ] Preços, datas e quantidades conferem com o briefing aprovado
- [ ] Gatilhos de urgência/escassez têm lastro real (estoque/vagas/data)
- [ ] Políticas (cancelamento/troca) publicadas quando aplicáveis
- [ ] FAQ sem respostas inventadas
- [ ] Conteúdo gerado por IA foi revisado e aprovado por humano (com registro)

## 2. Compra e pagamento (campanhas pagas)

- [ ] Teste de compra completo executado em homologação
- [ ] Teste de pagamento Pix executado (QR + copia-e-cola)
- [ ] Preço e total calculados no servidor (manipulação via navegador falha)
- [ ] Pix expirado devolve estoque/vaga
- [ ] Pagamento duplicado não gera pedido/cobrança duplicada
- [ ] Webhook repetido é idempotente (sem efeito colateral duplicado)
- [ ] Pagamento confirmado após encerramento segue procedimento definido (§13)

## 3. Estoque, limites e encerramento

- [ ] Esgotamento por variação e total testados (compra no limite)
- [ ] Limite por comprador aplicado
- [ ] Encerramento automático por DATA testado (relógio forçado)
- [ ] Encerramento automático por ESTOQUE/VAGAS testado
- [ ] Página de campanha encerrada exibida corretamente
- [ ] Pedidos anteriores preservados após encerramento

## 4. Permissões e segurança

- [ ] Publicação exige perfil autorizado (RBAC)
- [ ] Usuário público não acessa pedido de terceiro (URL direta → 403)
- [ ] Perfis restritos não alteram preço/integrações (testado por perfil)
- [ ] Dados sensíveis fora de logs, URLs e exports desnecessários
- [ ] Variáveis de ambiente documentadas; zero segredo em código
- [ ] Formulários validados no servidor (payload malicioso rejeitado)

## 5. Experiência

- [ ] Preview desktop, tablet e celular aprovados
- [ ] Contraste e alt-text conformes (a11y básica)
- [ ] Simulação de carrinho/checkout (quando aplicável) aprovada
- [ ] Open Graph configurado (imagem de compartilhamento)
- [ ] URL /campanhas/{slug} correta

## 6. Operação

- [ ] Mensagens transacionais revisadas (confirmação, pagamento, encerramento)
- [ ] Dashboard da campanha ativo com métricas da situação
- [ ] Exports operacionais testados
- [ ] Auditoria registrando ações (usuário, ação, data, valores)

## Veredito

- **PASS** — 100% dos itens com evidência → publicar
- **FAIL** — listar itens reprovados + evidências → devolver à fase dona
