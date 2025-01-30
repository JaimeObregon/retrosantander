import { app } from './app.js'
import { normalize, prettify } from './strings.js'

const database = {
  // Carga en `this.records` el fichero JSON con los datos.
  load: async (url) => {
    const response = await fetch(url)
    const json = await response.json()

    database.records = json.map(
      ([id, title, tags, caption = '', file = {}]) => ({
        id,
        title: prettify(title),
        index: normalize([title, caption].join(' ')),
        tags,
        ...(file && { file }),
      }),
    )
  },

  // Retorna el número de registros en la base de datos.
  get count() {
    return this.records.length
  },

  // Devuelve el registro de una imagen a partir de su `id`.
  find: (id) => {
    return database.records.find((record) => record.id == id)
  },

  // Cursa una búsqueda en la base de datos y devuelve los resultados y las
  // sugerencias de búsqueda para el término empleado.
  search: (string) => {
    const query = normalize(string)

    if (!query.length) {
      const results = database.records.sort(() => Math.random() - 0.5)
      const suggestions = []
      return { results, suggestions }
    }

    const regexp = new RegExp(query)
    const results = database.records.filter((record) =>
      record.index.match(regexp),
    )

    const suggestions = results
      .flatMap((item) =>
        item.index
          .split(' ')
          .filter((word) => word.match(new RegExp(`^${query}`)))
          .filter((word) => word.length),
      )
      .filter((value, index, word) => word.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b))
      .filter((word) => word !== query)
      .slice(0, app.project.maxSuggestions)

    return { results, suggestions }
  },
}

export { database }
