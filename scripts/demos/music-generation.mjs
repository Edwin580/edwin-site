import { open, wait } from './lib.mjs';
const m = await open('https://edwin580.github.io/music-generator/');
await wait(1000);
await m.scrollTo('#a-prompt', 150, 700); await wait(900);
// Raise the sampling temperature by dragging it; the model rewrites the continuation.
await m.drag('#a-temp', 60, 1000); await wait(1800);
await m.click('#new-take', 800); await wait(1800);
await m.click('#play', 700); await wait(6000);
await m.click('#play', 500); await wait(800);
await m.done();
