#!/bin/bash
# encode.sh <project id> <raw.mp4> [poster seconds]: turns a bv recording into the site's clips and poster.
#   src/assets/demos/<id>.mp4   H.264, for Safari and anything without VP9
#   src/assets/demos/<id>.webm  VP9, for browsers built without H.264
#   src/assets/projects/<id>.jpg the poster: shown until the clip plays, and instead of it with reduced motion
# Both clips keep bv's 60 fps (the zoom and pointer move every frame) at 1280x800, which stays sharp in a card on a
# 2x screen. Static UI costs almost nothing per extra frame, so 60 fps adds little over 30.
set -e
cd "$(dirname "$0")/../.."
id=$1; raw=$2; at=${3:-0.4}
[ -f "$raw" ] || { echo "usage: encode.sh <id> <raw.mp4> [poster seconds]" >&2; exit 2; }
vf="scale=1280:-2:flags=lanczos,fps=60,format=yuv420p"
ffmpeg -y -v error -i "$raw" -an -vf "$vf" -c:v libx264 -preset veryslow -crf 30 -profile:v high -tune animation \
  -g 240 -movflags +faststart "src/assets/demos/$id.mp4"
ffmpeg -y -v error -i "$raw" -an -vf "$vf" -c:v libvpx-vp9 -b:v 0 -crf 46 -row-mt 1 -deadline good -cpu-used 2 \
  -g 240 -pass 1 -passlogfile "/tmp/vp9-$id" -f null /dev/null
ffmpeg -y -v error -i "$raw" -an -vf "$vf" -c:v libvpx-vp9 -b:v 0 -crf 46 -row-mt 1 -deadline good -cpu-used 2 \
  -g 240 -pass 2 -passlogfile "/tmp/vp9-$id" "src/assets/demos/$id.webm"
rm -f "/tmp/vp9-$id"*
ffmpeg -y -v error -ss "$at" -i "$raw" -frames:v 1 -vf "scale=1280:-2:flags=lanczos" -q:v 3 "src/assets/projects/$id.jpg"
ls -l "src/assets/demos/$id.mp4" "src/assets/demos/$id.webm" "src/assets/projects/$id.jpg" | awk '{printf "%8.0f KB  %s\n", $5/1024, $9}'
