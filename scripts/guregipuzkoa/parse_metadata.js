#!/usr/bin/env node

/**
 * Parece que este _script_ no se utiliza en el proceso técnico que detallo en
 * `/docs/guregipuzkoa.md`. Parece que lo escribí para realizar alguna
 * comprobación. O bien lo descarté por innecesario.
 */
import fs from 'fs'
import { decode } from 'html-entities'

const a = [
  'title',
  'photographer',
  'photographer_rendered',
  'municipio',
  'municipio_rendered',
  'fecha',
  'licencia',
  'licencia_rendered',
  'author',
  'author_rendered',
  'tags',
  'tags-rendered',
  'referencia',
  'referencia_rendered',
]

const pattern = new RegExp(
  [
    /<time datetime="(?<date>.+?)">.*?/,
    /data-comment-id='(?<id>\d+)'\s*/,
    /data-user-name='(?<user>.+?)'>.*?/,
    /<section class="comment-content comment">\s*(?<comment>.*?)\s*<\/section>/,
  ]
    .map((chunk) => chunk.source)
    .join(''),
  'gs',
)

const args = process.argv.slice(2)

if (args.length !== 1) {
  process.stdout.write(`Uso: node ${process.argv[1]} [FICHERO]`)
  process.exit(1)
}

const file = process.argv[2]
const contents = fs.readFileSync(file).toString()

const json = JSON.parse(contents)
const data = json.image_data

const b = Object.keys(data)
const sameKeys = a.length === b.length && a.every((e, i) => e === b[i])

if (!sameKeys) {
  throw new Error('Faltan o sobran claves.')
}

const matches = json.rendered_view.matchAll(pattern)

const comments = [...matches].map((match) => ({
  ...match.groups,
  user: decode(match.groups.user),
  comment: decode(match.groups.comment),
}))

const output = {
  title: decode(data.title),
  photographer: decode(data.photographer),
  author: decode(data.author),
  location: decode(data.municipio),
  date: decode(data.fecha),
  license: decode(data.licencia),
  reference: decode(data.referencia),
  tags: data.tags.map(({ name }) => decode(name)),
  comments,
}

process.stdout.write(JSON.stringify(output))
