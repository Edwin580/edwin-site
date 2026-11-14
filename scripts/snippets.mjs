// Copies the code shown under each project's "Code" tab out of the project's own repository, so the site quotes
// real source, word for word, and links to the exact lines at the commit it was copied from.
// Run from a folder that holds the project checkouts side by side: node edwin-site/scripts/snippets.mjs
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

// [project id, checkout folder, GitHub repo, path, first line, last line, language]
const picks = [
  ['receipts', 'receipts-engine', 'receipts-engine', 'crates/receipts-cf/src/lib.rs', 521, 536, 'rust'],
  ['chapter', 'RSVP-Reader', 'RSVP-Reader', 'src/hooks/useRsvp.ts', 43, 63, 'ts'],
  ['stems', 'stems', 'stems', 'src/engine/align.ts', 47, 57, 'ts'],
  ['music-generation', 'music-generator', 'music-generator', 'docs/js/model.js', 134, 153, 'js'],
  ['morality-pop-out', 'EEG-Study-Replication', 'EEG-Study-Replication', 'docs/site/js/stats.js', 105, 119, 'js'],
  ['brightness-perception', 'Prolific-Experiment', 'Prolific-Experiment', 'src/plugin-word-probe.js', 109, 125, 'js'],
  ['better-video', 'better-video', 'better-video', 'crates/bv-engine/src/raw.rs', 108, 137, 'rust'],
];

const git = (dir, ...args) => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8' });
const out = {};
for (const [id, dir, repo, path, from, to, lang] of picks) {
  const sha = git(dir, 'rev-parse', 'origin/main').trim();
  let lines = git(dir, 'show', `${sha}:${path}`).split('\n').slice(from - 1, to);
  while (lines.at(-1)?.trim() === '') lines.pop();
  // Drop the indentation the whole excerpt shares.
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  lines = lines.map((l) => l.slice(indent));
  out[id] = {
    lang,
    path,
    href: `https://github.com/Edwin580/${repo}/blob/${sha}/${path}#L${from}-L${from + lines.length - 1}`,
    source: lines.join('\n'),
  };
}
writeFileSync(new URL('../src/data/snippets.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
console.log(Object.entries(out).map(([id, s]) => `${id}: ${s.source.split('\n').length} lines`).join('\n'));
