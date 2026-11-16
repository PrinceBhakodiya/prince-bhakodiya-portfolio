#!/usr/bin/env bash
# Static deploy of princebhakodiya.in to GCP `prince-instances` (35.223.123.30).
# nginx (aaPanel) serves /www/wwwroot/princebhakodiya.in directly.
# Other folders in that root (pocketse, spider-tracker, .well-known) are kept.
set -euo pipefail

ZONE="us-central1-a"
INSTANCE="prince-instances"
PROJECT="antoc-crm"
WEB_ROOT="/www/wwwroot/princebhakodiya.in"
KEEP=(pocketse spider-tracker .well-known .user.ini .htaccess)

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "Building static export..."
npm run build
test -f out/index.html

TARBALL="$(mktemp -t portfolio).tgz"
COPYFILE_DISABLE=1 tar --no-xattrs -czf "$TARBALL" -C out .

echo "Uploading..."
gcloud compute scp "$TARBALL" "$INSTANCE:/tmp/portfolio.tgz" \
  --zone "$ZONE" --project "$PROJECT" --quiet
rm -f "$TARBALL"

# find(1) filter that skips everything in KEEP (the VM has no rsync)
SKIP=""
for k in "${KEEP[@]}"; do SKIP+=" ! -name '$k'"; done

echo "Publishing to $WEB_ROOT..."
gcloud compute ssh "$INSTANCE" --zone "$ZONE" --project "$PROJECT" --quiet --command "
  set -e
  STAMP=\$(date +%Y%m%d-%H%M%S)
  BACKUP=/www/backup/princebhakodiya.in/site-\$STAMP.tgz
  sudo mkdir -p /www/backup/princebhakodiya.in
  sudo tar -czf \$BACKUP -C $WEB_ROOT .
  rm -rf /tmp/portfolio-out && mkdir -p /tmp/portfolio-out
  tar -xzf /tmp/portfolio.tgz -C /tmp/portfolio-out
  sudo find $WEB_ROOT -mindepth 1 -maxdepth 1 $SKIP -exec rm -rf {} +
  sudo cp -a /tmp/portfolio-out/. $WEB_ROOT/
  cd /tmp/portfolio-out && for f in * .[!.]*; do [ -e \"\$f\" ] && sudo chown -R www:www \"$WEB_ROOT/\$f\"; done; cd /
  rm -rf /tmp/portfolio-out /tmp/portfolio.tgz
  # Next.js exports share images as extensionless 'opengraph-image' files; serve them as PNG
  OG_CONF=/www/server/panel/vhost/nginx/extension/princebhakodiya.in/og-images.conf
  if [ ! -f \$OG_CONF ]; then
    echo 'location ~ /opengraph-image\$ { default_type image/png; expires 7d; }' | sudo tee \$OG_CONF >/dev/null
    sudo /www/server/nginx/sbin/nginx -t -c /www/server/nginx/conf/nginx.conf && sudo /www/server/nginx/sbin/nginx -s reload -c /www/server/nginx/conf/nginx.conf
  fi
  echo \"Backup of previous site: \$BACKUP\"
"

echo "Live: https://princebhakodiya.in"
