import { open, wait } from './lib.mjs';
const m = await open(process.env.DEMO_URL ?? 'https://edwin580.github.io/RSVP-Reader/');
const { page } = m;
await wait(900);
// Browse the free catalog and add a book to the library.
await m.click('text=Find a free book', 800); await wait(1200);
await m.click('button:has-text("Science fiction")', 700); await wait(1000);
await m.click('button:has-text("The Time Machine")', 700); await wait(1600);
await m.click('button:has-text("Add to library")', 600); await wait(500);
await m.click('button:has-text("Download and add")', 500);
await page.locator('button[aria-label="Play"]').waitFor(); await wait(800);
// Read a few words.
await m.click('button[aria-label="Play"]', 700); await wait(3200); await m.click(); await wait(500);
// Full-text search, then jump to a match.
await m.click('button[aria-label="Search"]', 700); await wait(400);
await page.keyboard.type('morlocks', { delay: 90 }); await wait(1200);
await m.click('button:has-text("Why had the")', 700); await wait(900);
// Switch to the dark theme and keep reading.
await m.click('button:has-text("Aa")', 700); await wait(500);
await m.click('button:has-text("Dark")', 600); await wait(600);
await page.keyboard.press('Escape'); await wait(300);
await m.click('button[aria-label="Play"]', 700); await wait(3200); await m.click(); await wait(500);
// Back to the library, which tracks progress.
await m.click('button:has-text("Library")', 700); await wait(900);
await m.to('button:has-text("The Time Machine")', 900); await wait(2000);
await m.done();
