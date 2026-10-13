# Project demos

Each `<project id>.mjs` drives that project's live site in Chromium while [better-video](https://github.com/Edwin580/better-video)
(`bv`) records the page, zooming in on each click. The real X pointer is moved through XTest (`xmouse.py`), so the cursor
shows up in the recording and `bv` can follow it.

Needs Linux with Xvfb, ffmpeg, `bv`, Playwright, and `python-xlib`.

```sh
Xvfb :99 -screen 0 1280x800x24 &
npm i --no-save playwright && npx playwright install chromium
pip install python-xlib
./rec.sh receipts.mjs raw.mp4 -z --zoom-level 1.5    # brightness-perception uses --zoom-level 1.2
# Shrink for the site:
ffmpeg -i raw.mp4 -an -vf "scale=960:-2,fps=24" -c:v libx264 -preset veryslow -crf 30 -pix_fmt yuv420p \
  -movflags +faststart ../../src/assets/demos/receipts.mp4
```

To record a branch that isn't live yet, serve it locally and point the driver at it with `DEMO_URL`, for example
`DEMO_URL=http://localhost:8104/ ./rec.sh receipts.mjs raw.mp4 -z --zoom-level 1.5`. The poster in
`src/assets/projects/<id>.jpg` is a frame from the start of the recording:

```sh
ffmpeg -ss 0.3 -i raw.mp4 -frames:v 1 -vf scale=960:-2 -q:v 4 ../../src/assets/projects/receipts.jpg
```

`better-video` has its own script, since its clip shows bv itself and none of the other projects. On a 2048x640 screen, a
real terminal on the left runs `bv doctor` and `bv record todo.mp4 -z` while a second bv records the terminal, and
the sample page in `sample/todo.html` on the right gets clicked. The clip cuts from the terminal to `todo.mp4` and back:

The tray app's area picker and options bar (GIF or MP4, size, clicks, zoom) only run on Windows, so the clip opens
with a crop of a real Windows recording of them, `pr15-picker.gif` from better-video's `pr-assets` branch:

```sh
Xvfb :98 -screen 0 2048x640x24 &
git -C ../better-video show origin/pr-assets:pr15-picker.gif > picker.gif
./better-video.sh raw.mp4 picker.gif    # needs xterm too
```
