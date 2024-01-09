#!/usr/bin/env node

/**
 * Véase la documentación en `/docs/guregipuzkoa.md`.
 */
import fetch from 'node-fetch'
import fs from 'fs'

const template =
  'https://www.guregipuzkoa.eus/nextgen-pro-lightbox-gallery/www.guregipuzkoa.eus/?photocrati_ajax=1&action=get_comments&page=0&type=image&id='

const args = process.argv.slice(2)

if (args.length !== 1) {
  process.stdout.write(`Uso: node ${process.argv[1]} DIRECTORIO`)
  process.exit(1)
}

const folder = process.argv[2]

const stdin = process.openStdin()

const chunks = []

stdin.on('data', (chunk) => chunks.push(chunk))

stdin.on('end', async () => {
  const string = chunks.join('')
  const images = JSON.parse(string)

  let i = 0
  let chunk
  do {
    chunk = images.slice(i, i + 10)

    const ids = chunk
      .map((element) => element.id.match(/\/photo\/(\d+)\/$/)[1])
      .filter((id) => {
        const filename = `${folder}/${id}.json`

        let exists
        try {
          const { size } = fs.statSync(filename)
          exists = Boolean(size)
        } catch (exception) {
          if (exception.code === 'ENOENT') {
            exists = false
          } else {
            throw exception
          }
        }

        return !exists
      })
      .join()

    i += 10

    if (!ids.length) {
      continue
    }

    const url = `${template}${ids}`

    const progress = (100 * i) / images.length
    const percent = Math.round((progress + Number.EPSILON) * 100) / 100
    console.log(`${i} ${percent}% ${url}`)

    const response = await fetch(url)
    const json = await response.json()

    Object.entries(json.responses).forEach(([id, response]) => {
      const filename = `${folder}/${id}.json`
      const string = JSON.stringify(response)
      fs.writeFileSync(filename, string)
    })
  } while (chunk.length)
})
