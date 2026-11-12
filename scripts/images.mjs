// Renders the two committed images with Playwright, so neither depends on the fonts of the build machine:
//   public/favicon.svg -> public/apple-touch-icon.png (180x180, also the PNG favicon fallback)
//   src/assets/og.svg  -> src/assets/og.jpg (the 1200x630 link-preview card)
// Both SVGs ask for Inter first, so install it before running. Run after changing either SVG:
//   npm i --no-save playwright && npx playwright install chromium && node scripts/images.mjs
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const file = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));

const browser = await chromium.launch();
const render = async (svg, width, height, out, options = {}) => {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(`<style>*{margin:0}svg{display:block;width:${width}px;height:${height}px}</style>${svg}`);
  await page.screenshot({ path: file(out), ...options });
  await page.close();
};

// iOS rounds the corners itself, so the touch icon is the same mark on a square tile.
const icon = (await readFile(file('public/favicon.svg'), 'utf8')).replace(/ rx="\d+"/, '');
await render(icon, 180, 180, 'public/apple-touch-icon.png');
await render(await readFile(file('src/assets/og.svg'), 'utf8'), 1200, 630, 'src/assets/og.jpg', { type: 'jpeg', quality: 90 });

await browser.close();
