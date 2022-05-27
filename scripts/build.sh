#!/bin/bash
[[ -z "$SITE" ]] && { echo "La variable de entorno SITE no está definida." ; exit 1; }
cd httpdocs && cp $SITE/index.html index.html
