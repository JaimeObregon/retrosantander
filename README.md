# retrosantander

Un experimento con el portal del Centro de Documentación de la Imagen de Santander. Por Jaime Gómez-Obregón.

## 1. Descargar todas las páginas de resultados

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

## 2. Extraer la dirección de todas las fichas

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

## 3. Descargar todas las fichas

```bash
mkdir images && curl -K images.txt
```

## 4. Extraer la dirección de todas las imágenes

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

## 5. Descargar todas las fotos

```bash
mkdir jpeg && curl -K jpeg.txt
```

## 6. Interpretar las fichas y crear el repositorio JSON

```bash
for file in images/image_*.html;
    do cat $file | php parse.php; done \
| jq --slurp > cdis.json
```

## 7. Eliminar la marca de agua

```bash
mkdir merged
for id in `jq --raw-output '.[].id' cdis.json`; do
    convert \
        jpeg/${id}_b.jpeg \
        \( jpeg/${id}_a.jpeg -gravity south -crop 0x10%+0+0 \) \
        -composite merged/${id}.jpeg;
done
```
