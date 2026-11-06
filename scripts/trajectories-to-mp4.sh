#!/usr/bin/env bash
# Convert all three planetesimal trajectory viewers to MP4s in ~/Downloads.
# Extra arguments are passed through, e.g. ./scripts/trajectories-to-mp4.sh --size 1000 --every 1
set -euo pipefail

repo="$(cd "$(dirname "$0")/.." && pwd)"
sims="$repo/public/assets/files/planetesimal-simulations"
out="$HOME/Downloads"

for model in homogeneous larson shu; do
  echo "== $model"
  node "$repo/scripts/trajectories-to-gif.mjs" "$sims/$model-trajectories.html" "$out/$model-trajectories.mp4" "$@"
done
