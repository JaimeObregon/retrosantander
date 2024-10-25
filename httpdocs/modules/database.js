import { normalize } from './strings.js'
import { labels } from './labels.js'

// Umbral de confianza en la visión artificial.
// Los objetos detectados por debajo de éste umbral serán ignorados.
const confidenceThreshold = 80

// Cuántas sugerencias de búsqueda mostrar al buscar.
const maxSuggestions = 100

// El CDIS a veces encierra los títulos de las imágenes entre corchetes,
// entre comillas… Aquí tratamos de revertir los casos más habituales.
const prettify = (title) => {
  let string = title.trim()

  let [first, last] = [string[0], string[string.length - 1]]

  const period = last === '.' && string.slice(0, -1).indexOf('.') === -1
  if (period) {
    string = string.slice(0, -1)
    first = string[0]
    last = string[string.length - 1]
  }

  const betweenBrackets = first === '[' && last === ']'
  const betweenQuotationMarks =
    first === '"' && last === '"' && string.slice(1, -1).indexOf('"') === -1

  return betweenBrackets || betweenQuotationMarks ? string.slice(1, -1) : string
}

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
    return database.records.find((record) => record.id === id)
  },

  // Cursa una búsqueda en la base de datos y devuelve los resultados de la misma
  // y las sugerencias de búsqueda para el término empleado.
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
      .slice(0, maxSuggestions)

    return { results, suggestions }
  },

  // Carga e interpreta un fichero JSON con los metadatos de una imagen.
  async parse(url) {
    const response = await fetch(url)

    const json = await response.json()

    const { rekognition, exif, details } = json

    const gender = (value) =>
      ({
        Male: 'Hombre',
        Female: 'Mujer',
      })[value]

    const faces = rekognition.FaceDetails.filter(
      (face) => face.Confidence >= confidenceThreshold,
    ).map((face, i) => ({
      type: 'face',
      id: `face-${i}`,
      name: `${gender(face.Gender.Value)} ${i + 1}`,
      title: [
        `${gender(face.Gender.Value)} nº ${i + 1},`,
        `de entre ${face.AgeRange.Low} y ${face.AgeRange.High} años`,
      ].join(' '),
      top: face.BoundingBox.Top,
      left: face.BoundingBox.Left,
      width: face.BoundingBox.Width,
      height: face.BoundingBox.Height,
      confidence: face.Confidence,
      age: `Entre ${face.AgeRange.Low} y ${face.AgeRange.High} años`,
      emotions: face.Emotions.map((emotion) => ({
        confidence: emotion.Confidence,
        name: {
          CALM: 'Tranquilo',
          SURPRISED: 'Sorprendido',
          FEAR: 'Asustado',
          SAD: 'Triste',
          DISGUSTED: 'Disgustado',
          CONFUSED: 'Confundido',
          HAPPY: 'Contento',
          ANGRY: 'Enfadado',
        }[emotion.Type],
      })).filter((emotion) => emotion.confidence > confidenceThreshold),
      ...(face.Gender.Confidence > confidenceThreshold && {
        gender: gender(face.Gender.Value),
      }),
      ...(face.Beard.Confidence > confidenceThreshold && {
        beard: face.Beard.Value,
      }),
      ...(face.Eyeglasses.Confidence > confidenceThreshold && {
        glasses: face.Eyeglasses.Value,
      }),
      ...(face.EyesOpen.Confidence > confidenceThreshold && {
        eyes: face.EyesOpen.Value,
      }),
      ...(face.MouthOpen.Confidence > confidenceThreshold && {
        mouth: face.MouthOpen.Value,
      }),
      ...(face.Mustache.Confidence > confidenceThreshold && {
        mustache: face.Mustache.Value,
      }),
      ...(face.Smile.Confidence > confidenceThreshold && {
        smile: face.Smile.Value,
      }),
      ...(face.Sunglasses.Confidence > confidenceThreshold && {
        sunglasses: face.Sunglasses.Value,
      }),
    }))

    const objects = rekognition.Labels.filter(
      (object) => object.Instances.length,
    ).reduce(
      (accumulator, object) => [
        ...accumulator,
        ...object.Instances.filter(
          (instance) => instance.Confidence >= confidenceThreshold,
        ).map((instance, i) => ({
          type: 'object',
          id: `object-${accumulator.length + i}`,
          name: `${labels[object.Name]} ${i + 1}`,
          title: labels[object.Name],
          confidence: instance.Confidence,
          top: instance.BoundingBox.Top,
          left: instance.BoundingBox.Left,
          width: instance.BoundingBox.Width,
          height: instance.BoundingBox.Height,
        })),
      ],
      [],
    )

    const tags = rekognition.Labels.filter((label) => !label.Instances.length)
      .filter((label) => label.Confidence > confidenceThreshold)
      .map((label) => ({
        name: labels[label.Name],
        label: label.Name,
        confidence: label.Confidence,
      }))

    const areas = [...faces, ...objects].map((area) => ({
      id: area.id,
      title: area.title,
      type: area.type,
      confidence: area.confidence,
      top: 100 * area.top,
      left: 100 * area.left,
      width: 100 * area.width,
      height: 100 * area.height,
      area: 10000 * area.width * area.height,
    }))

    return { faces, objects, tags, areas, details, exif }
  },
}

export { database }
