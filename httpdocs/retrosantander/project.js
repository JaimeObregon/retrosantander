const project = {
  name: 'Retrosantander',
  folder: 'retrosantander',
  languages: ['es'],
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
  external: (id) =>
    `http://portal.ayto-santander.es/portalcdis/Public/FotoView.do?id=${id}`,
  hosts: ['retrosantander.com'],
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
