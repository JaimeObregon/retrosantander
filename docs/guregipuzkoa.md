# GureGipuzkoa

[guregipuzkoa.eus](https://guregipuzkoa.eus) es el portal que aloja el archivo fotográfico de la Diputación Foral de Gipuzkoa.

Para elaborar [guregipuzkoa.com](https://guregipuzkoa.com) he necesitado acceder a este archivo. Aunque cuento con autorización de la Diputación, me ha parecido más rápido y directo hacer _scraping_ de los contenidos del portal oficial que solicitar las credenciales de acceso al portal.

A continuación documento el proceso de _scraping_ y manipulación de las fotografías y metadatos contenidos en guregipuzkoa.eus a que he llegado haciendo ingeniería inversa del portal.

# Obtención de todas las URL del portal

Para descargar las fotografías del archivo primero es necesario obtener una lista con todas sus URL.

1. Accédase al _sitemap_ del portal:

   [https://www.guregipuzkoa.eus/sitemap-index.xml](https://www.guregipuzkoa.eus/sitemap-index.xml)

   Enlaza a cuatro _sitemaps_ parciales. Son ficheros con XML mal formado, y por lo tanto no podemos procesarlos con herramientas para XML. Usaremos expresiones regulares.

2. Descárguense y concaténense todos los _sitemaps_:

   ```console
   curl https://www.guregipuzkoa.eus/sitemap/sitemap-image\[1-4\].xml > sitemap.txt
   ```

   Esto resulta en un fichero `sitemap.txt` de unos 100 MB.

3. Procésese este fichero con el _script_ `parse_sitemap.mjs`:

   ```console
   node parse_sitemap.mjs sitemap.txt
   ```

   El posprocesado con `jq` embellece la salida y proporciona funcionalidad opcional adicional. Por ejemplo, para extractar todas las referencias a la colección Jesús Elosegui:

   ```console
   node parse_sitemap.mjs sitemap.txt | jq 'map(select(.image|test("wp-content/gallery/jesus-elosegui/")))'
   ```
