const project = {
  name: 'Retrogipuzkoa',
  folder: 'retrogipuzkoa',
  languages: ['es'],
  themes: ['dark'],
  title: {
    es: 'Explora 15 210 imágenes históricas de la Colección Jesús Elósegui',
  },
  image: (id) =>
    `https://retrogipuzkoa.s3.eu-south-2.amazonaws.com/jpeg/${id}.jpg`,
  metadata: (id) =>
    `https://retrogipuzkoa.s3.eu-south-2.amazonaws.com/metadata/${id}.json`,
  index: `https://retrogipuzkoa.s3.eu-south-2.amazonaws.com/indices/jesus_elosegui.json`,
  collections: ['jesus_elosegui'],
  routes: [
    {
      pattern: /^\/(\?q=(?<query>.+))?$/,
      exec: (app, groups) => {
        const collection = project.collections[0]
        const index = project.index(collection)

        const main = document.querySelector('main')
        main.innerHTML = `<rs-grid index="${index}"></rs-grid>`

        app.title = groups.query
      },
    },
  ],
}

export { project }
