#!/usr/bin/env node

// ! Esta función fue desarrollada con Node 18, que en 2025 ha llegado al final
// ! de su ciclo de vida, y AWS ha dejado de soportarla. Es por ello que, en
// ! abril de 2025, cambio el _runtime_ de AWS a Node 22, aunque esta función no
// ! ha sido probada con esa versión.

/**
 * Véase la documentación en `/docs/guregipuzkoa.md`.
 * Véas la API de `sharp` en https://sharp.pixelplumbing.com
 */
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import sharp from 'sharp'
import path from 'path'

const sourceBucket = 'guregipuzkoa-temp'
const targetBucket = 'guregipuzkoa'
const targetPathOriginal = 'originals'
const targetPathAvif = 'optimized'

const s3 = new S3Client()

const handler = async (event) => {
  const { key } = event.Records[0].s3.object

  const target = path.basename(key).replace(/(.*)\.[^.]*$/, '$1') + '.avif'

  const getCommand = new GetObjectCommand({
    Bucket: sourceBucket,
    Key: key,
  })

  const response = await s3.send(getCommand)

  const stream = response.Body

  const buffer = []

  const contents = await new Promise((resolve, reject) => {
    // @ts-ignore
    stream.on('data', (chunk) => buffer.push(chunk))
    // @ts-ignore
    stream.on('end', () => resolve(Buffer.concat(buffer)))
    // @ts-ignore
    stream.on('error', (err) => reject(err))
  })

  const avif = await sharp(contents)
    .resize({
      width: 2000,
      height: 1500,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .avif({
      quality: 65,
      effort: 4,
    })
    .toBuffer()

  const putCommand = new PutObjectCommand({
    Body: avif,
    Bucket: targetBucket,
    Key: `${targetPathAvif}/${target}`,
  })

  await s3.send(putCommand)

  const copyCommand = new CopyObjectCommand({
    Bucket: targetBucket,
    CopySource: `/${sourceBucket}/${key}`,
    Key: `${targetPathOriginal}/${key}`,
  })

  await s3.send(copyCommand)

  const deleteCommand = new DeleteObjectCommand({
    Bucket: sourceBucket,
    Key: key,
  })

  await s3.send(deleteCommand)
}

export { handler }
