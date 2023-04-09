#/bin/bash
# Véase la documentación en `/docs/guregipuzkoa.md`.

SITEMAP=$1
OUTPUT_DIRECTORY=$2
START_FROM=${3:-"1"}

SKIP=true

node parse_sitemap.mjs $SITEMAP | jq --raw-output '.[]|[.image, .id] | @tsv' |
  while IFS=$'\t' read -r URL OUTPUT; do
    ID=$(echo $OUTPUT | sed -e "s/https:\/\/www.guregipuzkoa.eus\/photo//" -e "s/\///g")

    if [[ "$ID" == "$START_FROM" ]]; then
      SKIP=false
    fi

    if [[ "$SKIP" = false ]]; then
      OUTPUT="$OUTPUT_DIRECTORY/$ID"
      printf "\r\033[KDescargando $URL en ${OUTPUT}… "
      curl "$URL" --output "$OUTPUT" --no-progress-meter --connect-timeout 15 --max-time 30
    fi
  done
