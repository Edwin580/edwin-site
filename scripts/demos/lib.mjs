import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const py = spawn('python3', [new URL('xmouse.py', import.meta.url).pathname], { stdio: ['pipe', 'pipe', 'inherit'] });
const lines = createInterface({ input: py.stdout })[Symbol.asyncIterator]();
const cmd = async (c) => { py.stdin.write(c + '\n'); await lines.next(); };
// The page is laid out at W x H CSS pixels (16:10) and drawn at DPR, so the recorded area is 1280x800 screen pixels:
// the same layout as a 1024px-wide laptop window, with text sharp enough to read once the clip is scaled into a card.
export const W = 1024, H = 640, DPR = Number(process.env.DEMO_DPR ?? 1.25);
// No scrollbars in the recording; pages still scroll with the wheel.
const NO_SCROLLBARS = `html{scrollbar-width:none}::-webkit-scrollbar{display:none}`;

export async function open(url) {
  // An app window has no tabs or toolbar, so nothing but the page is on screen.
  const ctx = await chromium.launchPersistentContext(mkdtempSync(join(tmpdir(), 'demo-')), {
    headless: false, viewport: null, ignoreDefaultArgs: ['--enable-automation'],
    args: [`--app=${url}`, '--window-position=0,0', `--window-size=${W},${H}`, `--force-device-scale-factor=${DPR}`,
      '--hide-crash-restore-bubble', '--test-type', '--autoplay-policy=no-user-gesture-required', '--disable-features=Translate'],
  });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  await page.addInitScript((css) => addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('style'); s.textContent = css; document.head.append(s);
  }), NO_SCROLLBARS);
  await page.goto(url);
  await page.addStyleTag({ content: NO_SCROLLBARS });
  await page.waitForLoadState('networkidle').catch(() => {});
  // Offline-first apps (Chapter, stems) install a service worker on the first visit and some reload once it takes
  // over. Let that happen now rather than under the pointer.
  const sw = await page.evaluate(() => navigator.serviceWorker?.getRegistration().then((r) => !!r)).catch(() => false);
  if (sw) {
    await page.waitForFunction(() => navigator.serviceWorker.controller, null, { timeout: 8000 }).catch(() => {});
    await wait(1500);
    await page.waitForLoadState('networkidle').catch(() => {});
  }
  // Size the window so the page itself is exactly W x H, whatever the window frame takes.
  const cdp = await ctx.newCDPSession(page);
  const { windowId } = await cdp.send('Browser.getWindowForTarget');
  const frame = await page.evaluate(() => ({ w: outerWidth - innerWidth, h: outerHeight - innerHeight }));
  await cdp.send('Browser.setWindowBounds', { windowId, bounds: { left: 0, top: 0, width: W + frame.w, height: H + frame.h } });
  await wait(400);
  const off = await page.evaluate(() => ({ x: screenX + (outerWidth - innerWidth), y: screenY + (outerHeight - innerHeight), w: innerWidth, h: innerHeight }));
  if (off.w !== W || off.h !== H) throw new Error(`page is ${off.w}x${off.h}, wanted ${W}x${H}`);
  const px = (v) => Math.round(v * DPR);
  console.log(`REGION ${px(W)}x${px(H)}+${px(off.x)}+${px(off.y)}`);
  const toScreen = (x, y) => [px(off.x + x), px(off.y + y)];
  while (!existsSync(new URL('go', import.meta.url))) await wait(100);
  const m = {
    browser: ctx, page,
    move: async (x, y, ms = 600) => cmd(`move ${toScreen(x, y).join(' ')} ${ms}`),
    async to(sel, ms = 600) {
      const el = page.locator(sel).first();
      // Off screen, or under a fixed bar (stems' bottom nav, for one): wheel it to the middle, as a person would.
      const hidden = await el.evaluate((e) => {
        const r = e.getBoundingClientRect(), x = r.x + r.width / 2, y = r.y + r.height / 2;
        if (y < 0 || y > innerHeight || x < 0 || x > innerWidth) return y - innerHeight / 2;
        const hit = document.elementFromPoint(x, y);
        return hit && (e === hit || e.contains(hit)) ? 0 : y - innerHeight / 2;
      });
      if (hidden) { await m.scroll(hidden, Math.max(6, Math.min(20, Math.round(Math.abs(hidden) / 40))), 35); await wait(250); }
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
    // Type like a person: one key at a time, with a little variation.
    async type(text, delay = 70) { for (const ch of text) { await page.keyboard.type(ch); await wait(delay * (0.7 + Math.random() * 0.6)); } },
    key: (k) => page.keyboard.press(k),
    async done() { console.log('DONE'); await wait(300); await ctx.close(); py.stdin.end(); },
  };
  return m;
}
