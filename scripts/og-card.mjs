// Renders scripts/og-card.html to src/assets/og.png (1200x630) and public/favicon.svg to
// public/apple-touch-icon.png (180x180, also the PNG favicon fallback) with Playwright.
// Run after changing the card or the icon:
//   npm i --no-save playwright && npx playwright install chromium && node scripts/og-card.mjs
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(new URL('og-card.html', import.meta.url).href);
await page.screenshot({ path: new URL('../src/assets/og.png', import.meta.url).pathname });

const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
// iOS rounds the corners itself, so the touch icon is the same mark on a square tile.
const svg = (await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8')).replace(/ rx="\d+"/, '');
await icon.setContent(`<style>*{margin:0}svg{display:block;width:180px;height:180px}</style>${svg}`);
await icon.screenshot({ path: new URL('../public/apple-touch-icon.png', import.meta.url).pathname });

await browser.close();
