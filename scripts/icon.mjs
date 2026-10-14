// Renders public/favicon.svg to public/apple-touch-icon.png (180x180, also the PNG favicon
// fallback) with Playwright. The link-preview card needs no rendering step: it is
// src/assets/og.svg, which Base.astro rasterizes to a JPEG at build time.
// Run after changing the icon:
//   npm i --no-save playwright && npx playwright install chromium && node scripts/icon.mjs
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
// iOS rounds the corners itself, so the touch icon is the same mark on a square tile.
const svg = (await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8')).replace(/ rx="\d+"/, '');
await icon.setContent(`<style>*{margin:0}svg{display:block;width:180px;height:180px}</style>${svg}`);
await icon.screenshot({ path: new URL('../public/apple-touch-icon.png', import.meta.url).pathname });

await browser.close();
