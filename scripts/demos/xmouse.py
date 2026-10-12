# Reads "move X Y MS" / "click" / "down" / "up" lines on stdin and replays them through XTest, so the real X pointer moves.
import sys, time
from Xlib import X, display
from Xlib.ext import xtest
d = display.Display()
root = d.screen().root
def pos():
    p = root.query_pointer(); return p.root_x, p.root_y
for line in sys.stdin:
    a = line.split()
    if not a: continue
    if a[0] == 'move':
        x, y, ms = int(a[1]), int(a[2]), int(a[3])
        x0, y0 = pos(); n = max(1, ms // 12)
        for i in range(1, n + 1):
            t = i / n; e = t * t * (3 - 2 * t)
            xtest.fake_input(d, X.MotionNotify, x=round(x0 + (x - x0) * e), y=round(y0 + (y - y0) * e)); d.sync(); time.sleep(ms / 1000 / n)
    elif a[0] in ('click', 'down'):
        xtest.fake_input(d, X.ButtonPress, 1); d.sync()
        if a[0] == 'click': time.sleep(0.06); xtest.fake_input(d, X.ButtonRelease, 1); d.sync()
    elif a[0] == 'up':
        xtest.fake_input(d, X.ButtonRelease, 1); d.sync()
    print('ok', flush=True)
