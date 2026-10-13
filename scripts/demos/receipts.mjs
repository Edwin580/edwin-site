import { open, wait } from './lib.mjs';
const m = await open(process.env.DEMO_URL ?? 'https://edwin580.github.io/receipts-engine/');
const { page } = m;
await m.scrollTo('#type', 200, 600); await wait(800);
// Pick a complaint type and a place; the answer is recomputed in the browser.
await m.to('#type', 800); await page.selectOption('#type', { label: 'Illegal Parking' }); await wait(1500);
await m.to('#area', 700); await page.selectOption('#area', { index: 1 }); await wait(1800);
// Drill into a district, then read the complaints behind the number.
await m.scrollTo('text=Districts in the', 30, 900); await wait(700);
await m.click('button:has-text("Bronx district 9")', 800); await wait(1800);
await m.scrollTo('#order', 60, 900); await wait(600);
await m.to('#order', 700); await page.selectOption('#order', { index: 1 }); await wait(1600);
await m.scrollTo('#more', 420, 900); await wait(400);
await m.click('#more', 700); await wait(1000);
await m.scroll(380, 12, 45); await wait(1200);
await m.done();
