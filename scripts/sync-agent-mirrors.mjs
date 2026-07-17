#!/usr/bin/env node
/**
 * sync-agent-mirrors.mjs — Espelhos de agents em .claude/commands/ com dono.
 *
 * Fonte canônica:  squads/{squad}/agents/*.md
 * Derivado:        .claude/commands/{alias}/*.md   (alias = slash_prefix do config.yaml)
 *
 * Regra: espelho NUNCA é editado à mão. Este script é o único escritor.
 *
 * Uso:
 *   node scripts/sync-agent-mirrors.mjs --check   # só reporta drift; exit 1 se houver
 *   node scripts/sync-agent-mirrors.mjs           # sincroniza (fonte → espelho)
 *   node scripts/sync-agent-mirrors.mjs --squad teo-esportes   # escopo por squad
 *
 * Integração: @devops roda `--check` no pre-push (ver AGENTS.md).
 *
 * Comparação normaliza CRLF→LF para não acusar drift de line-ending
 * (mirrors históricos foram criados com `cp` no Windows).
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SQUADS_DIR = join(ROOT, 'squads');
const COMMANDS_DIR = join(ROOT, '.claude', 'commands');

function parseArgs(argv) {
  const args = { check: false, squad: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--check') args.check = true;
    else if (argv[i] === '--squad') args.squad = argv[i + 1] || null;
  }
  return args;
}

function normalize(content) {
  return content.replace(/\r\n/g, '\n');
}

function squadAlias(squadPath, squadName) {
  // Candidatos em ordem: slash_prefix do config, nome do dir do squad.
  // Prefere o candidato cujo diretório de espelho JÁ existe — o dir vivo em
  // .claude/commands/ é a verdade de ativação (alguns configs declaram
  // slashPrefix divergente do espelho real, ex.: story vs storytelling).
  const candidates = [];
  const configPath = join(squadPath, 'config.yaml');
  if (existsSync(configPath)) {
    const config = readFileSync(configPath, 'utf8');
    const match = config.match(/^\s*slash_?[Pp]refix:\s*["']?([\w-]+)/m);
    if (match) candidates.push(match[1]);
  }
  candidates.push(squadName);
  for (const candidate of candidates) {
    if (existsSync(join(COMMANDS_DIR, candidate))) return candidate;
  }
  return candidates[0];
}

function listSquads() {
  return readdirSync(SQUADS_DIR)
    .filter((name) => {
      const dir = join(SQUADS_DIR, name);
      return statSync(dir).isDirectory() && existsSync(join(dir, 'agents'));
    });
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const squads = args.squad ? [args.squad] : listSquads();

  let drift = 0;
  let missing = 0;
  let orphans = 0;
  let synced = 0;
  let ok = 0;

  for (const squadName of squads) {
    const squadPath = join(SQUADS_DIR, squadName);
    const agentsDir = join(squadPath, 'agents');
    if (!existsSync(agentsDir)) {
      console.error(`[sync-mirrors] squad sem agents/: ${squadName}`);
      continue;
    }

    const alias = squadAlias(squadPath, squadName);
    const mirrorDir = join(COMMANDS_DIR, alias);
    const sources = readdirSync(agentsDir).filter((f) => f.endsWith('.md') && f !== 'README.md');

    for (const file of sources) {
      const sourcePath = join(agentsDir, file);
      const mirrorPath = join(mirrorDir, file);
      const sourceContent = normalize(readFileSync(sourcePath, 'utf8'));

      if (!existsSync(mirrorPath)) {
        missing += 1;
        if (args.check) {
          console.log(`MISSING  ${alias}/${file}  (fonte: squads/${squadName}/agents/${file})`);
        } else {
          mkdirSync(mirrorDir, { recursive: true });
          writeFileSync(mirrorPath, sourceContent, 'utf8');
          synced += 1;
          console.log(`CREATED  ${alias}/${file}`);
        }
        continue;
      }

      const mirrorContent = normalize(readFileSync(mirrorPath, 'utf8'));
      if (sourceContent !== mirrorContent) {
        drift += 1;
        if (args.check) {
          console.log(`DRIFT    ${alias}/${file}  (fonte: squads/${squadName}/agents/${file})`);
        } else {
          writeFileSync(mirrorPath, sourceContent, 'utf8');
          synced += 1;
          console.log(`UPDATED  ${alias}/${file}`);
        }
      } else {
        ok += 1;
      }
    }

    // Órfãos: espelho sem fonte (agent renomeado/removido)
    if (existsSync(mirrorDir)) {
      const mirrored = readdirSync(mirrorDir).filter((f) => f.endsWith('.md'));
      for (const file of mirrored) {
        if (!sources.includes(file)) {
          orphans += 1;
          console.log(`ORPHAN   ${alias}/${file}  (sem fonte em squads/${squadName}/agents/ — remover manualmente se obsoleto)`);
        }
      }
    }
  }

  const problems = drift + missing + orphans;
  console.log('');
  console.log(`OK: ${ok} | drift: ${drift} | ausentes: ${missing} | órfãos: ${orphans}${args.check ? '' : ` | sincronizados: ${synced}`}`);

  if (args.check && problems > 0) {
    console.log('\nEspelhos fora de sync. Rode: node scripts/sync-agent-mirrors.mjs');
    process.exit(1);
  }
  if (!args.check && orphans > 0) {
    console.log('\nÓrfãos não são removidos automaticamente — revisar e deletar à mão.');
  }
  process.exit(0);
}

main();
