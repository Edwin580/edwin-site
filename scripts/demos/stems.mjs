import { open, wait } from './lib.mjs';
const m = await open(process.env.DEMO_URL ?? 'https://edwin580.github.io/stems/');
const { page } = m;
await wait(700);
// The demo song is synthesized in the browser; beats, structure and seams are found while it starts playing.
await m.click('#demo', 800); await page.locator('#play').waitFor({ state: 'visible' }); await wait(1800);
await m.click('#play', 700); await wait(1200);
// Jumpy takes more of the seams it found, so the playhead visibly jumps along the arcs.
await m.click('button:text-is("Jumpy")', 700); await wait(3200);
await m.click('button:text-is("Circle")', 800); await wait(4200);
// Split the song into stems with the built-in DSP separator, then take the drums out.
await m.scrollTo('button:text-is("Stems")', 300, 900); await wait(300);
await m.click('button:text-is("Stems")', 700); await wait(600);
await m.click('button:has-text("Fast")', 700);
await page.locator('button:text-is("Drums and bass")').waitFor({ timeout: 30000 }); await wait(500);
await m.scrollTo('text=Fast DSP separation', 70, 900); await wait(600);
// Presets set the mix: the instrumental drops the vocal stem.
await m.click('button:text-is("Instrumental")', 700); await wait(1800);
await m.click('button:text-is("All")', 600); await wait(700);
await m.click(':nth-match(button:text-is("M"), 1)', 700); await wait(1600);
await m.scrollTo('#viz', 60, 900); await wait(2500);
await m.done();
