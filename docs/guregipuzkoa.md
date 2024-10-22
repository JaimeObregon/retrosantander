# GureGipuzkoa

[guregipuzkoa.eus](https://guregipuzkoa.eus) es el portal que aloja el archivo fotográfico de la Diputación Foral de Gipuzkoa. Es un desarrollo sobre WordPress que sustituyó hacia 2011 a uno previo, más completo y ambicioso.

Para elaborar [guregipuzkoa.com](https://guregipuzkoa.com) he necesitado acceder a este archivo. Aunque cuento con autorización de la Diputación, me ha parecido más rápido y directo hacer _scraping_ de los contenidos del portal oficial que solicitar las credenciales de acceso como administrador.

A continuación documento el proceso de _scraping_ y manipulación de las fotografías y metadatos contenidos en guregipuzkoa.eus a que he llegado haciendo ingeniería inversa del portal. Este proceso comprende los pasos que se describen en este documento.

Mi proyecto guregipuzkoa.com está alojado en Netlify, pero el archivo fotográfico y todos sus metadatos se sirven desde Amazon S3. Para este fin he creado el _bucket_ `guregipuzkoa` en la región `eu-south-2` (Zaragoza), que tiene una menor latencia desde España.

# 1. Obtención de todas las URL del portal

Para descargar las fotografías del archivo primero es necesario obtener una lista con todas sus URL. Para ello:

1. Accedo al _sitemap_ del portal:

   [https://www.guregipuzkoa.eus/sitemap-index.xml](https://www.guregipuzkoa.eus/sitemap-index.xml)

   Este recurso enlaza a cuatro _sitemaps_ parciales. Son ficheros con XML mal formado, y por lo tanto no podemos procesarlos con herramientas para XML. Usaremos expresiones regulares.

2. Descargo y concateno todos los _sitemaps_:

   ```console
   curl https://www.guregipuzkoa.eus/sitemap/sitemap-image\[1-4\].xml > sitemap.txt
   ```

   Esto resulta en un fichero `sitemap.txt` de unos 100 MB.

3. Proceso este fichero con el _script_ `parse_sitemap.js`:

   ```console
   ./parse_sitemap.js sitemap.txt
   ```

   Este _script_ excluye de la salida algunos objetos cuyas fotografías están corrompidas o no tienen unas dimensiones adecuadas, tal como se explica más adelante.

# 2. Descarga de las fotografías

El proceso anterior devuelve una estructura JSON de unos 159000 elementos. Cada elemento tiene una propiedad `id` con la forma `https://www.guregipuzkoa.eus/photo/[n]/`, donde he comprobado que `[n]` es un identificador unívoco. Cada elemento tiene también una propiedad `image` que es la URL de la fotografía.

Para descargar sucesivamente todas las fotografías del portal:

```console
mkdir originals
./fetch_photos.sh sitemap.txt originals
```

Siendo el primer argumento la ruta al fichero `sitemap.xml` y el segundo el directorio en el que se guardarán las fotografías descargadas.

El _script_ omite la descarga de aquellas que ya existan en el directorio de destino, de modo que es seguro interrumpir la descarga y retomarla sin más que correr nuevamente el _script_.

También asigna la extensión `.jpeg` a todos los ficheros descargados. Esto se revisa —y, cuando es necesario, corrige— en el paso siguiente.

Cualquier error durante la descarga se escribe en `stderr`. Para reintentar la descarga de las rutas fallidas basta correr de nuevo el _script_.

La descarga puede llevar más de 30 horas y el archivo fotográfico así descargado ocupa 120 GB.

# 3. Asignación de extensión

No podemos confiar en las extensiones de los ficheros citados en el _sitemap_, porque refieren indistintamente `jpg`, `JPG` o `jpeg`. O porque un par de fotografías están en formato PNG pero tienen extensión `jpg`. O porque, sencillamente, no es prudente asumir que las extensiones concuerden siempre con el formato del archivo. Así que el paso anterior descarga asigna a todos los ficheros la extensión `.jpeg` y ahora es preciso comprobar cada uno y renombrar aquellos que sean de otro tipo:

```bash
for i in *; do
  EXTENSION=$(file --extension $i | awk '{split($2,a,"/"); print a[1]}')
  printf "\r\033[K$i…"
  rename --verbose --remove-extension --append ".$EXTENSION" "$i"
done
```

Esto devuelve solo dos ficheros con extensión incorrecta, que son dos imágenes en formato PNG. Los convertimos manualmente a formato JPEG:

```bash
mv 154344.jpeg 154344.png && convert 154344.png 154344.jpeg && rm 154344.png
mv 154387.jpeg 154387.png && convert 154387.png 154387.jpeg && rm 154387.png
```

# 4. Filtrado de fotografías corruptas e inválidas

Algunas fotografías del portal oficial están [corruptas](https://www.guregipuzkoa.eus/photo/104194/) o [incompletas](https://www.guregipuzkoa.eus/photo/153281). Otras son panorámicas o tienen [una resolución demasiado baja](https://www.guregipuzkoa.eus/photo/45861/) como para ser utilizadas.

Se hace preciso detectar estas imágenes para luego incorporarlas manualmente a la lista de los `id` en `parse_sitemap.js` que son ignorados al procesar el _sitemap_. Estas imágenes, menos de doscientas, quedarán así excluidas del nuevo portal.

El _script_ `check_images.sh`devolverá por _stdout_ cuáles son. Las incorporamos manualmente a la lista de exclusión en `parse_sitemap.js` y las eliminamos del sistema de ficheros.

# 5. Extracción de los metadatos Exif

[Es interesante](https://x.com/JaimeObregon/status/1646082167787618304) extraer los metadatos Exif del archivo fotográfico. La utilidad `exiftool` permite exportar estos metadatos en forma JSON:

```bash
CLEAR_LINE="\r\033[K"

for FILE in *; do
  OUTPUT="../../exif/${FILE%.jpeg}.json"
  if [[ ! -s "$OUTPUT" ]]; then
    printf "\nExtrayendo metadatos de ${FILE} a ${OUTPUT}…\n"
    exiftool -json -unknown -duplicates "$FILE" > "$OUTPUT"
  else
    printf "${CLEAR_LINE}${OUTPUT} ya existe, omitiendo…"
  fi
done
```

Los ficheros JSON así generados ocupan unos 700 MB.

# 6. Descarga de los metadatos de GureGipuzkoa

En el WordPress del portal oficial existe una ruta AJAX que devuelve en forma JSON metadatos de las fotografías tales como sus etiquetas, comentarios de usuarios y otra información relevante. Tiene esta forma:

```
https://www.guregipuzkoa.eus/nextgen-pro-lightbox-gallery/www.guregipuzkoa.eus/?photocrati_ajax=1&action=get_comments&page=0&type=image&id=3730
```

Nótese el parámetro `id`, al que descubro que puede pasarse una lista de hasta diez `id` separados por comas, y el servidor devuelve los metadatos de todos:

```
https://www.guregipuzkoa.eus/nextgen-pro-lightbox-gallery/www.guregipuzkoa.eus/?photocrati_ajax=1&action=get_comments&page=0&type=image&id=3730,3731,3732,3733,3734,3735,3736,3737,3738,3739
```

Si alguno de los `id` facilitados no corresponde con ninguna fotografía, el servidor devuelve una respuesta con contenidos que no están vacíos.

Para descargar todos los metadatos, paso el _sitemap_ interpretado por `stdin` a `fetch_metadata.js`. Este _script_ descarga los metadatos de las fotografías referenciadas en el _sitemap_ y los guardará como ficheros JSON en la ruta que reciba como primer parámetro:

```bash
mkdir json
./parse_sitemap.js sitemap.txt | ./fetch_metadata.js json
```

Las respuestas JSON así descargadas ocupan 738 MB.

# 7. Carga en S3 y transcodificación

He desplegado una función en Amazon Lambda que transcodifica las imágenes al formato optimizado AVIF. Se activa automáticamente mediante un disparador (_trigger_) que [he configurado](https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-event-notifications.html) en el _bucket_ `guregipuzkoa-temp` y que aplica la función cuando se deposita un objeto en la ruta `/images` de dicho _bucket_. Esta función lambda hace lo siguiente:

1. Toma la imagen subida al _bucket_ `guregipuzkoa-temp` y la transcodifica a formato AVIF, optimizándola en tamaño y recortándola si es preciso para reducir sus tiempos de descarga, y la deposita en la ruta adecuada del _bucket_ `guregipuzkoa` (`/optimized/`).

1. Copia la imagen original a la ruta adecuada del _bucket_ de destino `guregipuzkoa` (`/originals/images/`), para su conservación.

1. Elimina la imagen original del _bucket_ `guregipuzkoa-temp`.

Hacemos la transcodificación en AWS porque puede ser lenta y conllevar, para algunas fotografías, incluso más de 45 segundos.

El _script_ `upload.js` realiza la subida al bucket `guregipuzkoa-temp` de S3, lo que provoca la aplicación de la función lambda sobre cada fichero subido y, por lo tanto, su transcodificación automática. Se invoca así:

```bash
./parse_sitemap.js sitemap.txt | ./upload.js
```

Este _script_ lista todos los objetos almacenados en la ruta `/originals/images/` del _bucket_ `guregipuzkoa` y los compara con los `id` obtenidos del _sitemap_ que recibe por `stdin`, cargando a la ruta `/images` de `guregipuzkoa-temp` aquellos faltantes, para que se dispare así la función lambda que los toma de allí, guarda transcodificados en la ruta `/optimized/` del _bucket_ `guregipuzkoa`, y mueve después el fichero cargado original a la ruta `/originals/images/`, de este mismo _bucket_.

Al final del proceso solo quedan en `s3://guregipuzkoa-temp/images/` los ficheros que la función lambda no ha podido transcodificar, que son en torno a un centenar. Un vistazo a los _logs_ de la función lambda en AWS CloudWatch muestra, básicamente, dos razones: `Error: VipsJpeg: Premature end of input file` y `Task timed out`.

Decido descargarlos para ver cuáles son:

````console
aws s3 sync s3://guregipuzkoa-temp guregipuzkoa-temp

Y convertirlos yo en local:

```console
convert xxx.jpeg -quality 65 -resize '2000x1500>' optimized/xxx.avif
````

Para subirlos manualmente después.

# 8. Procesado con visión artificial

Proceso cada imagen con las API `detect-faces` y `detect-lables` de AWS Rekognition.

En 2022 ya procesé de esta manera, para Retrogipuzkoa.com, la colección de Jesús Elósegui. Podría reaprovechar ese trabajo y ahorrar así unos 30 euros en costes de AWS, pero decido reprocesarla porque el modelo de visión artificial de Amazon ha sido actualizado en este tiempo y proporciona ahora resultados mejores. También porque ello me evitará hacer un renombrado complejo de los ficheros de Retrogipuzkoa para adaptarlos a la nueva nomenclatura que he adoptado en GureGipuzkoa.

El _bucket_ `guregipuzkoa` está en la región `eu-south-2` (España). Rekognition es más barato en `eu-west-1`, así que copio el archivo fotográfico a un nuevo _bucket_ temporal creado en esta región:

```console
aws s3 sync s3://guregipuzkoa/originals/images/ s3://guregipuzkoa-rekognition/images/ --source-region eu-south-2 --region eu-west-1
```

El _script_ `process_image.sh` recibe como primer parámetro el nombre de una imagen, la busca en S3 y salva en el sistema de ficheros local dos ficheros JSON con los resultados de aplicar `detect-faces` y `detect-labels` sobre ella. El _script_ salta aquellas imágenes para las que ya existen los resultados JSON porque ya han sido procesadas.

Corro el _script_ en paralelo para maximizar la eficiencia del proceso:

```bash
find originals/images -type f | xargs -n 1 -P 8 -I {} ./process_image.sh {}
```

Este proceso conlleva varios días y cuesta unos 350 euros.

La lista de etiquetas reconocidas por Rekognition pueden descargarse desde [Detecting objects and concepts](https://docs.aws.amazon.com/rekognition/latest/dg/labels.html). Las versiones 2 y 3 las he descargado y guardado en [`private/guregipuzkoa/varios`](private/guregipuzkoa/varios) Esporádicamente Amazon actualiza el listado.

Finalizado el proceso, busco ficheros vacíos, demasiado pequeños o que no contengan JSON válido, y los reproceso.

# 9. Construcción de los ficheros de metadatos

Extraigo a un directorio `summaries`, para cada fotografía del archivo, sus metadatos contenidos en el _sitemap_:

```bash
parse_sitemap.js ../sitemap.txt > sitemap.json

mkdir summaries

jq -c '.[]' sitemap.json | while IFS= read -r json; do
  id=$(jq -r '.id' <<< "$json" | sed -n 's|.*/photo/\([0-9]*\)/.*|\1|p')
  printf '%s' "$json" > "summaries/$id.json"
done
```

Ahora tengo, para cada imagen, cinco ficheros JSON:

- `exif`, con los metadatos EXIF
- `details`, con los detalles descargados del portal oficial
- `summary`, con los detalles obtenidos del _sitemap_
- `faces`, generado por la visión artificial
- `labels`, generados por la visión artificial

Cada uno de estos cinco directorios contiene tantos ficheros JSON como fotografías hay en el archivo. En caso de duda, puedo comprobar que todos los ficheros de cualquiera de estos directorios contiene JSON válido:

```console
find . -type f -exec bash -c 'if [ ! -s "$0" ] || ! jq empty "$0" > /dev/null 2>&1; then echo "$0"; fi' {} \;
```

Genero ahora un único fichero de metadatos por cada fotografía, combinando los cinco ficheros JSON existentes para cada una en una única estructura JSON que salvo en el directorio `metadata`:

```bash
mkdir metadata

for FILE in details/*.json; do
  BASENAME="${FILE##*/}"
  ID="${BASENAME%.*}"

  FACES="rekognition/faces/${ID}.json"
  LABELS="rekognition/labels/${ID}.json"
  DETAILS="details/${ID}.json"
  SUMMARY="summaries/${ID}.json"
  EXIF="exif/${ID}.json"

  jq \
    --slurpfile summary $SUMMARY \
    --slurpfile exif $EXIF \
    --slurpfile details $DETAILS \
    --slurpfile faces $FACES \
    --slurpfile labels $LABELS \
    --null-input \
    --compact-output \
    '{
      summary: $summary[0],
      exif: $exif[0][0],
      details: $details[0],
      faces: $faces[0],
      labels: $labels[0]
    }' \
    > "metadata/${ID}.json"
done
```

Luego comprimo todos estos ficheros con gzip y les quito la extensión `.gz`:

```console
find . -type f -print0 | xargs -0 gzip
find . -type f -name '*.json.gz' -exec rename 's/\.gz$//' {} +
```

Después los subo a S3, con la precaución de informar de la compresión:

```bash
aws s3 sync metadata s3://guregipuzkoa/metadata/ --content-encoding 'gzip'
```

# 10. Construcción de los índices

```console
find indices/{centuries,decades,faces,folders,labels,photographers,places,users,years,collections} -type f -name "*.json" -delete
```

```console
find metadata -type f -print0 | xargs -0 ../../../scripts/guregipuzkoa/index.js
```

---

```console
parse_sitemap.js ../sitemap.txt | jq '.[] | select(.image | test("/playant/")) | .id' | cut -d "/" -f 5
```

---

- las imágenes repetidas en el sitemap (sort -n)
- las imágenes duplicadas (md5sum?) -> no había

Ahora hay que generar los índices. Para ello creamos tres ficheros temporales:

```bash
find details -type f -name '*.json' | while IFS= read -r file; do
    base_name=$(basename "$file" .json)
    author=$(jq --raw-output ".image_data.author" "$file")
    municipio=$(jq --raw-output ".image_data.municipio" "$file")
    photographer=$(jq --raw-output ".image_data.photographer" "$file")

    echo "$base_name;$author" >> authors
    echo "$base_name;$municipio" >> municipios
    echo "$base_name;$photographer" >> photographers
done
```

Generamos los índices así:

```bash
# Dependen de author
grep 'BeasaingoUdala' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'OnatikoUdala' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'HondarribikoUdala' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'pasaiakoUdala' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'UrnietakoUdala' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'ZaldibiakoUdala' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'ZestoakoUdala' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'gurezarautz' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'ArantzaCuestaEzeiza' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'Kutxa_Fototeka' authors | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh

grep 'Etxaniz Apaolaza, Jabier' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep -E "Jone Larrañaga|Larrañaga, Jone" photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'Elosegi Aldasoro, Luis Mari' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh
grep 'Elosegi Ansola, Polikarpo' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh

# Dependen de photographer y luego, además, hay que filtrar por author
grep 'Ojanguren, Indalecio' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh # author: GipuzkoaKultura
grep 'Elósegui Irazusta, Jesús' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh # author: ARANZADI
grep 'San Martin, Juan' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh # author: GipuzkoaKultura
grep '???niessen???' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh # author: ARANZADI
grep 'Koch Arruti, Sigfrido' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh # author: GipuzkoaKultura
grep 'Arlanzón, Andrés' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh # author: OnatikoUdala
grep 'Ugalde, Mari Paz' photographers | cut -d ';' -f 1 | ../../../scripts/guregipuzkoa/build_index.sh # author: AntzuolakoUdala
```
