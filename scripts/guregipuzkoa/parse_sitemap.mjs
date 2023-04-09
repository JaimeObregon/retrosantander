/**
 * Recibe el _sitemap_ mal formato de guregipuzkoa.eus, lo interpreta y devuelve
 * una structura JSON equivalente.
 *
 * Véase la documentación en `/docs/guregipuzkoa.md`.
 */
import fs from 'fs'

const args = process.argv.slice(2)

if (args.length !== 1) {
  process.stdout.write(`Uso: node ${process.argv[1]} [FICHERO]`)
  process.exit(1)
}

const pattern = new RegExp(
  [
    /<url>\s*/,
    /<loc>(?<id>.+?)<\/loc>\s*/,
    /<priority>.+?<\/priority>\s*/,
    /<image:image>\s*/,
    /<image:loc>(?<image>.*?)<\/image:loc>\s*/,
    /<image:title>(?<title>.*?)<\/image:title>\s*/,
    /<image:caption>(?<caption>.*?)<\/image:caption>\s*/,
    /<\/image:image>\s*/,
    /<\/url>/,
  ]
    .map((chunk) => chunk.source)
    .join(''),
  'gs'
)

const file = process.argv[2]
const contents = fs.readFileSync(file).toString()

const matches = contents
  // Además de no ser XML válido, el _sitemap_ del guregipuzkoa.eus
  // contiene errores que detectamos y corregimos aquí.
  .replaceAll('guregipuzkoa.euswp-content', 'guregipuzkoa.eus/wp-content')
  .matchAll(pattern)

const results = [...matches].map((match) => match.groups)
const string = JSON.stringify(results)

process.stdout.write(string)
