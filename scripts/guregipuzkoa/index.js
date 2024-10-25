#!/usr/bin/env node

// Este _script_ hace dos cosas: Por un lado, genera en el directorio `indices`
// los índices JSON, organizados en subdirectorios. Por otro, crea en el
// directorio `metadata2` versiones nuevas de los ficheros JSON del directorio
// `metadata` que recibe por `stdin`, a las que añade una clave `indices` con
// la lista de índices en aparece la imagen.

import fs from 'fs'
import path from 'path'
import { decode, slugize } from '../../httpdocs/modules/strings.js'
import {
  authors,
  collections,
  folders,
  locations,
  photographers,
} from './collections.js'

const output_directory = 'indices'

// Fechas que aparecen en los metadatos de GureGipuzkoa y que no son válidas
// Pero que podemos —más o menos— arreglar.
const dates = [
  {
    value: 'enero 2018',
    date: '2018-01-00',
  },
  {
    value: '14 junio 1990',
    date: '1990-06-14',
  },
  {
    value: '29 ABRIL 1973',
    date: '1973-04-29',
  },
  {
    value: '19 agosto 2002',
    date: '2002-08-19',
  },
  {
    value: 'AÑOS 80',
    decade: '1980',
  },
  {
    value: 'AÑOS 70',
    decade: '1970',
  },
  {
    value: 'AÑOS 40',
    decade: '1940',
  },
  {
    value: 'AÑOS 30',
    decade: '1930',
  },
  {
    value: '21 DICIEMBRE AÑOS 70',
    decade: '1970',
  },
]

const minConfidence = 80

// La fotografía se popularizó a partir de 1839. No puede haber nada anterior.
const dateRegex = /^(18[3-9]\d|19\d{2}|20[0-1]\d|202[0-3])(-\d{2}-\d{2})?$/

const args = process.argv.slice(2)

if (args.length < 1) {
  process.stdout.write(`Uso: node ${process.argv[1]} [FICHEROS]`)
  process.exit(1)
}

const _indices = {}

args.forEach((input) => {
  const contents = fs.readFileSync(input).toString()
  const json = JSON.parse(contents)

  const indices = []

  const folder = json.summary.image.match(/^https.+gallery\/(.+)\//)[1]

  const { photographer, municipio, fecha, author } = json.details.image_data

  // No genero índices para las etiquetas de GureGipuzkoa porque no confío
  // en ellas como criterio taxonómico…
  // const tags = json.details.image_data.tags.map(({ name }) => name)

  const labels = json.labels.Labels.filter(
    ({ Confidence }) => Confidence > minConfidence,
  ).map(({ Name }) => Name)

  const faces = json.faces.FaceDetails.filter(
    ({ Confidence }) => Confidence > minConfidence,
  )

  // Podría generar índices en función de los metadatos EXIF, pero tampoco
  // parece muy útil, más allá de la curiosidad:
  // - .exif.make === "NIKON CORPORATION",
  // - .exif.model === "NIKON D70",

  if (municipio) {
    const found = locations.find(({ value }) => value === municipio)
    if (!found) {
      throw new Error(`El lugar "${municipio}" no está en el catálogo.`)
    }

    const places = [found.name, ...found.parents]
      .map(slugize)
      .map((slug) => `places/${slug}`)

    indices.push(...places)
  }

  if (fecha) {
    const found = dates.find(({ value }) => value === fecha)

    const date = found?.date ?? fecha
    const year = date.substring(0, 4)
    const decade = found?.decade ?? `${year.substring(0, 3)}0`
    const century = Math.ceil(year / 100)

    const valid = dateRegex.test(date)
    if (valid) {
      indices.push(`years/${year}`)
      indices.push(`decades/${decade}`)
      indices.push(`centuries/${century}`)
    }
  }

  if (labels.length) {
    indices.push(
      ...labels.map((label) => {
        const slug = slugize(label)
        return `labels/${slug}`
      }),
    )
  }

  const count = faces.length
  indices.push(`faces/${count}`)

  const found = collections
    .filter(
      (collection) =>
        (!collection.folder || collection.folder === folder) &&
        (!collection.author || collection.author === author) &&
        (!collection.photographer || collection.photographer === photographer),
    )
    .map(({ name }) => `collections/${slugize(name)}`)

  if (found.length) {
    indices.push(...found)
  }

  if (photographer) {
    const found = photographers.find(({ value }) => value === photographer)
    if (!found) {
      throw new Error(`El fotógrafo "${photographer}" no está en el catálogo.`)
    }

    // En el catálogo constan algunos «fotógrafos» que no son personas,
    // como «[Paisajes españoles]», a los que allí he asignado el nombre `null`.
    if (found.name) {
      const slug = slugize(found.name)
      indices.push(`photographers/${slug}`)
    }
  }

  if (author) {
    const found = authors.find(({ value }) => value === author)
    if (!found) {
      throw new Error(`El autor "${author}" no está en el catálogo.`)
    }

    // En el catálogo de `authors` también he asignado `null` a algunos usuarios
    // que parecen de prueba.
    if (found.name) {
      const slug = slugize(found.name)
      indices.push(`users/${slug}`)
    }
  }

  if (folders.includes(folder)) {
    indices.push(`folders/${folder}`)
  }

  if (!indices.length) {
    throw new Error(`Fotografía en ningún índice: "${input}".`)
  }

  json.indices = indices

  const output = input.replace('metadata_temp', 'metadata')

  if (!fs.existsSync(output) || fs.statSync(output).size === 0) {
    fs.writeFileSync(output, JSON.stringify(json))
  }

  indices.forEach((index) => {
    const string = input.match(/metadata_temp\/(\d+)\.json/)?.[1]

    if (!string) {
      return
    }

    const id = parseInt(string)

    let title = json.summary.title
    let caption = json.summary.caption

    const pattern = new RegExp(`^[ "']*[0-9]+(\.(jpe?g|png)?[ "']*)?$`, 'i')
    if (pattern.test(title)) {
      title = ''
    }

    title = title.replaceAll('\n', ' ')
    caption = caption.replaceAll('\n', ' ')

    title = title.replaceAll(/\s+/g, ' ')
    caption = caption.replaceAll(/\s+/g, ' ')

    // Caracteres de control que hay en los datos originales.
    title = title.replaceAll(/[\u0000-\u001F\u007F-\u009F]/g, '')
    caption = caption.replaceAll(/[\u0000-\u001F\u007F-\u009F]/g, '')

    if (title === caption && title.length) {
      caption = ''
    }

    title = title.length <= 2 ? '' : title
    caption = caption.length <= 3 ? '' : caption

    // Hay cosas como "&amp;amp;"…
    while (decode(title) !== title) {
      title = decode(title)
    }

    while (decode(caption) !== caption) {
      caption = decode(caption)
    }

    title = title.trim()
    caption = caption.trim()

    const record = [
      id,
      // `""` es más corto que `null`, por lo que los índices ocupan menos.
      title || '',
      caption || '',
    ]

    _indices[index] = _indices[index] ? [..._indices[index], record] : [record]
  })
})

Object.entries(_indices).forEach(([index, records]) => {
  const output = `${output_directory}/${index}.json`

  const contents = fs.existsSync(output)
    ? fs.readFileSync(output).toString()
    : null

  const json = contents ? [...JSON.parse(contents), ...records] : records

  const folder = path.dirname(index).split(path.sep).pop()

  fs.mkdirSync(`${output_directory}/${folder}`, {
    recursive: true,
  })

  const string = JSON.stringify(json)
  fs.writeFileSync(output, string)
})
