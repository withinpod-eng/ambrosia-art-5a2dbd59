#!/bin/bash
set -e
ROOT="/dev-server"
DIST="$ROOT/dist"
OUT="$DIST/static"
PORT=8787

cd "$DIST/server"

# kill any existing wrangler
pkill -f "wrangler dev" 2>/dev/null || true
sleep 1

echo "→ booting wrangler..."
bunx wrangler dev --port $PORT --ip 127.0.0.1 --local --no-show-interactive-dev-session > /tmp/wrangler.log 2>&1 &
WPID=$!

# wait for ready
for i in $(seq 1 30); do
  if curl -sf -o /dev/null http://127.0.0.1:$PORT/; then
    echo "→ wrangler ready"
    break
  fi
  sleep 1
done

# fresh output
rm -rf "$OUT"
mkdir -p "$OUT"

# copy client assets (bundles, images, etc)
cp -r "$DIST/client/"* "$OUT/"

# crawl each route
ROUTES=("/" "/menu" "/about" "/cart" "/contact")
for route in "${ROUTES[@]}"; do
  echo "→ rendering $route"
  if [ "$route" = "/" ]; then
    out="$OUT/index.html"
  else
    dir="$OUT${route}"
    mkdir -p "$dir"
    out="$dir/index.html"
  fi
  curl -sf "http://127.0.0.1:$PORT$route" -o "$out"
  size=$(wc -c < "$out")
  echo "   $out ($size bytes)"
done

# 404 fallback uses home
cp "$OUT/index.html" "$OUT/404.html"

# Netlify SPA redirect (works for any unknown deep-link too)
echo "/* /index.html 200" > "$OUT/_redirects"

# kill wrangler
kill $WPID 2>/dev/null || true
pkill -f "wrangler dev" 2>/dev/null || true

echo ""
echo "✅ Static site at: $OUT"
ls -la "$OUT" | head -20
