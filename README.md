# Un experimento con los archivos fotográficos públicos

Retrosantander es un experimento personal de Jaime Gómez-Obregón con los archivos fotográficos históricos de varias instituciones. El objetivo es aplicar los nuevos algoritmos de visión artificial y las capacidades de las modernas interfaces de usuario web para explorar formas innovadoras de poner estos archivos a disposición de la ciudadanía.

En [esta conferencia](https://www.youtube.com/watch?v=Wj88WEDOqgw) (en Sevilla, en marzo de 2023) para la Asociación de Archiveros de Andalucía comparto mi visión y peripecia en este proyecto.

# Retrosantander

Apliqué por primera vez estas ideas al fondo fotográfico que publicaba en su sitio web el **Centro de Documentación de la Imagen de Santander (CDIS)**, entidad dependiente del Ayuntamiento de Santander. [La reacción](https://twitter.com/JaimeObregon/status/1523955161151983616) del Ayuntamiento fue cerrar el sitio web del CDIS y retirar su archivo fotográfico de internet. Esto supuso el final de Retrosantander, a los pocos días de haber nacido.

[![Retrosantander](/docs/assets/retrosantander.jpg)](https://retrosantander.com)

El proyecto sigue desplegado en [retrosantander.com](https://retrosantander.com), aunque por la razón expresada las fotografías ya no están disponibles. [Este vídeo](https://twitter.com/JaimeObregon/status/1523590262760505345) resume los cómos y porqués de esta frustrada iniciativa personal con el patrimonio fotográfico municipal de mi ciudad.

Para la posteridad queda [la detallada autopsia que hice](docs/cdis.md) del difunto portal del CDIS.

# Retrogipuzkoa

Descartada la resignación, decidí seguir el experimento con el Fondo Fotográfico Jesús Elósegui, digitalizado entre 2002 y 2006 por la Sociedad de Ciencias Aranzadi y publicado con licencia abierta por la Diputación Foral de Gipuzkoa.

Así he podido continuar en [retrogipuzkoa.com](https://retrogipuzkoa.com) lo que inicié en Retrosantander. [En este hilo Twitter](https://twitter.com/JaimeObregon/status/1524494203614543876) he explicado mis razones.

# GureGipuzkoa

Retrogipuzkoa captó la atención de la Diputación Foral de Gipuzkoa, que me ha permitido y animado a extender mi proyecto con la colección de Jesús Elósegui al resto de colecciones contenidas en su portal GureGipuzkoa («nuestra Guipúzcoa»).

Nace así una nueva versión de GureGipuzkoa, resultado de conectar todas las colecciones del portal de la Diputación con la herramienta que he ido construyendo y refinando para explorar estos archivos fotográficos.

# Características y limitaciones

1. **Búsqueda instantánea**. A diferencia de la mayoría de los archivos, las búsquedas no se cursan en el servidor sino directamente en el navegador del usuario. Para este fin se envía el índice completo de las colecciones fotográficas al navegador del usuario. Así se pueden obtener resultados instantáneos de las búsquedas al tiempo que se teclea. Esto impone la limitación de que no se pueda buscar en todas las colecciones simultáneamente.

1. **Visión artificial**. He pasado las fotografías de los archivos por el servicio Amazon Rekognition, de visión artificial. Los ficheros JSON resultantes están alojados en el subdirectorio `details` de cada proyecto, y son requeridos por la interfaz de usuario cuando este amplía una fotografía.

1. **Visor dinámico**. [TBD].

1. **Multicolección**. [TBD].

1. **Cartografía**. El proyecto GureGipuzkoa ilustra la utilización de un mapa vectorial interactivo de la provincia, lo que hace posible vincular fotografías a municipios y mostrar todas las fotografías de uno.

1. **Soporte multilingüe**. El programa implementa una interfaz de usuario traducible. Se incorporan tres: castellano, inglés y euskera.

# Arquitectura

Este repositorio es multiproyecto, y en la actualidad aloja tres proyectos:

1. **Retrosantander**, desplegado en retrosantander.com: proyecto frustrado por la retirada del archivo del CDIS por parte del Ayuntamiento de Santander.

1. **Retrogipuzkoa**, desplegado en retrogipuzkoa.com.

1. **GureGipuzkoa**, desplegado en guregipuzkoa.com y actualmente en desarrollo. No confundir con guregipuzkoa.eus, que es el portal original de la Diputación Foral de Gipuzkoa que guregipuzkoa.com pretende superar.

La arquitectura de la aplicación, por lo tanto, pretende servir a múltiples archivos fotográficos desde una misma base de código común y extensible.

El programa determina qué proyecto servir en función del nombre del _host_. Para desarrollar en local es preciso, por lo tanto, añadir las entradas necesarias a `/etc/hosts`. Por ejemplo:

```
127.0.0.1 retrosantander retrogipuzkoa guregipuzkoa
```

Para iniciar el entorno de desarrollo basta instalar las dependencias y arrancar el servidor web invocando el script de `package.json` correspondiente al proyecto que se desea servir:

```console
npm install
npm run retrogipuzkoa
```

La variable de entorno `$PROJECT` determina qué proyecto se servirá.

El _stack_ tecnológico es deliberadamente minimalista y está basada en estándares W3C: _web components_, _shadow DOM_, HTML5, CSS y JavaScript (ES6). Parte del reto ha sido elaborar complementamente a medida todos los componentes, de forma que no hay dependencias externas, ni tampoco un _backend_ o una base de datos.

# Integración con Visual Studio Code (VS Code)

El directorio `.vscode` aporta configuración para VS Code, incluyendo la definición de las tareas para arrancar los proyectos. Una de las tareas corre automáticamente al abrir VS Code, arrancando el servidor web de desarrollo con un proyecto.

# Estilo de código

El código se adhiere al formato conferido por [Prettier](https://prettier.io) con los mínimos ajustes configurados en la clave `prettier` del fichero `package.json`.

# Despliegue

Con cada _push_ a la rama _main_ se lanza el despliegue de todos los proyectos en Netlify. Allí hay tantos sitios configurados como proyectos alberga este repositorio.

Todos los sitios en Netlify son idénticos y están conectados a este mismo repositorio. Cada uno tiene una variable de entorno `PROJECT` asignada al proyecto correspondiente; esto es, `retrosantander`, `retrogipuzkoa` o `guregipuzkoa`.

Adicionalmente, la aplicación sabe qué proyecto servir por el nombre del _host_ desde el que es servida. Por ejemplo, cuando el nombre del _host_ es `retrogipuzkoa.com`, `retrogipuzkoa.localhost` o `retrogipuzkoa`, se sirve el archivo fotográfico y las personalizaciones correspondientes a `Retrogipuzkoa`. Esto se discierne en `app.js`.

# Licencia

Este proyecto es software libre y se distribuye bajo la licencia GNU AFFERO GENERAL PUBLIC LICENSE versión 3.

Esto significa que puedes utilizar este programa para usos personales o comerciales, modificarlo a tu gusto y distribuirlo libremente. Pero al hacerlo tú también debes publicar el código fuente con tus aportaciones, distribuirlo bajo la misma licencia y preservar la información sobre la autoría original.

Para esto último debes mantener en tu sitio web, en un lugar discreto pero visible, una mención a Jaime Gómez-Obregón como autor original y un enlace a `https://github.com/JaimeObregon/retrosantander/`.

Si deseas que sea yo mismo quien adapte este programa al archivo fotográfico de tu entidad, quizá puedas contratarme: [https://twitter.com/JaimeObregon](https://twitter.com/JaimeObregon).
