#!/usr/bin/env bash
# Encodes a raw source clip into a home-cinema clip matching the established
# recipe (verified against hero-c0013.mp4 / moment-dough.mp4 / cocktail-pour.mp4
# via ffprobe: 25fps h264, faststart, landscape 1280x720 or portrait 720x1280)
# and grabs a same-size poster frame. Output lands directly in public/media/.
#
# Usage: scripts/encode-clip.sh <input> <start_seconds> <duration_seconds> <slug> [landscape|portrait] [poster_offset_seconds]
set -euo pipefail

if [ $# -lt 4 ]; then
  echo "Usage: $0 <input> <start_seconds> <duration_seconds> <slug> [landscape|portrait] [poster_offset_seconds]" >&2
  exit 1
fi

INPUT="$1"
START="$2"
DURATION="$3"
SLUG="$4"
ORIENTATION="${5:-landscape}"
POSTER_OFFSET="${6:-1}"

case "$ORIENTATION" in
  landscape) SCALE="1280:720" ;;
  portrait) SCALE="720:1280" ;;
  *) echo "orientation must be 'landscape' or 'portrait', got: $ORIENTATION" >&2; exit 1 ;;
esac

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$SCRIPT_DIR/../public/media"
OUT_VIDEO="$OUT_DIR/${SLUG}.mp4"
OUT_POSTER="$OUT_DIR/${SLUG}-poster.jpg"

ffmpeg -y -ss "$START" -i "$INPUT" -t "$DURATION" \
  -an -r 25 -vf "scale=${SCALE},setsar=1" \
  -c:v libx264 -preset slow -crf 26 -movflags +faststart \
  "$OUT_VIDEO"

ffmpeg -y -ss "$POSTER_OFFSET" -i "$OUT_VIDEO" -frames:v 1 -q:v 2 -update 1 "$OUT_POSTER"

echo "wrote $OUT_VIDEO"
echo "wrote $OUT_POSTER"
