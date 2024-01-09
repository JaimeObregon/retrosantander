#!/usr/bin/env node

import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'
import fs from 'fs'

const uploadTarget = {
  bucket: 'guregipuzkoa-temp',
  path: `images`,
}

const lambdaTarget = {
  bucket: 'guregipuzkoa',
  path: `originals/images`,
}

const s3 = new S3Client()

let objects = []
let response
let token
let i = 0

do {
  const command = new ListObjectsV2Command({
    Bucket: lambdaTarget.bucket,
    Prefix: `${lambdaTarget.path}/`,
    ...(token && { ContinuationToken: token }),
  })

  response = await s3.send(command)

  const _objects = response.Contents.map(({ Key: key, Size: size }) => ({
    key,
    size,
  }))

  objects = [...objects, ..._objects]

  process.stdout.write(`\r[${i++}] Encontrados ${objects.length} objetos…`)

  token = response.NextContinuationToken
} while (response.IsTruncated)

const existingIds = objects.map(
  ({ key }) => key.match(/originals\/images\/(.+)\.\w+$/)[1]
)

const stdin = process.openStdin()

const chunks = []

stdin.on('data', (chunk) => chunks.push(chunk))

stdin.on('end', async () => {
  const string = chunks.join('')
  const images = JSON.parse(string)

  const ids = images.map((element) => element.id.match(/\/photo\/(\d+)\/$/)[1])

  const idsToUpload = ids.filter((id) => !existingIds.includes(id))

  let i = 0
  for (const id of idsToUpload) {
    const extension = 'jpeg'

    const filename = `${id}.${extension}`
    const arn = `s3://${uploadTarget.bucket}/${uploadTarget.path}/${filename}`
    const route = `../../temp/guregipuzkoa/originals/images/${filename}`

    process.stdout.write(
      `\r[${++i}/${idsToUpload.length}] Subiendo ${route} a ${arn}…`
    )

    try {
      const buffer = fs.readFileSync(route)

      const command = new PutObjectCommand({
        Bucket: uploadTarget.bucket,
        Key: `${uploadTarget.path}/${filename}`,
        Body: buffer,
      })

      await s3.send(command)
    } catch (exception) {
      console.log(exception)
    }
  }
})
