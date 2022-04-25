# Retrosantander

Un experimento con el portal del [Centro de Documentación de la Imagen de Santander](http://portal.ayto-santander.es/portalcdis/Index.do) (CDIS) y sus contenidos. Por Jaime Gómez-Obregón.

# El contexto

El Ayuntamiento de Santander opera el CDIS, una entidad **«que tiene como objetivo poner a su disposición el patrimonio fotográfico municipal»**, según su sitio web.

He llamado al CDIS para interesarme por conocer este patrimonio, y me han expresado que el canal para ello es **el mencionado sitio web**. Las visitas al Centro son posibles, pero requieren de una cita previa y especificar con antelación sobre qué materiales se desea realizar la consulta, para que el equipo técnico del CDIS los prepare con antelación.

Puesto que mi interés no es académico ni historiográfico, sino la mera curiosidad abstracta, me veo con que el portal del CDIS es mi principal interfaz para acceder al patrimonio fotográfico de mi ciudad. Esto no sería inconveniente de no ser porque **el referido portal es muy mejorable**.

| La portada del CDIS                                | Vista de una imagen                                   | Una exposición virtual                                                 |
| -------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| ![Portada del CDIS](/docs/assets/cdis-portada.jpg) | ![Una imagen del CDIS](/docs/assets/cdis-detalle.jpg) | ![Detalle de una exposición virtual](/docs/assets/cdis-exposicion.jpg) |

# Por qué el portal del CDIS es muy mejorable

Como santanderino, **el fondo del CDIS me parece un tesoro**. Sin embargo, se pone a disposición de la ciudadanía de una forma tosca y limitada. Esbozo a continuación mis porqués:

## Por el diseño del sitio

Un sitio como el del CDIS debería destinar a la imagen un espacio principal. Las fotografías deberían presidir el sitio, como presiden los cuadros el sitio web del Museo del Prado. La atención del visitante debería dirigirse **a la contemplación de las imágenes**.

Sin embargo, el sitio web del CDIS relega el tesoro a la última de las prioridades. **Las imágenes parecen un subproducto colateral**, un contenido secundario.

En mi portátil, las imágenes del CDIS representan **solo el 3 % de la superficie útil** de la pantalla, y en ocasiones por debajo del corte que obliga a hacer desplazamiento vertical.

| La experiencia de búsqueda en el CDIS                            | La ficha de una imagen                                  |
| ---------------------------------------------------------------- | ------------------------------------------------------- |
| ![Resultados de la búsqueda](/docs/assets/analisis-busqueda.jpg) | ![Ficha de una imagen](/docs/assets/analisis-ficha.jpg) |

Contrapongamos esta equivocada decisión con la maquetación elegida por el Museo del Prado: el museo **pone las obras en el centro de atención**. Las exhibe. Se recrea en ellas. Y todo lo demás es accesorio. Queda oculto tras un interfaz de usuario reducido a la mínima expresión.

![Portada del Museo del Prado](/docs/assets/museo.jpg)

**La navegación** por al colección fotográfica del CDIS también es tediosa. La retahíla de defectos y limitaciones es la tristemente habitual en cualquier sitio web promovido por organismos públicos. La omitiré aquí, para no hacer este resumen largo y penoso.

## Por las marcas de agua

El CDIS sobreimprime **una enorme marca de agua** sobre las imágenes que presenta en su sitio web. Lejos de ser un discreto sello de origen, es una monumental firma con las palabras «Centro de Documentación de la Imagen de Santander». Y ocupa de lado a lado el tercio central las imágenes.

Esta marca de agua es molesta. Interfiere con la contemplación que realiza el ciudadano, y que es justamente el objetivo primordial del CDIS, según su propio sitio web. En algunos casos, la marca de agua incluso dificulta la identificación de elementos esenciales de la imagen.

| Con marca de agua                                         | Sin marca de agua                                           |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| ![Con marca de agua](/docs/assets/inundacion-marcada.jpg) | ![Sin marca de agua](/docs/assets/inundacion-sin-marca.jpg) |

## Por el modelo de licenciamiento

Comprar las imágenes y llegan en CD.

> Todo material, marcas registradas u otras propiedades intelectuales de este website son propiedad de AYUNTAMIENTO DE SANTANDER o de sus compañías afiliadas, y están protegidas por los derechos de autor.
>
> Está permitida su reproducción para uso personal.
>
> Queda prohibida cualquier modificación, copia, alquiler, préstamo, trasmisión y difusión no autorizada. El material de este website no puede ser vendido ni distribuido de otra forma con ánimo de lucro.
>
> Todos los derechos Reservados.

## Porque no está adaptado a móviles y no es seguro

| Las exposiciones, desde mi iPhone                                      | La ficha de una imágen, desde el móvil                               |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| ![Las exposiciones, desde el móvil](/docs/assets/movil-exposicion.jpg) | ![Ficha de una imagen, desde el móvil](/docs/assets/movil-ficha.jpg) |

# ¿Y por qué sucede esto?

…

# El reto

La idea… que es también el principal Esta puesta a disposición se hace fundamentalmente a través de

# Obteniendo y estructurando la base de datos del CDIS

### 1. Descargar todas las páginas de resultados

```bash
mkdir pages
curl --output "pages/page_#1.html" \
"http://portal.ayto-santander.es/portalcdis/PrepareBuscadorFotosList.do?"\
"buscadorgeneral=1&"\
"palabraclave=&"\
"fotografo=&"\
"fechainicial=0000&"\
"fechafinal=2050&"\
"goto=[1-793]"
```

### 2. Extraer la dirección de todas las fichas

```bash
grep --no-filename --only-matching \
    'portalcdis/Public/FotoView.do;jsessionid=.\{32\}?id=\d\+' \
    pages/page_*.html \
    | while read line; do \
        echo "url=http://portal.ayto-santander.es/$line"; \
        echo "output=images/image_`echo $line | grep --only-matching "\d\+$"`.html"; \
    done \
    > images.txt
```

### 3. Descargar todas las fichas

```bash
mkdir images && curl -K images.txt
```

### 4. Extraer la dirección de todas las imágenes

```bash
mkdir jpeg
ORIGIN=http://portal.ayto-santander.es
grep --no-filename --only-matching \
    'portalcdis/image/DownloadFile.do?id=\d\+' \
    images/image_*.html \
    | while read line; do \
        ID=`echo $line | grep --only-matching "\d\+$"`
        echo "url=$ORIGIN/$line"; \
        echo "output=jpeg/${ID}_a.jpeg"; \
        echo "url=$ORIGIN/`echo $line | sed 's/DownloadFile/DownloadFileExposicion/'`"; \
        echo "output=jpeg/${ID}_b.jpeg"; \
    done > jpeg.txt
```

### 5. Descargar todas las fotos

```bash
mkdir jpeg && curl -K jpeg.txt
```

### 6. Interpretar las fichas y crear el repositorio JSON

```bash
for file in images/image_*.html;
    do cat $file | php parser.php; done \
| jq --slurp > retrosantander.json
```

### 7. Eliminar la marca de agua

```bash
mkdir merged
for id in `jq --raw-output '.[].id' retrosantander.json`; do
    convert \
        jpeg/${id}_b.jpeg \
        \( jpeg/${id}_a.jpeg -gravity south -crop 0x10%+0+0 \) \
        -composite merged/${id}.jpeg;
done
```
