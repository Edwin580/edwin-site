import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const py = spawn('python3', [new URL('xmouse.py', import.meta.url).pathname], { stdio: ['pipe', 'pipe', 'inherit'] });
const lines = createInterface({ input: py.stdout })[Symbol.asyncIterator]();
const cmd = async (c) => { py.stdin.write(c + '\n'); await lines.next(); };
// The page area is W x H (16:10); the browser's tab strip and toolbar sit above it and are cropped out.
export const W = 1024, H = 640;
export async function open(url) {
  const browser = await chromium.launch({ headless: false, args: ['--window-position=0,0', `--window-size=${W},${H + 88}`, '--hide-crash-restore-bubble', '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await browser.newContext({ viewport: null });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  await page.goto(url);
  await page.waitForLoadState('networkidle').catch(() => {});
  const off = await page.evaluate(() => ({ x: window.screenX + (outerWidth - innerWidth), y: window.screenY + (outerHeight - innerHeight) }));
  console.log(`REGION ${W}x${H}+${off.x}+${off.y}`);
  const toScreen = (x, y) => [Math.round(off.x + x), Math.round(off.y + y)];
  const { existsSync } = await import('node:fs');
  while (!existsSync(new URL('go', import.meta.url))) await wait(100);
  const m = {
    browser, page,
    move: async (x, y, ms = 600) => cmd(`move ${toScreen(x, y).join(' ')} ${ms}`),
    async to(sel, ms = 600) {
      const el = page.locator(sel).first(); await el.scrollIntoViewIfNeeded();
      const b = await el.boundingBox(); await m.move(b.x + b.width / 2, b.y + b.height / 2, ms); return b;
    },
    click: async (sel, ms) => { if (sel) await m.to(sel, ms); await cmd('click'); },
    down: () => cmd('down'), up: () => cmd('up'),
    async scroll(dy, steps = 10, gap = 40) { for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, dy / steps); await wait(gap); } },
    // Wheel-scroll until `sel` sits `top` px below the top of the viewport.
    async scrollTo(sel, top = 40, ms = 900) {
      const y = await page.locator(sel).first().evaluate((e) => e.getBoundingClientRect().top);
      const steps = Math.max(1, Math.round(ms / 40));
      for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, (y - top) / steps); await wait(40); }
    },
    async drag(sel, dx, ms = 900) {
      const b = await m.to(sel, 600); await m.down(); await wait(80);
      await m.move(b.x + b.width / 2 + dx, b.y + b.height / 2, ms); await wait(80); await m.up();
    },
    // Drag a range input's thumb from its current value to `to`.
    async slide(sel, to, ms = 1000) {
      const el = page.locator(sel).first(); await el.scrollIntoViewIfNeeded();
      const r = await el.evaluate((e) => ({ min: +e.min, max: +e.max, v: +e.value }));
      const b = await el.boundingBox(), th = 8, xAt = (v) => b.x + th + ((v - r.min) / (r.max - r.min)) * (b.width - 2 * th);
      const y = b.y + b.height / 2;
      await m.move(xAt(r.v), y, 600); await m.down(); await wait(80); await m.move(xAt(to), y, ms); await wait(80); await m.up();
    },
    key: (k) => page.keyboard.press(k),
    async done() { console.log('DONE'); await wait(300); await browser.close(); py.stdin.end(); },
  };
  return m;
}
