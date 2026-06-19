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

# Disable Pull Zone default browser cache (let Edge Rules control it)
CURRENT_CACHE=$(echo "$PULL_ZONE_DATA" | python3 -c "import sys,json;print(json.load(sys.stdin).get('CacheControlPublicMaxAgeOverride', -999))")
if [ "$CURRENT_CACHE" != "0" ]; then
  api POST "/pullzone/${PULL_ZONE_ID}" -d '{"CacheControlPublicMaxAgeOverride": 0}' > /dev/null 2>&1 && \
    echo "   Set CacheControlPublicMaxAgeOverride to 0 (no default browser cache)" || \
    echo "   Failed to update CacheControlPublicMaxAgeOverride"
else
  echo "   CacheControlPublicMaxAgeOverride already 0"
fi

# Helper: get existing edge rule Guid by description (empty if not found)
get_rule_guid() {
  local desc="$1"
  echo "$PULL_ZONE_DATA" | python3 -c "
import sys, json
pz = json.load(sys.stdin)
rules = pz.get('EdgeRules', [])
matches = [r['Guid'] for r in rules if r.get('Description') == '$desc']
print(matches[0] if matches else '')
"
}

# Helper: upsert edge rule (always update, never skip)
upsert_rule() {
  local desc="$1" payload="$2"
  local guid
  guid=$(get_rule_guid "$desc")
  if [ -n "$guid" ]; then
    # Inject Guid into payload to update existing rule
    payload=$(echo "$payload" | python3 -c "
import sys, json
d = json.load(sys.stdin)
d['Guid'] = '$guid'
print(json.dumps(d))
")
  fi
  api POST "/pullzone/${PULL_ZONE_ID}/edgerules/addOrUpdate" -d "$payload" > /dev/null
}

# Rule 1: Long cache for hashed assets (_astro/*)
upsert_rule "immutable-assets" '{
  "ActionType": 5,
  "ActionParameter1": "Cache-Control",
  "ActionParameter2": "public, max-age=31536000, immutable",
  "Triggers": [{"Type": 0, "PatternMatches": ["*/_astro/*"], "PatternMatchingType": 0}],
  "TriggerMatchingType": 0,
  "Description": "immutable-assets",
  "Enabled": true
}' && echo "   Edge rule: immutable-assets (_astro/* → long cache)" || \
  echo "   ERROR: Failed to set immutable-assets rule" >&2

# Rule 2: charset=utf-8 for .txt files (llms.txt, llms-full.txt)
upsert_rule "charset-utf8-for-txt" '{
  "ActionType": 5,
  "ActionParameter1": "Content-Type",
  "ActionParameter2": "text/plain; charset=utf-8",
  "Triggers": [{"Type": 0, "PatternMatches": ["*.txt"], "PatternMatchingType": 0}],
  "TriggerMatchingType": 0,
  "Description": "charset-utf8-for-txt",
  "Enabled": true
}' && echo "   Edge rule: charset-utf8-for-txt (*.txt → UTF-8)" || \
  echo "   ERROR: Failed to set charset-utf8-for-txt rule" >&2

# Rule 3: No browser cache for everything else (HTML pages, sitemap, etc.)
upsert_rule "no-cache-html" '{
  "ActionType": 5,
  "ActionParameter1": "Cache-Control",
  "ActionParameter2": "no-cache, must-revalidate",
  "Triggers": [{"Type": 0, "PatternMatches": ["*/_astro/*"], "PatternMatchingType": 2}],
  "TriggerMatchingType": 0,
  "Description": "no-cache-html",
  "Enabled": true
}' && echo "   Edge rule: no-cache-html (non-asset files → revalidate)" || \
  echo "   ERROR: Failed to set no-cache-html rule" >&2
