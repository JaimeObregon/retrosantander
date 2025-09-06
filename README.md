# Explora los archivos fotográficos públicos

Retrosantander es un proyecto personal de [Jaime Gómez-Obregón](https://x.com/JaimeObregon) con los archivos fotográficos históricos de varias instituciones. El objetivo es aplicar los nuevos algoritmos de visión artificial y las capacidades de las modernas interfaces de usuario web para explorar formas innovadoras de poner estos archivos a disposición de la ciudadanía.

En [esta conferencia](https://www.youtube.com/watch?v=Wj88WEDOqgw) para la Asociación de Archiveros de Andalucía (Sevilla, marzo de 2023) y [esta exposición](https://www.youtube.com/watch?v=plGYaH_U4oI) para su homóloga vasca (Vitoria, noviembre del mismo año) comparto mi visión y peripecia en este proyecto.

# Retrosantander

Apliqué por primera vez estas ideas al fondo fotográfico del **Centro de Documentación de la Imagen de Santander (CDIS)**, entidad dependiente del Ayuntamiento de Santander. [La reacción](https://x.com/JaimeObregon/status/1523955161151983616) del Ayuntamiento fue retirar de internet el archivo fotográfico del CDIS y clausurar su sitio web. Esto supuso el final de Retrosantander, a los pocos días de haber nacido. Dos años después, el Ayuntamiento no ha repuesto el portal del CDIS.

[![Retrosantander](/docs/assets/retrosantander.jpg)](https://retrosantander.com)

Mi proyecto sigue desplegado en [retrosantander.com](https://retrosantander.com), aunque por la razón expresada las fotografías ya no están disponibles. [Este vídeo](https://x.com/JaimeObregon/status/1523590262760505345) resume los cómos y porqués de esta frustrada iniciativa personal con el patrimonio fotográfico municipal de mi ciudad.

Para la posteridad queda [la detallada autopsia que hice](docs/cdis.md) del difunto portal del CDIS.

# Retrogipuzkoa

Descartada la resignación, decidí seguir el experimento con el Fondo Fotográfico Jesús Elósegui, digitalizado entre 2002 y 2006 por la Sociedad de Ciencias Aranzadi y publicado con licencia abierta por la Diputación Foral de Gipuzkoa.

Así he podido continuar en [retrogipuzkoa.com](https://retrogipuzkoa.com) lo que inicié en Retrosantander. [En este hilo de 𝐗 (antes Twitter)](https://x.com/JaimeObregon/status/1524494203614543876) he explicado mis razones.

# Gure Gipuzkoa

Retrogipuzkoa captó la atención de la Diputación Foral de Gipuzkoa, que me ha permitido y animado a extender mi proyecto con la colección de Jesús Elósegui al resto de colecciones contenidas en su portal Gure Gipuzkoa («nuestra Guipúzcoa»), [guregipuzkoa.eus](https://guregipuzkoa.eus).

Nace así una nueva versión de Gure Gipuzkoa, [guregipuzkoa.com](https://guregipuzkoa.com), resultado de conectar todas las colecciones del portal de la Diputación con la herramienta que he ido construyendo y refinando para explorar estos archivos fotográficos.

⚠ Nótese que, al menos durante el desarrollo, el portal preexistente de la Diputación está en el dominio [guregipuzkoa.eus](https://guregipuzkoa.eus) y mi nuevo desarrollo basado en Retrosantander está desplegado en [guregipuzkoa.com](https://guregipuzkoa.com). Supongo que durante 2025 desaparecerá el portal antiguo y ambos dominios apuntarán al proyecto renovado.

Aparte he escrito la documentación [sobre el _scraping_ a guregipuzkoa.eus](/docs/guregipuzkoa.md).

# Evolución del proyecto

Hasta la retirada del archivo del CDIS por parte del Ayuntamiento de Santander, [Retrosantander](https://retrosantander.com) brindaba acceso a una colección fotográfica con 9506 imágenes históricas. [Retrogipuzkoa](https://retrogipuzkoa.com) presenta 15&#x202F;236 fotografías, organizadas también en una monocolección, la del fotógrafo vasco Jesús Elósegui. En [Gure Gipuzkoa](https://guregipuzkoa.com) la cantidad crece hasta las 158&#x202F;687 imágenes, organizadas ahora en múltiples colecciones.

# Adaptación a otros archivos

[Puedes contratarme](https://x.com/JaimeObregon) si deseas que sea yo mismo quien, como autor original de este _software_, adapte el programa a tu archivo fotográfico.

# Características y limitaciones

1. **Búsqueda instantánea**. A diferencia de los sitios web de la mayoría de los archivos, en Retrosantander las búsquedas no se cursan en el servidor de la institución sino directamente en el navegador del usuario. Para este fin se envía el índice completo de las colecciones fotográficas al navegador del usuario. Así se pueden obtener resultados instantáneos de las búsquedas al tiempo que se teclea.

   Esto impone la limitación de que no sea posible buscar en todas las colecciones simultáneamente. Si esto se demuestra un problema, implementaré una solución.

1. **Visión artificial**. He pasado las fotografías de los archivos por el servicio Amazon Rekognition, de visión artificial. Los ficheros JSON resultantes están alojados junto con las colecciones fotográficas de cada proyecto, y son descargados por la interfaz de usuario cuando este amplía una fotografía.

1. **Visor dinámico**. La herramienta presenta las imágenes en un lienzo con desplazamiento vertical (_scroll_) infinito que aprovecha toda la superficie útil de la pantalla del dispositivo. Pulsar en una imagen la amplía y da acceso a la ficha de la imagen y las características detectadas por la visión artificial, que se presentan superpuestas a la fotografía.

1. **Multicolección**. En Gure Gipuzkoa, a diferencia de Retrosantander y Retrogipuzkoa, es posible explorar múltiples colecciones fotográficas independientes.

1. **Cartografía**. El proyecto Gure Gipuzkoa ilustra la utilización de un mapa vectorial interactivo de la provincia de Guipúzcoa, lo que hace posible vincular fotografías a municipios y mostrar todas las fotografías de uno.

1. **Soporte multilingüe**. El programa implementa una interfaz de usuario traducible. Se incorporan cuatro: castellano, euskera, inglés y francés.

# Arquitectura

Este repositorio es multiproyecto, y en la actualidad aloja tres proyectos:

1. **Retrosantander**, desplegado en [retrosantander.com](https://retrosantander.com): proyecto frustrado por la retirada del archivo del CDIS por parte del Ayuntamiento de Santander.

1. **Retrogipuzkoa**, desplegado en [retrogipuzkoa.com](https://retrogipuzkoa.com), y que proporciona acceso a la colección fotográfica de Jesús Elósegui.

1. **Gure Gipuzkoa**, desplegado en [guregipuzkoa.com](https://guregipuzkoa.com) y en desarrollo durante 2023 y 2024. No confundir con guregipuzkoa.eus, que es el portal original de la Diputación Foral de Gipuzkoa que guregipuzkoa.com pretende superar.

La arquitectura de la aplicación, por lo tanto, sirve a múltiples archivos fotográficos desde una misma base de código común y extensible.

El programa determina qué proyecto servir en función del nombre del _host_. Para desarrollar en local es preciso, por lo tanto, añadir las entradas necesarias a (en sistemas Unix) `/etc/hosts`:

```
127.0.0.1 retrosantander.local retrogipuzkoa.local guregipuzkoa.local
```

Para iniciar el entorno de desarrollo basta instalar las dependencias (`yarn install`) y arrancar el servidor web invocando el script de `package.json` correspondiente al proyecto que se desea servir:

```console
yarn run serve:guregipuzkoa
```

El _stack_ tecnológico es deliberadamente mínimo y está basado en estándares W3C: _web components_, _shadow DOM_, HTML5, CSS y JavaScript (ES6). Parte del reto ha sido elaborar complementamente a medida todos los componentes, de forma que no hay dependencias externas, ni tampoco un _backend_ o una base de datos.

# Integración con VS Code

El directorio `.vscode` aporta la definición de las tareas para arrancar desde Visual Studio Code el servidor web de desarrollo con un proyecto.

# Estilo de código

El código se adhiere al formato establecido por [Prettier](https://prettier.io) con los mínimos ajustes configurados en la clave `prettier` del fichero `package.json`. Las definiciones CSS siguen las reglas de [stylelint](https://stylelint.io/), con las extensiones definidas en la clave `stylelint` del fichero `package.json`.

# Despliegue

Con cada _push_ a la rama _main_ se lanza el despliegue de todos los proyectos en Netlify. Allí hay tantos sitios configurados como proyectos alberga este repositorio.

Todos los sitios en Netlify son idénticos y están conectados a este mismo repositorio. Cada uno tiene una variable de entorno `PROJECT` asignada al proyecto correspondiente; esto es, `retrosantander`, `retrogipuzkoa` o `guregipuzkoa`.

Adicionalmente, la aplicación sabe qué proyecto servir por el nombre del _host_ desde el que es servida. Por ejemplo, cuando el nombre del _host_ es `retrogipuzkoa.com` o `retrogipuzkoa.local`, se sirve el archivo fotográfico y las personalizaciones correspondientes a `Retrogipuzkoa`. Esto se discierne en el navegador del usuario en tiempo de ejecución.

# Alojamiento de los archivos

- **Retrosantander**. No tengo permiso del CDIS del Ayuntamiento de Santander para redifundir el archivo fotográfico del CDIS. Por esta razón Retrosantander solicita los archivos directamente al servidor web del CDIS. Cuando el Ayuntamiento [ha retirado](https://x.com/JaimeObregon/status/1523955161151983616) este servidor y todo el archivo, Retrosantander ha dejado de poder brindarte acceso a él.

- **Retrogipuzkoa** y **Gure Gipuzkoa**. He obtenido permiso de la Diputación para copiar y distribuir el archivo fotográfico del portal guregipuzkoa.eus, que es distribuido por la Diputación con licencia Creative Commons. Yo he descargado (_scraping_) y copiado en Amazon S3 este archivo (fotografías y metadatos), y mis proyectos retrogipuzkoa.com y guregipuzkoa.com lo sirven desde ahí.

  Esto me ha permitido también transcodificar las imágenes desde el formato JPEG original al más moderno AVIF, optimizándolas para tiempos de acceso más breves en aquellos navegadores que lo soportan.

# Almacenamiento y visión artificial

Utilizo Amazon Web Services (AWS) para almacenar y servir (Amazon S3) los archivos fotográficos y como servicio de visión artificial (Amazon Rekognition).

En este repositorio incluyo el _script_ necesario para descargar las fotografías y metadatos del portal guregipuzkoa.eus (_scraping_), optimizar el tamaño de las fotografías convirtiéndolas al formato AVIF, cargarlas a Amazon S3 y aplicar sobre ellas los comandos proporcionados por Amazon Rekognition, y obtener y procesar sus respuestas.

Las operaciones sobre los servicios AWS requieren de una cuenta de AWS y [un fichero local](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html) con las credenciales y configuración del usuario de AWS.

En una instalación macOS:

- `~/.aws/config`

  ```ini
  [default]
  region = eu-south-2
  ```

- `~/.aws/credentiales`

  ```ini
  [default]
  aws_access_key_id = <YOUR_ACCESS_KEY_ID>
  aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
  ```

El _script_ toma las credenciales y configuración de estos ficheros locales privados, de tal manera que así no hay riesgo de incorporarlas accidentalmente al repositorio ni necesidad de establecerlas en variables de entorno.

# Licencia

Este proyecto es _software_ libre y se distribuye bajo la licencia GNU AFFERO GENERAL PUBLIC LICENSE versión 3.

Esto significa que puedes utilizar este programa para usos personales o comerciales, modificarlo a tu gusto y distribuirlo libremente. Pero al hacerlo tú también debes publicar el código fuente con tus aportaciones, distribuirlo bajo la misma licencia y preservar la información sobre la autoría original.

Para esto último debes mantener en tu sitio web, en un lugar discreto pero visible, una mención a Jaime Gómez-Obregón como autor original y un enlace a `https://github.com/JaimeObregon/retrosantander/`.
