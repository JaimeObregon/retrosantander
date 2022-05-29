#!/bin/bash
[[ -z "$PROJECT" ]] && { echo "La variable de entorno PROJECT no está definida." ; exit 1; }
cd httpdocs && cp $PROJECT/index.html index.html
