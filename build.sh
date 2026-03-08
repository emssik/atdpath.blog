#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Load .env
if [ -f .env ]; then
  source .env
else
  echo "Error: .env not found" >&2
  exit 1
fi

if [ -z "${BUNNY_API_KEY:-}" ]; then
  echo "Error: BUNNY_API_KEY not set in .env" >&2
  exit 1
fi

ZONE="atdpath-blog"
REGION="DE"
DEPLOY_SCRIPT="$HOME/.claude/skills/bunny-scripts/scripts/deploy-static.sh"

echo ">> Kontrola projektów PIY..."
bash "$SCRIPT_DIR/.dev/check-projects.sh"

echo ""
echo ">> Building site..."
npm run build

echo ""
echo ">> Deploying to Bunny CDN..."
BUNNY_API_KEY="$BUNNY_API_KEY" bash "$DEPLOY_SCRIPT" ./dist --zone "$ZONE" --region "$REGION"
