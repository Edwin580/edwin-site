#!/bin/bash
# rec.sh <driver.mjs> <out.mp4> [bv flags...]: runs the driver, records its page area with bv, and stops bv (SIGINT) when the driver prints DONE.
set -e
cd "$(dirname "$0")"; drv=$1; out=$2; shift 2
rm -f drv.log go; DISPLAY=${DISPLAY:-:99} node "$drv" > drv.log 2>&1 & dpid=$!
until grep -q REGION drv.log; do sleep 0.2; done
region=$(grep -o 'REGION [^ ]*' drv.log | cut -d' ' -f2)
DISPLAY=${DISPLAY:-:99} "${BV:-bv}" record "$out" --display "${DISPLAY:-:99}" --region "$region" -w 1024 "$@" < /dev/null > bv.log 2>&1 & bpid=$!
sleep 0.6; touch go
until grep -q DONE drv.log; do sleep 0.2; if ! kill -0 $dpid 2>/dev/null; then cat drv.log; exit 1; fi; done
kill -INT $bpid; wait $bpid; tail -1 bv.log
