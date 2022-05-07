import { labels } from '../modules/labels.js'

const confidenceThreshold = 80

const normalize = (string) => {
  // https://es.stackoverflow.com/a/62032
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      '$1'
    )
    .normalize()
    .replace(/[^a-z0-9ñç ]/g, ' ')
    .replace(/\s+/g, ' ')
}

const prettify = (title) => {
  const first = title[0]
  const last = title[title.length - 1]

  if ((first === '[' && last === ']') || (first === '"' && last === '"')) {
    return title.slice(1, -1).trim()
  }

  return title.trim()
}

const database = {
  index: [],

  load: async (url) => {
    const response = await fetch(url)
    const json = await response.json()

    database.index = json.map((item) => ({
      ...item,
      title: prettify(item.title),
      index: normalize(item.title),
    }))
  },

  get length() {
    return this.index.length
  },

  find: (id) => {
    return database.index.find((item) => item.id === id)
  },

  search: (string) => {
    const query = normalize(string)

    if (!query.length) {
      const results = database.index.sort(() => Math.random() - 0.5)
      const suggestions = []
      return { results, suggestions }
    }

    const regexp = new RegExp(query)
    const results = database.index.filter((item) => item.index.match(regexp))

    const suggestions = results
      .flatMap((item) =>
        item.index
          .split(' ')
          .filter((word) => word.match(new RegExp(`^${query}`)))
          .filter((word) => word.length)
      )
      .filter((value, index, word) => word.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b))
      .filter((word) => word !== query)
      .slice(0, 100)

    return { results, suggestions }
  },

  parse(json) {
    const gender = (value) => ({ Male: 'Hombre', Female: 'Mujer' }[value])

    const faces = json.FaceDetails.filter(
      (face) => face.Confidence >= confidenceThreshold
    ).map((face, i) => ({
      type: 'face',
      name: `${gender(face.Gender.Value)} ${i + 1}`,
      title: [
        `${gender(face.Gender.Value)} nº ${i + 1},`,
        `de entre ${face.AgeRange.Low} y ${face.AgeRange.High} años`,
      ].join(' '),
      age: `Entre ${face.AgeRange.Low} y ${face.AgeRange.High} años`,
      beard: face.Beard > confidenceThreshold,
      confidence: face.Confidence,
      id: `face-${i}`,
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
      glasses: face.Eyeglasses > confidenceThreshold,
      eyes: face.EyesOpen > confidenceThreshold,
      gender:
        face.Gender.Confidence > confidenceThreshold
          ? gender(face.Gender.Value)
          : undefined,
      mouth: face.MouthOpen > confidenceThreshold,
      mustache: face.Mustache > confidenceThreshold,
      smile: face.Smile > confidenceThreshold,
      sunglasses: face.Sunglasses > confidenceThreshold,
      top: face.BoundingBox.Top,
      left: face.BoundingBox.Left,
      width: face.BoundingBox.Width,
      height: face.BoundingBox.Height,
    }))

    const objects = json.Labels.filter(
      (object) => object.Instances.length
    ).reduce(
      (accumulator, object) => [
        ...accumulator,
        ...object.Instances.filter(
          (instance) => instance.Confidence >= confidenceThreshold
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
      []
    )

    const tags = json.Labels.filter((label) => !label.Instances.length)
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

    return { faces, objects, tags, areas }
  },
}

export { database }
