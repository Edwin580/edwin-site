#!/bin/bash
# better-video.sh <out.mp4> [picker.gif]: records better-video's demo and assembles it. Needs Xvfb on :98 at 2048x640
# (Xvfb :98 -screen 0 2048x640x24), xterm, ffmpeg, bv, Playwright and python-xlib.
# One bv records the terminal on the left; the bv typed in that terminal records the sample page on the right with -z.
# The clip is the terminal up to `bv record`, then the page as that bv exported it, then the terminal again.
set -e
cd "$(dirname "$0")"; final=$(realpath -m "$1")
# The terminal works in ~/demo, so the path bv prints matches the prompt.
export DISPLAY=:98 OUT=$HOME/demo; rm -rf "$OUT"; mkdir -p "$OUT"; export GO=$OUT/go LOG=$OUT/log
node better-video.mjs > "$OUT/drv.log" 2>&1 &
until grep -q READY "$OUT/drv.log"; do sleep 0.2; done
start=$(date +%s.%N)
"${BV:-bv}" record "$OUT/term.mp4" --display :98 --region 1024x640+0+0 -w 1024 < /dev/null > "$OUT/bv.log" 2>&1 & bpid=$!
until grep -q ' end$' "$LOG" 2>/dev/null; do sleep 0.2; done
sleep 2.5; kill -INT $bpid; wait $bpid
# Seconds into the terminal recording when `bv record` was run.
rec=$(awk -v s="$start" '/ bv record /{ printf "%.2f", $1 - s }' "$LOG")
cut=$(echo "$rec + 1.6" | bc); back=$(echo "$rec + 11.6" | bc)
ffmpeg -y -v error -i "$OUT/term.mp4" -i "$OUT/todo.mp4" -filter_complex "\
[0:v]trim=0:$cut,setpts=PTS-STARTPTS,fps=24,scale=1024:640,setsar=1[a];\
[1:v]fps=24,scale=1024:640,setsar=1,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf:text='todo.mp4':fontcolor=white:fontsize=22:box=1:boxcolor=0x1c1c1cDD:boxborderw=12:x=24:y=h-th-28[b];\
[0:v]trim=start=$back,setpts=PTS-STARTPTS,fps=24,scale=1024:640,setsar=1[c];\
[a][b][c]concat=n=3:v=1:a=0[v]" -map '[v]' -c:v libx264 -crf 18 -pix_fmt yuv420p "$final"
# The tray app's area picker and options bar are Windows-only, so they come from a real Windows recording:
# pr15-picker.gif on better-video's pr-assets branch. A wide shot of the area being dragged out, then a crop on the
# bar as its options are picked and the countdown starts. It plays before the terminal.
if [ -n "$2" ]; then
  font=/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf
  ffmpeg -y -v error -i "$2" -i "$2" -i "$final" -filter_complex "\
[0:v]trim=4.5:9,setpts=PTS-STARTPTS,fps=24,crop=784:490:88:0,scale=1024:640:flags=lanczos,setsar=1[w];\
[1:v]trim=13:22.4,setpts=PTS-STARTPTS,fps=24,crop=480:300:200:125,scale=1024:640:flags=lanczos,setsar=1[n];\
[w][n]concat=n=2:v=1:a=0,drawtext=fontfile=$font:text='bv tray on Windows':fontcolor=white:fontsize=22:box=1:boxcolor=0x1c1c1cDD:boxborderw=12:x=24:y=28[ui];\
[ui][2:v]concat=n=2:v=1:a=0[v]" -map '[v]' -c:v libx264 -crf 18 -pix_fmt yuv420p "$OUT/full.mp4"
  mv "$OUT/full.mp4" "$final"
fi
echo "$final"
