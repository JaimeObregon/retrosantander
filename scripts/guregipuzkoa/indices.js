#!/usr/bin/env node

/**
 * Toma como entrada la ruta del directorio `indices` y devuelve por `stdout` el
 * índice de índices existente en `s3:///guregipuzkoa/indices/indices.json`.
 */

import fs from 'fs'
import { slugize } from '../../httpdocs/modules/strings.js'
import path from 'path'

import {
  photographers,
  authors,
  locations,
  collections,
} from './collections.js'

const indices = []

const find = (array, slug) => {
  const collection = array
    .filter(({ name }) => name)
    .find(({ name }) => slugize(name) === slug)

  if (!collection) {
    return
  }

  const { name } = collection
  return name
}

const types = {
  centuries: (name) => name,
  decades: (name) => name,
  faces: (name) => name,
  folders: (name) => name,
  labels: (name) => name,
  years: (name) => name,

  collections: (slug) => find(collections, slug),
  photographers: (slug) => find(photographers, slug),
  places: (slug) => find(locations, slug),

  // Yo prefiero llamarlo «usuarios», para no confundir, semánticamente,
  // «author» con «photographer», pero en GureGipuzkoa estaba así.
  users: (slug) => find(authors, slug),
}

function processDirectory(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      processDirectory(fullPath)
    } else if (
      path.extname(entry.name) === '.json' &&
      path.basename(entry.name) !== 'indices.json'
    ) {
      const contents = fs.readFileSync(fullPath).toString()
      const json = JSON.parse(contents)

      const type = fullPath.match(/indices\/(.+)\//)?.[1]
      const slug = fullPath.match(/indices\/(.+)\/(.+).json/)?.[2]

      const count = json.length

      const name = types[type](slug)

      indices.push([type, slug, name, count])
    }
  })
}

const args = process.argv.slice(2)

if (args.length !== 1) {
  process.stdout.write(`Uso: node ${process.argv[1]} [DIRECTORIO]`)
  process.exit(1)
}

const folder = args[0]

processDirectory(folder)

// Omitimos los índices que contengan menos de 10 imágenes
const string = JSON.stringify(
  indices.filter(([type, slug, name, count]) => count >= 10),
)

process.stdout.write(string)
