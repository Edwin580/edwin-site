import { open, wait } from './lib.mjs';
const m = await open('https://edwin580.github.io/EEG-Study-Replication/');
await wait(1000);
await m.scrollTo('#exposure', 180, 800); await wait(500);
// Run a few trials of the masked word task.
await m.click('#start', 800); await m.move(560, 520, 500);
for (const k of ['1', '5', '1', '1']) { await wait(1500); await m.key(k); }
await wait(1500);
// Then the ERP plot: switch analysis windows.
await m.scrollTo('text=The brain responses', 10, 1200); await m.scroll(330, 10, 45); await wait(800);
for (const w of ['P2', 'N2', 'LPP']) { await m.click(`button:has-text("${w}")`, 700); await wait(1400); }
await m.click('text=category and control words at Cz', 700); await wait(1800);
await m.done();
