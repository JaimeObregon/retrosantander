# Un experimento con los fondos fotográficos municipales

Retrosantander es un experimento personal de Jaime Gómez-Obregón con los archivos fotográficos históricos de las administraciones públicas. El objetivo es aplicar los nuevos algoritmos de visión artificial y las modernas capacidades de las interfaces de usuario web a los archivos fotográficos de las entidades públicas.

# Retrosantander

Apliqué por primera vez estas ideas al fondo fotográfico que publicaba en su sitio web el **Centro de Documentación de la Imagen de Santander (CDIS)**, entidad dependiente del Ayuntamiento de Santander. [La reacción](https://twitter.com/JaimeObregon/status/1523955161151983616) del Ayuntamiento fue cerrar el sitio web del CDIS y retirar su archivo fotográfico de internet. Esto supuso el final de Retrosantander, a los pocos días de haber nacido.

[![Retrosantander](/docs/assets/retrosantander.jpg)](https://retrosantander.com)

El proyecto sigue desplegado en [retrosantander.com](https://retrosantander.com), aunque por la razón expresada las fotografías ya no están disponibles. [Este vídeo](https://twitter.com/JaimeObregon/status/1523590262760505345) resume los cómos y porqués de esta fracasada iniciativa personal con el patrimonio fotográfico municipal de mi ciudad.

Para la posteridad queda [la detallada autopsia que hice](docs/cdis.md) del difunto portal del CDIS.

# Retrogipuzkoa

Descartada la resignación, decidí seguir el experimento con los fondos fotográficos de la Diputación Foral de Guipúzcoa, que publica estos materiales con licencias abiertas y tiene una visión moderna respecto de la difusión de este patrimonio.

Así he podido continuar en [retrogipuzkoa.com](https://retrogipuzkoa.com) lo que inicié en Retrosantander. [En este hilo Twitter](https://twitter.com/JaimeObregon/status/1524494203614543876) he explicado mis razones.

# Detalles técnicos

El repositorio es multiproyecto, y en la actualidad aloja tanto Retrogipuzkoa como el difunto Retrosantander, a la vez que está preparado para alojar sucesivos nuevos proyectos.

La arquitectura tecnológica es deliberadamente minimalista y está basada en estándares W3C: _web components_, _shadow DOM_, HTML5, CSS y JavaScript (ES6). Parte del reto ha sido elaborar complementamente a medida todos los componentes, de forma que no hay dependencias externas, ni tampoco un _backend_ o una base de datos.

El programa determina qué proyecto servir en función del nombre del _host_. Para desarrollar en local es preciso, por lo tanto, añadir las entradas necesarias a `/etc/hosts`. Por ejemplo:

```
127.0.0.1 retrosantander.localhost retrogipuzkoa.localhost
```

Para iniciar el entorno de desarrollo basta instalar las dependencias y arrancar el servidor de desarrollo:

```console
npm install
PROJECT=retrogipuzkoa npm run dev
```

La variable de entorno `$PROJECT` determina qué proyecto se servirá. Actualmente hay dos `retrogipuzkoa` y el difunto `retrosantander`.

# Licencia

Este proyecto es software libre y se distribuye bajo la licencia GNU AFFERO GENERAL PUBLIC LICENSE versión 3.

Esto significa que puedes utilizar este programa para usos personales o comerciales, modificarlo a tu gusto y distribuirlo libremente. Pero al hacerlo tú también debes publicar el código fuente con tus aportaciones, distribuirlo bajo la misma licencia y preservar la información sobre la autoría original.

Para esto último debes mantener en tu sitio web, en un lugar discreto pero visible, una mención a Jaime Gómez-Obregón como autor original y un enlace a `https://github.com/JaimeObregon/retrosantander/`.

Si deseas que sea yo mismo quien adapte este programa al archivo fotográfico de tu entidad, quizá puedas contratarme: [https://twitter.com/JaimeObregon](https://twitter.com/JaimeObregon).
