#!/usr/bin/env node

import fs from 'fs'
import {
  photographers,
  authors,
  locations,
  folders,
  collections,
} from './collections.mjs'

// Escapa una cadena para interpolarla de manera segura en HTML
const escape = (string) =>
  string.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag])
  )

// Tokeniza una cadena. Véase https://es.stackoverflow.com/a/62032.
// `Manuel   González-Mesones` > `manuel gonzalez mesones`.
// `Camión en Oñati` > `camion en oñati`.
const normalize = (string) => {
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
    .trim()
}

// Devuelve el _slug_ de una cadena.
// `Ayuntamiento de Donostia/San Sebastián` > `ayuntamiento_de_donostia_san_sebastian`
// `Leintz-Gatzaga` > `leintz_gatzaga`
const slugize = (string) => normalize(string).replaceAll(' ', '_')

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

// La fotografía se popularizó a partir de 1839.
const dateRegex = /^(18[3-9]\d|19\d{2}|20[0-1]\d|202[0-3])(-\d{2}-\d{2})?$/

const args = process.argv.slice(2)

if (args.length < 1) {
  process.stdout.write(`Uso: node ${process.argv[1]} [FICHEROS]`)
  process.exit(1)
}

args.forEach((file) => {
  const contents = fs.readFileSync(file).toString()
  const json = JSON.parse(contents)

  const indices = []

  const folder = json.summary.image.match(/^https.+gallery\/(.+)\//)[1]

  const { photographer, municipio, fecha, author } = json.details.image_data

  const tags = json.details.image_data.tags.map(({ name }) => name)

  const labels = json.labels.Labels.filter(
    ({ Confidence }) => Confidence > minConfidence
  ).map(({ Name }) => Name)

  const faces = json.faces.FaceDetails.filter(
    ({ Confidence }) => Confidence > minConfidence
  )

  // author,
  // tags,

  // "Make": "NIKON CORPORATION",
  // "Model": "NIKON D70",

  // con faces, como con decades:
  // if (count > 75) {
  //   indices.push(`???/over_75`)
  // }

  // poder combinar filtros? "faces/3 + collections/oñatiko_udala + decades/2000" ???
  // recortar instances de 'faces' y 'labels' ???

  if (municipio) {
    const found = locations.find(({ value }) => value === municipio)
    if (!found) {
      throw new Error(`El lugar "${municipio}" no está en el catálogo.`)
    }

    const slug = slugize(found.name)

    indices.push(`places/${slug}`)
  }

  if (fecha) {
    const found = dates.find(({ value }) => value === fecha)

    const date = found?.date ?? fecha
    const year = date.substring(0, 4)
    const decade = found?.decade ?? `${year.substring(0, 3)}0`

    const valid = dateRegex.test(date)
    if (valid) {
      indices.push(`years/${year}`)
      indices.push(`decades/${decade}`)
    }
  }

  if (labels.length) {
    indices.push(
      ...labels.map((label) => {
        const slug = slugize(label)
        return `labels/${slug}`
      })
    )
  }

  const count = faces.length
  indices.push(`faces/${count}`)

  const found = collections
    .filter(
      (collection) =>
        (!collection.folder || collection.folder === folder) &&
        (!collection.author || collection.author === author) &&
        (!collection.photographer || collection.photographer === photographer)
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
    throw new Error(`Fotografía en ningún índice: "${file}".`)
  }

  console.log(indices)
  // indices.forEach((index) => console.log(index))
})
