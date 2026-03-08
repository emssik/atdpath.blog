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

# --- Cache control Edge Rules ---
echo ""
echo ">> Configuring browser cache rules..."

API_BASE="https://api.bunny.net"
api() {
  local method="$1" path="$2"; shift 2
  curl -sf -X "$method" "${API_BASE}${path}" \
    -H "AccessKey: ${BUNNY_API_KEY}" \
    -H "Content-Type: application/json" \
    "$@"
}

# Find Pull Zone ID for our storage zone
STORAGE_ZONE_ID=$(api GET "/storagezone" | \
  python3 -c "import sys,json;zones=json.load(sys.stdin);matches=[z for z in zones if z['Name']=='$ZONE'];print(matches[0]['Id'] if matches else '')")

PULL_ZONE_DATA=$(api GET "/pullzone" | \
  python3 -c "
import sys, json
data = json.load(sys.stdin)
items = data.get('Items', data) if isinstance(data, dict) else data
matches = [z for z in items if z.get('StorageZoneId') == $STORAGE_ZONE_ID]
print(json.dumps(matches[0]) if matches else '')
")

PULL_ZONE_ID=$(echo "$PULL_ZONE_DATA" | python3 -c "import sys,json;print(json.load(sys.stdin)['Id'])")

# Check if cache rules already exist
EXISTING_RULES=$(echo "$PULL_ZONE_DATA" | python3 -c "
import sys, json
pz = json.load(sys.stdin)
rules = pz.get('EdgeRules', [])
descs = [r.get('Description','') for r in rules]
print('|'.join(descs))
")

# Rule 1: Long cache for hashed assets (_astro/*)
if echo "$EXISTING_RULES" | grep -q "immutable-assets"; then
  echo "   Edge rule 'immutable-assets' already exists, skipping"
else
  api POST "/pullzone/${PULL_ZONE_ID}/edgerules/addOrUpdate" -d '{
    "ActionType": 5,
    "ActionParameter1": "Cache-Control",
    "ActionParameter2": "public, max-age=31536000, immutable",
    "Triggers": [{"Type": 0, "PatternMatches": ["*/_astro/*"], "PatternMatchingType": 0}],
    "TriggerMatchingType": 0,
    "Description": "immutable-assets",
    "Enabled": true
  }' > /dev/null 2>&1 && echo "   Added edge rule: immutable-assets (_astro/* → long cache)" || \
    echo "   Failed to add immutable-assets rule"
fi

# Rule 2: No browser cache for everything else (HTML pages, sitemap, etc.)
if echo "$EXISTING_RULES" | grep -q "no-cache-html"; then
  echo "   Edge rule 'no-cache-html' already exists, skipping"
else
  api POST "/pullzone/${PULL_ZONE_ID}/edgerules/addOrUpdate" -d '{
    "ActionType": 5,
    "ActionParameter1": "Cache-Control",
    "ActionParameter2": "no-cache, must-revalidate",
    "Triggers": [{"Type": 0, "PatternMatches": ["*/_astro/*"], "PatternMatchingType": 2}],
    "TriggerMatchingType": 0,
    "Description": "no-cache-html",
    "Enabled": true
  }' > /dev/null 2>&1 && echo "   Added edge rule: no-cache-html (non-asset files → revalidate)" || \
    echo "   Failed to add no-cache-html rule"
fi
