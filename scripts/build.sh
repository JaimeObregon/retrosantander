#!/bin/bash
[[ -z "$PROJECT" ]] && { echo "La variable de entorno PROJECT no está definida." ; exit 1; }

yarn || exit 1

cp -aR httpdocs build
cp "httpdocs/$PROJECT/index.html" build/index.html

esbuild \
  httpdocs/modules/app.js \
  "httpdocs/assets/styles/themes/$PROJECT.css" \
  --format=esm \
  --bundle \
  --minify \
  --legal-comments=none \
  --external:"/assets/fonts/*" \
  --outdir=build \
