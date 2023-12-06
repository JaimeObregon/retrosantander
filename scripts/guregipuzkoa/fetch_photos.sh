#/bin/bash
# Véase la documentación en `/docs/guregipuzkoa.md`.

SITEMAP=$1
OUTPUT_DIRECTORY=$2

./parse_sitemap.mjs $SITEMAP | jq --raw-output '.[]|[.image, .id] | @tsv' |
  while IFS=$'\t' read -r URL OUTPUT; do
    ID=$(echo $OUTPUT | sed -e "s/https:\/\/www.guregipuzkoa.eus\/photo//" -e "s/\///g")
    OUTPUT="$OUTPUT_DIRECTORY/$ID"

    if [[ ! -s "$OUTPUT" ]]; then
      printf "\r\033[KDescargando $URL en ${OUTPUT}… "
      curl "$URL" --output "$OUTPUT" --no-progress-meter --connect-timeout 15 --max-time 30
    else
      printf "\r\033[KEl fichero ${OUTPUT} ya existe. Omitiendo… "
    fi
  done
