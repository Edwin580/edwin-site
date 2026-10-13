#!/bin/bash
# better-video.sh <out.mp4>: records better-video's demo and assembles it. Needs Xvfb on :98 at 2048x640
# (Xvfb :98 -screen 0 2048x640x24), xterm, ffmpeg, bv, Playwright and python-xlib.
# One bv records the terminal on the left; the bv typed in that terminal records the sample page on the right with -z.
# The clip is the terminal up to `bv record`, then the page as that bv exported it, then the terminal again.
set -e
cd "$(dirname "$0")"; final=$(realpath -m "$1")
export DISPLAY=:98 OUT=$(mktemp -d); export GO=$OUT/go LOG=$OUT/log
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
echo "$final"
