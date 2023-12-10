# GureGipuzkoa

[guregipuzkoa.eus](https://guregipuzkoa.eus) es el portal que aloja el archivo fotográfico de la Diputación Foral de Gipuzkoa. Es un desarrollo sobre WordPress que sustituyó hacia 2011 a uno previo, más completo y ambicioso.

Para elaborar [guregipuzkoa.com](https://guregipuzkoa.com) he necesitado acceder a este archivo. Aunque cuento con autorización de la Diputación, me ha parecido más rápido y directo hacer _scraping_ de los contenidos del portal oficial que solicitar las credenciales de acceso al portal.

A continuación documento el proceso de _scraping_ y manipulación de las fotografías y metadatos contenidos en guregipuzkoa.eus a que he llegado haciendo ingeniería inversa del portal. Este proceso comprende los siguientes pasos:

1. Obtención de todas las URL del portal
2. Descarga de las fotografías
3. Filtrado de fotografías corruptas e inválidas
4. Asignación de extensiones
5. Extracción de los metadatos Exif
6. Descarga de los metadatos de GureGipuzkoa
7. Carga en S3 y transcodificación
8. Reconocimiento visual y generación y carga de la ficha de cada imagen

# 1. Obtención de todas las URL del portal

Para descargar las fotografías del archivo primero es necesario obtener una lista con todas sus URL:

1. Accédase al _sitemap_ del portal:

   [https://www.guregipuzkoa.eus/sitemap-index.xml](https://www.guregipuzkoa.eus/sitemap-index.xml)

   Enlaza a cuatro _sitemaps_ parciales. Son ficheros con XML mal formado, y por lo tanto no podemos procesarlos con herramientas para XML. Usaremos expresiones regulares.

2. Descárguense y concaténense todos los _sitemaps_:

   ```console
   curl https://www.guregipuzkoa.eus/sitemap/sitemap-image\[1-4\].xml > downloads/sitemap.txt
   ```

   Esto resulta en un fichero `sitemap.txt` de unos 100 MB.

3. Procésese este fichero con el _script_ `parse_sitemap.mjs`:

   ```console
   ./parse_sitemap.mjs downloads/sitemap.txt
   ```

   Este _script_ excluye de la salida algunos objetos cuyas fotografías están corruptas o no tienen las dimensiones suficientes, tal como se explica más adelante.

   El posprocesado con `jq` embellece la salida y proporciona funcionalidad opcional adicional. Por ejemplo, para extractar todas las referencias a la colección Jesús Elosegui:

   ```console
   ./parse_sitemap.mjs downloads/sitemap.txt | jq 'map(select(.image|test("wp-content/gallery/jesus-elosegui/")))'
   ```

# 2. Descarga de las fotografías

El proceso anterior devuelve una estructura JSON de unos 159000 elementos. Cada elemento tiene una propiedad `id` con la forma `https://www.guregipuzkoa.eus/photo/[n]/`, donde `[n]` es un identificador unívoco. Cada elemento tiene también una propiedad `image` que es la URL de la fotografía.

Para descargar sucesivamente todas las fotografías del portal:

```bash
./fetch_photos.sh downloads/sitemap.txt downloads/fotografias
```

Siendo el primer argumento la ruta al fichero `sitemap.xml` y el segundo el directorio en el que se guardarán las fotografías descargadas.

La descarga puede llevar más de 30 horas.

El _script_ omite la descarga de aquellas fotografías que ya existan en el directorio de destino, de modo que es seguro interrumpir la descarga y retomarla sin más que correr nuevamente el _script_.

Cualquier error durante la descarga se escribe en `stderr`. Para reintentar la descarga de las rutas fallidas basta correr de nuevo el _script_.

El archivo fotográfico así descargado ocupa 120 GB.

# 3. Filtrado de fotografías corruptas e inválidas

Algunas fotografías del portal oficial están [corruptas](https://www.guregipuzkoa.eus/photo/104194/) o [incompletas](https://www.guregipuzkoa.eus/photo/153281). Otras tienen [una resolución demasiado baja](https://www.guregipuzkoa.eus/photo/45861/) como para ser utilizadas.

Se hace preciso detectar estas imágenes para luego incorporarlas manualmente a la lista de los `id` en `parse_sitemap.mjs` que son ignorados al procesar el _sitemap_.

Este _script_ devolverá por _stdout_ cuáles son:

```bash
for FILE in *; do
  SIZE=($(identify -format '%w %h %i\n' "$FILE" 2> /dev/null))
  if [ $? != 0 ] ; then
    echo "$FILE contiene errores."
  else
    (( $SIZE[1] < 128 || $SIZE[2] < 128 )) && echo "$FILE tiene unas dimensiones insuficientes."
  fi
done
```

Tómense las así devueltas e incorpórense a la lista de exclusión en `parse_sitemap.mjs`.

# 4. Asignación de extensiones

No podemos confiar en las extensiones de los ficheros citados en el _sitemap_, porque refieren indistintamente `jpg`, `JPG` o `jpeg`. O porque algunas fotografías están en formato PNG y tienen extensión `jpg`. O porque, sencillamente, no confío en que las extensiones coincidan siempre con el formato del archivo. Así que el paso anterior descarga ficheros sin extensión. Y es preciso proporcionársela ahora:

```bash
for i in *; do
  EXTENSION=$(file --extension $i | sed -E "s/^[0-9]+: ([a-z]+).*/\\1/g")
  rename "s/$/.$EXTENSION/" $i;
done
```

# 5. Extracción de los metadatos Exif

[Es interesante](https://twitter.com/JaimeObregon/status/1646082167787618304) extraer los metadatos Exif del archivo fotográfico. La utilidad `exiftool` permite exportar estos metadatos en forma JSON:

```bash
for f in *; do exiftool -json -unknown -duplicates "$f" > ../exif/$f; done
```

Los ficheros JSON así extraídos ocupan 697 MB.

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

Para descargar todos los metadatos, pásese el _sitemap_ interpretado por `stdin` a `fetch_metadata.mjs`. Este _script_ descargará los metadatos de las fotografías referenciadas en el _sitemap_ y los guardará como ficheros JSON en la ruta que reciba como primer parámetro:

```bash
./parse_sitemap.mjs downloads/sitemap.txt | ./fetch_metadata.mjs downloads/metadata
```

Las respuestas JSON así descargadas ocupan 738 MB.

# 7. Carga en S3 y transcodificación

He desplegado una función en Amazon Lambda que transcodifica las imágenes al formato optimizado AVIF. Se activa mediante un disparador (_trigger_) cuando se deposita un objeto en la ruta `/images` del _bucket_ `guregipuzkoa-temp`. Por ejemplo, porque lo deposita `upload.mjs`, como se verá después. Esta función lambda hace lo siguiente:

1. Toma la imagen subida al _bucket_ `guregipuzkoa_temp` y la transcodifica a formato AVIF, optimizándola en tamaño y recortándola si es preciso para reducir sus tiempos de descarga, y la deposita en la ruta adecuada del _bucket_ `guregipuzkoa`.

1. Copia la imagen original a la ruta adecuada del _bucket_ de destino `guregipuzkoa`, para su conservación.

1. Elimina la imagen original del _bucket_ `guregipuzkoa-temp`.

Hacemos la transcodificación en AWS porque puede ser lenta y conllevar, para algunas fotografías, incluso más de 45 segundos.

Por otro lado, el _script_ de subida a S3 se invoca así:

```bash
./parse_sitemap.mjs sitemap.txt | ./upload.mjs
```

Este _script_ `upload.mjs` lista todos los objetos almacenados en la ruta `/originals/images/` del _bucket_ `guregipuzkoa` y los compara con los `id` obtenidos del _sitemap_ que recibe por `stdin`, cargando a la ruta `/images` de `guregipuzkoa-temp` aquellos faltantes, para que se dispare la función lambda que los toma de allí y los transcodifica y guarda en `/originals/images/` y en `/optimized/`, ambas en el _bucket_ `guregipuzkoa`.

Este _script_ tiene dos defectos:

1. La ruta del directorio contenedor de los ficheros a subir está _hardcoded_ en el código.

1. Asume incorrectamente que todos los ficheros tienen extensión `.jpeg`, lo cual es correcto para todos los ficheros de GureGipuzkoa (véase el epígrafe correspondiente a la asignación de extensiones de esta documentación) **salvo para dos**.

   Para cargarlos, súbanse primero y antes que nada:

   ```bash
   ./parse_sitemap.mjs sitemap.txt | jq 'map(select(.image|test(".png$")))' | ./upload.mjs
   ```

# 8. Reconocimiento visual y generación y carga de la ficha de cada imagen

[TBD]
