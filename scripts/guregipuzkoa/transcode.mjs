#!/usr/bin/env node

import {
  RekognitionClient,
  DetectFacesCommand,
  DetectLabelsCommand,
} from '@aws-sdk/client-rekognition'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'

const bucket = 'guregipuzkoa-temp'

const args = process.argv.slice(2)

if (args.length !== 1) {
  process.stdout.write(`Uso: node ${process.argv[1]} FICHERO`)
  process.exit(1)
}

const file = process.argv[2]

console.log(file)

process.exit()

const buffer = fs.readFileSync(file)

const s3 = new S3Client()

const input = {
  Body: buffer,
  Bucket: bucket,
  Key: 'HappyFace.jpg',
}

const command = new PutObjectCommand(input)

const response = await s3.send(command)

console.log(response)

const rekognition = new RekognitionClient({})

const params = {
  Image: {
    Bytes: stream.buffer,
  },
}

const input = { ...params, Attributes: ['ALL'] }

console.log('holi')

console.log(input)

const faces = new DetectFacesCommand(input)

console.log(faces)

const result = await rekognition.send(faces)
console.log(result)

// const labels = new DetectLabelsCommand(params)

// console.log('holi')

// console.log(await rekognition.send(faces))

// console.log('holi')

// const results = await Promise.all([
//   rekognition.send(faces),
//   rekognition.send(labels),
// ])

// const output = JSON.stringify({ ...results[0], ...results[1] }, null, 2)

// process.stdout.write(output)

// const labels = new DetectLabelsCommand(params)

// console.log('holi')

// console.log(await rekognition.send(faces))

// console.log('holi')

// const results = await Promise.all([
//   rekognition.send(faces),
//   rekognition.send(labels),
// ])

// const output = JSON.stringify({ ...results[0], ...results[1] }, null, 2)

// process.stdout.write(output)
