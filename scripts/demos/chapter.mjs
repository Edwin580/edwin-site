import { open, wait } from './lib.mjs';
const m = await open('https://edwin580.github.io/RSVP-Reader/');
await wait(800);
await m.click('text=Try the demo', 900); await wait(1500);
await m.click('button[aria-label*="lay" i], .controls button:nth-child(3)', 800); await wait(5000);
await m.click('button:has-text("+")', 700); await wait(300); await m.click(); await wait(4000);
await m.move(500, 300, 600); await m.click(); await wait(1500);
await m.done();
