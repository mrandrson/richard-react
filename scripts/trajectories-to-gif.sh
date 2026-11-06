#!/usr/bin/env bash
# Convert all three planetesimal trajectory viewers to GIFs (or MP4s with --mp4) in ~/Downloads.
# Other arguments are passed through, e.g. ./scripts/trajectories-to-gif.sh --mp4 --size 1000
set -euo pipefail

repo="$(cd "$(dirname "$0")/.." && pwd)"
sims="$repo/public/assets/files/planetesimal-simulations"
out="$HOME/Downloads"

ext=gif
args=()
for arg in "$@"; do
  if [[ "$arg" == --mp4 ]]; then ext=mp4; else args+=("$arg"); fi
done

for model in homogeneous larson shu; do
  echo "== $model"
  node "$repo/scripts/trajectories-to-gif.mjs" "$sims/$model-trajectories.html" "$out/$model-trajectories.$ext" ${args[@]+"${args[@]}"}
done
