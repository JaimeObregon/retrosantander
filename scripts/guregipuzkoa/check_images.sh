#!/bin/bash

processFile() {
  FILE=$1
  CLEAR_LINE="\r\033[K"
  printf "${CLEAR_LINE}${FILE}…"

  SIZE=($(identify -regard-warnings -format '%w %h %i\n' "$FILE" 2> /dev/null))

  if [ $? != 0 ] ; then
    printf "${CLEAR_LINE}${FILE} contiene errores.\n"
  else
    WIDTH=${SIZE[0]}
    HEIGHT=${SIZE[1]}

    if (( WIDTH < 128 || HEIGHT < 128 )); then
      printf "${CLEAR_LINE}${FILE} tiene unas dimensiones insuficientes (${WIDTH}×${HEIGHT}).\n"
    fi
  fi
}

export -f processFile
find . -type f | parallel processFile
