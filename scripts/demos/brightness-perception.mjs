import { open, wait } from './lib.mjs';
const m = await open('https://edwin580.github.io/Prolific-Experiment/');
await wait(800);
await m.scrollTo('text=1. The task', 20, 1000); await wait(500);
await m.click('#start', 800); await m.move(300, 450, 500);
for (const k of ['f', 'j', 'f']) { await wait(1700); await m.key(k); }
await wait(1500);
// Power simulation: a smaller effect loses power, more participants win it back.
await m.scrollTo('#effect', 140, 1100); await wait(500);
await m.slide('#effect', 0.035, 1100); await wait(800);
await m.click('#run', 700); await wait(2200);
await m.slide('#n', 160, 1000); await wait(800);
await m.click('#run', 600); await wait(2200);
await m.done();
