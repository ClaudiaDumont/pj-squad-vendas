# Relatório para upstream (Synkra AIOX): fork-drift squad-creator ↔ squad-creator-pro

**Data:** 2026-07-17
**Instalação:** AIOX Pro (manifest gerado 2026-07-10, 2.535 arquivos)
**Status:** rascunho pronto para envio ao canal de suporte/issues do fornecedor.
**Decisão local:** NÃO corrigimos isso na instalação (divergir do upstream seria
sobrescrito no próximo upgrade). Este relatório é a entrega do achado.

## Resumo

O pacote instala dois squads criadores (`squads/squad-creator/` e
`squads/squad-creator-pro/`) que compartilham ~25 scripts de mesmo nome.
A task wrapper do pro declara delegação ao base como canônico, mas o pro
embarca cópias próprias e fortemente divergidas dos mesmos scripts.
Correções aplicadas num fork não chegam ao outro, e o comportamento muda
conforme qual chief está ativo.

## Evidência medida (diff entre base e pro, mesma instalação)

| Script | Linhas de diff |
|---|---|
| `scripts/refresh-registry.py` | 1.167 |
| `scripts/coherence-validator.py` | 881 |
| `scripts/generate-squad-greeting.js` | 831 |
| `scripts/sync-ide-skills.py` | 748 |
| `scripts/scoring.py` | 440 |

Contradição documental: `squads/squad-creator-pro/tasks/sync-ide-skills.md`
(linhas 51–67) declara *"a lógica de sincronização multi-IDE não deve ser
mantida em paralelo no pro"* e nomeia `squads/squad-creator/scripts/sync-ide-skills.py`
como owner canônico — enquanto o pro embarca `squads/squad-creator-pro/scripts/sync-ide-skills.py`
com 748 linhas de divergência.

## Problemas correlatos encontrados na mesma auditoria

1. **Referência morta a `squads/sinkra-squad/data/ecosystem-registry.yaml`** em:
   - `squad-creator-pro/agents/squad-chief.md` (bloco duplicate-detection);
   - `squad-creator-pro/scripts/generate-squad-greeting.js` (`REGISTRY_PATH`);
   - `squad-creator/data/squad-registry.yaml` (stub deprecado com data de
     remoção 2026-04-25 já vencida, redirecionando para o path morto).
   O `sinkra-squad` não é instalado. Efeito: duplicate-detection sem fonte e
   ecosystem report zerado. (Corrigido localmente nesta instalação; o fix
   merece ir para o produto.)
2. **`sync-ide-skills.py` não cobre a superfície de ativação real**: escreve
   `.claude/skills/{nome}/SKILL.md`, mas a ativação de squads usa
   `.claude/commands/{alias}/*.md`, que fica sem dono executável. Default
   skip-if-exists também impede propagação de updates sem `--force`.
3. **Instalador produziu squad aninhado**: `squads/copy/copy/` — cópia
   idêntica de 33 MB / 1.447 arquivos do próprio squad (verificado por diff
   recursivo, zero arquivos únicos). Sugere bug de idempotência no
   instalador/updater ao reinstalar um squad existente.

## Sugestões ao upstream

1. Eleger canônico único por script (pro, presumivelmente) e converter os
   homônimos do base em shims finos, honrando o contrato já documentado na
   própria task wrapper.
2. Registry: um único `squad-registry.yaml` canônico; remover o stub
   deprecado vencido e a referência ao `sinkra-squad` não instalado.
3. `sync-ide-skills`: adicionar `.claude/commands/{alias}/` como target,
   overwrite por hash como default e um modo `--check` (exit 1 em drift)
   utilizável em pre-push.
4. Instalador: guard de idempotência contra `squads/{x}/{x}/` aninhado.
