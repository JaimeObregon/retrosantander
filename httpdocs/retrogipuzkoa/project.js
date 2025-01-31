const project = {
  name: 'Retrogipuzkoa',

  folder: 'retrogipuzkoa',

  languages: ['es'],

  title: {
    es: 'Explora 15\u202F210 imágenes históricas de la Colección Jesús Elósegui',
  },

  image: (id) =>
    `https://retrogipuzkoa.s3.eu-south-2.amazonaws.com/jpeg/${id}.jpg`,

  metadata: (id) =>
    `https://retrogipuzkoa.s3.eu-south-2.amazonaws.com/metadata/${id}.json`,

  index: `https://retrogipuzkoa.s3.eu-south-2.amazonaws.com/indices/jesus_elosegui.json`,

  external: (id) => `https://www.guregipuzkoa.eus/photo/${id}`,

  hosts: ['retrogipuzkoa.com'],

  // Cuántas sugerencias de búsqueda mostrar al buscar.
  maxSuggestions: 100,

  // Umbral de confianza en la visión artificial.
  // Los objetos detectados por debajo de éste umbral serán ignorados.
  confidenceThreshold: 80,

  routes: [
    {
      pattern: /^\/(\?q=(?<query>.+))?$/,
      exec: (app, groups) => {
        app.$main.innerHTML = `<rs-grid index="${project.index}"></rs-grid>`
        app.title = groups.query
      },
    },
  ],
}

export { project }
