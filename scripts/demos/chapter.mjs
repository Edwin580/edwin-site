import { open, wait } from './lib.mjs';
const m = await open(process.env.DEMO_URL ?? 'https://edwin580.github.io/RSVP-Reader/');
const { page } = m;
const menu = (label, ms = 500) => m.click(`[role=dialog] button:text-is("${label}")`, ms);
await wait(900);
// Browse the free catalog and add a book to the library.
await m.click('text=Find a free book', 800); await wait(1200);
await m.click('button:has-text("Science fiction")', 700); await wait(1000);
await m.click('button:has-text("The Time Machine")', 700); await wait(1600);
await m.click('button:has-text("Add to library")', 600); await wait(500);
await m.click('button:has-text("Download and add")', 500);
await page.locator('button[aria-label="Play"]').waitFor(); await wait(800);
// Word mode: one word at a time, its focus letter pinned in place.
await m.click('button[aria-label="Play"]', 700); await wait(2600);
// Hold to glance back at the last sentence, then let go to carry on.
await m.move(512, 300, 500); await m.down(); await wait(1800); await m.up(); await wait(1600);
await m.click('button[aria-label="Pause"]', 500); await wait(400);
// Search forgives typos: "morlok" finds the Morlocks. Jump to a match.
await m.click('button[aria-label="Search"]', 700); await wait(400);
await page.keyboard.type('morlok', { delay: 90 }); await wait(1500);
await m.click('button:has-text("Why had the")', 700); await wait(900);
// Page mode with a pacer and line focus, in sepia.
await m.click('button:has-text("Aa")', 700); await wait(400);
await menu('Page'); await wait(500);
await menu('Both'); await wait(300);
await menu('1 line'); await wait(300);
await menu('Sepia'); await wait(500);
await page.keyboard.press('Escape'); await wait(500);
await m.move(512, 320, 500); await m.click(); await wait(5200); await m.click(); await wait(600);
// A timed session that stops at a natural break.
await m.click('button[aria-label*="left in"]', 700); await wait(700);
await menu('5', 500); await wait(900);
await menu('Start reading', 500); await wait(3000);
await m.move(512, 320, 400); await m.click(); await wait(500);
// Back to the library, which tracks progress.
await m.click('button:has-text("Library")', 700); await wait(900);
await m.to('button:has-text("The Time Machine")', 900); await wait(2000);
await m.done();
