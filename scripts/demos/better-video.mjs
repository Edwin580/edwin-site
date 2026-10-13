// better-video's own demo: a real terminal on the left half of a 2048x640 screen runs bv,
// and bv records a sample page on the right half. better-video.sh records and assembles it.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createInterface } from 'node:readline';
const { OUT, GO } = process.env;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const py = spawn('python3', [new URL('xmouse.py', import.meta.url).pathname], { stdio: ['pipe', 'pipe', 'inherit'] });
const lines = createInterface({ input: py.stdout })[Symbol.asyncIterator]();
const cmd = async (c) => { py.stdin.write(c + '\n'); await lines.next(); };

const term = spawn('xterm', ['-u8', '-geometry', '54x20+0+0', '-fa', 'DejaVu Sans Mono', '-fs', '22', '-bg', '#1c1c1c', '-fg', '#e6e6e6',
  '-b', '28', '-bw', '0', '+sb', '-e', new URL('better-video-term.sh', import.meta.url).pathname],
  { stdio: 'ignore', env: { ...process.env, LANG: 'C.UTF-8', LC_ALL: 'C.UTF-8' } });
const browser = await chromium.launchPersistentContext(`${OUT}/profile`, { headless: false, viewport: null, ignoreDefaultArgs: ['--enable-automation'],
  args: ['--window-position=1024,0', '--window-size=1024,640', `--app=${new URL('sample/todo.html', import.meta.url).href}`, '--hide-crash-restore-bubble', '--test-type'],
  env: { ...process.env, GOOGLE_API_KEY: 'no', GOOGLE_DEFAULT_CLIENT_ID: 'no', GOOGLE_DEFAULT_CLIENT_SECRET: 'no' } });
await wait(1500);
const page = browser.pages()[0];
const off = await page.evaluate(() => ({ x: window.screenX + (outerWidth - innerWidth), y: window.screenY + (outerHeight - innerHeight) }));
const to = async (sel, ms = 700) => {
  const b = await page.locator(sel).first().boundingBox();
  await cmd(`move ${Math.round(off.x + b.x + b.width / 2)} ${Math.round(off.y + b.y + b.height / 2)} ${ms}`);
};
await cmd('move 1500 120 10');
console.log('READY');
while (!existsSync(GO)) await wait(100);
await wait(4200); // typing the command, then bv starting up
await to('#text'); await cmd('click'); await wait(300);
await page.keyboard.type('Record a demo', { delay: 70 }); await wait(400);
await to('form button', 600); await cmd('click'); await wait(1300);
await to('li:nth-child(2) input', 800); await cmd('click'); await wait(1300);
await to('li:nth-child(4) input', 700); await cmd('click'); await wait(1300);
await to('button[data-f="done"]', 800); await cmd('click'); await wait(1600);
await cmd('move 1700 560 900');
console.log('CLICKS DONE');
await wait(14000);
await browser.close(); term.kill(); py.stdin.end();
