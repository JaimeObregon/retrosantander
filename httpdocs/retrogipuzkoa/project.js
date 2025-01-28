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
  external: (id) => `https://www.guregipuzkoa.eus/photo/${id}`,
  routes: [
    {
      pattern: /^\/(\?q=(?<query>.+))?$/,
      exec: (app, groups) => {
        const main = document.querySelector('main')
        if (!main) {
          return
        }

        main.innerHTML = `<rs-grid index="${project.index}"></rs-grid>`
        app.title = groups.query
      },
    },
  ],
}

export { project }
