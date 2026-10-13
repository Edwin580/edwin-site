#!/bin/bash
# The terminal half of better-video's demo: types each command, then really runs it.
# Logs "<epoch seconds> <command>" to $LOG and touches $GO just before `bv record`.
cd "$OUT"
run() {
  printf '\e[1;34m~/demo\e[0m $ '; sleep 0.5
  for ((i = 0; i < ${#1}; i++)); do printf '%s' "${1:i:1}"; sleep 0.045; done
  sleep 0.4; echo
  echo "$(date +%s.%N) $1" >> "$LOG"
  eval "$1"
}
clear; sleep 0.8
run "bv doctor"; sleep 1.5
touch "$GO"
run "bv record todo.mp4 -z -d 11 --region 1024x640+1024+0"; sleep 0.8
run "ls -lh todo.mp4"
echo "$(date +%s.%N) end" >> "$LOG"
sleep 60
