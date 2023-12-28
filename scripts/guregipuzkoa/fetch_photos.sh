#!/bin/bash
# Véase la documentación en `/docs/guregipuzkoa.md`.

SITEMAP=$1
OUTPUT_PATH=$2
SCRIPT_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

"$SCRIPT_PATH/parse_sitemap.mjs" "$SITEMAP" | jq --raw-output '.[]|[.image, .id] | @tsv' |
  while IFS=$'\t' read -r URL OUTPUT; do
    ID=${OUTPUT//https:\/\/www.guregipuzkoa.eus\/photo/}
    ID=${ID//\//}

    CLEAR_LINE="\r\033[K"

    # Asumimos que el fichero es una imagen JPEG.
    # En un paso posterior lo comprobamos y corregimos si no lo es.
    OUTPUT_FILE="$OUTPUT_PATH/$ID.jpeg"

    if [[ ! -s "$OUTPUT_FILE" ]]; then
      printf "${CLEAR_LINE}Descargando $URL en ${OUTPUT_FILE}…\n"
      curl "$URL" --output "$OUTPUT_FILE" --no-progress-meter --connect-timeout 15 --max-time 30
    else
      printf "${CLEAR_LINE}Omitiendo el fichero existente ${OUTPUT_FILE}…"
    fi
  done
