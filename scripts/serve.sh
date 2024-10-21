#!/bin/bash
[[ -z "$1" ]] && { echo "Uso: yarn run serve [PROJECT]" ; exit 1; }

esbuild \
  httpdocs/modules/app.js \
  "httpdocs/assets/styles/themes/$1.css" \
  --format=esm \
  --bundle \
  --minify \
  --legal-comments=none \
  --external:"/assets/fonts/*" \
  --outdir=build \
  --servedir=httpdocs \
  --serve-fallback="httpdocs/$1/index.html" \
  --watch
