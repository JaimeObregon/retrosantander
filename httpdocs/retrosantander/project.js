const project = {
  name: 'Retrosantander',
  folder: 'retrosantander',
  languages: ['es'],
  themes: ['dark'],
  title: {
    es: 'Explora 9506 imágenes históricas de Santander',
  },
  image: (id) =>
    // `https://portal.ayto-santander.es/portalcdis/image/DownloadFileExposicion.do?id=${id}`,
    // `https://retrosantander.s3.eu-south-2.amazonaws.com/xxxx/xxxxxxxxx_xxxxxxx/${id}.jpeg`,
    'assets/images/unavailable.svg',
  metadata: (id) =>
    `https://retrosantander.s3.eu-south-2.amazonaws.com/metadata/${id}.json`,
  index: `https://retrosantander.s3.eu-south-2.amazonaws.com/indices/cdis.json`,
  collections: ['cdis'],
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
