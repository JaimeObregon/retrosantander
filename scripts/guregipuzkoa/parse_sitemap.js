#!/usr/bin/env node

/**
 * Recibe el _sitemap_ mal formado de guregipuzkoa.eus, lo interpreta y devuelve
 * una structura JSON equivalente.
 *
 * Véase la documentación en `/docs/guregipuzkoa.md`.
 */
import fs from 'fs'

const args = process.argv.slice(2)

if (args.length !== 1) {
  process.stdout.write(`Uso: node ${process.argv[1]} FICHERO`)
  process.exit(1)
}

// Algunas imágenes de guregipuzkoa.eus no son válidas por diferentes razones y
// decidimos excluirlas aquí del _sitemap_, para que no participen del resto de
// pasos del proceso.
const excludeIds = [
  // Ficheros que se descargan con tamaño cero bytes
  'https://www.guregipuzkoa.eus/photo/153248/',
  'https://www.guregipuzkoa.eus/photo/153272/',
  'https://www.guregipuzkoa.eus/photo/153225/',
  'https://www.guregipuzkoa.eus/photo/153233/',
  'https://www.guregipuzkoa.eus/photo/153264/',
  'https://www.guregipuzkoa.eus/photo/153213/',
  'https://www.guregipuzkoa.eus/photo/153244/',
  'https://www.guregipuzkoa.eus/photo/153252/',
  'https://www.guregipuzkoa.eus/photo/51728/',
  'https://www.guregipuzkoa.eus/photo/153291/',
  'https://www.guregipuzkoa.eus/photo/153229/',
  'https://www.guregipuzkoa.eus/photo/58749/',
  'https://www.guregipuzkoa.eus/photo/153287/',
  'https://www.guregipuzkoa.eus/photo/153268/',
  'https://www.guregipuzkoa.eus/photo/21294/',
  'https://www.guregipuzkoa.eus/photo/153269/',
  'https://www.guregipuzkoa.eus/photo/153228/',
  'https://www.guregipuzkoa.eus/photo/153290/',
  'https://www.guregipuzkoa.eus/photo/131300/',
  'https://www.guregipuzkoa.eus/photo/153253/',
  'https://www.guregipuzkoa.eus/photo/153245/',
  'https://www.guregipuzkoa.eus/photo/153212/',
  'https://www.guregipuzkoa.eus/photo/153265/',
  'https://www.guregipuzkoa.eus/photo/153232/',
  'https://www.guregipuzkoa.eus/photo/153224/',
  'https://www.guregipuzkoa.eus/photo/153273/',
  'https://www.guregipuzkoa.eus/photo/153249/',
  'https://www.guregipuzkoa.eus/photo/68235/',
  'https://www.guregipuzkoa.eus/photo/6178/',
  'https://www.guregipuzkoa.eus/photo/153215/',
  'https://www.guregipuzkoa.eus/photo/153242/',
  'https://www.guregipuzkoa.eus/photo/153254/',
  'https://www.guregipuzkoa.eus/photo/45917/',
  'https://www.guregipuzkoa.eus/photo/153297/',
  'https://www.guregipuzkoa.eus/photo/153278/',
  'https://www.guregipuzkoa.eus/photo/131239/',
  'https://www.guregipuzkoa.eus/photo/153239/',
  'https://www.guregipuzkoa.eus/photo/31441/',
  'https://www.guregipuzkoa.eus/photo/153219/',
  'https://www.guregipuzkoa.eus/photo/93503/',
  'https://www.guregipuzkoa.eus/photo/153258/',
  'https://www.guregipuzkoa.eus/photo/104194/',
  'https://www.guregipuzkoa.eus/photo/68199/',
  'https://www.guregipuzkoa.eus/photo/153223/',
  'https://www.guregipuzkoa.eus/photo/153235/',
  'https://www.guregipuzkoa.eus/photo/30030/',
  'https://www.guregipuzkoa.eus/photo/153262/',
  'https://www.guregipuzkoa.eus/photo/153263/',
  'https://www.guregipuzkoa.eus/photo/30031/',
  'https://www.guregipuzkoa.eus/photo/153234/',
  'https://www.guregipuzkoa.eus/photo/153222/',
  'https://www.guregipuzkoa.eus/photo/153275/',
  'https://www.guregipuzkoa.eus/photo/129278/',
  'https://www.guregipuzkoa.eus/photo/153259/',
  'https://www.guregipuzkoa.eus/photo/153218/',
  'https://www.guregipuzkoa.eus/photo/31440/',
  'https://www.guregipuzkoa.eus/photo/153238/',
  'https://www.guregipuzkoa.eus/photo/153279/',
  'https://www.guregipuzkoa.eus/photo/51685/',
  'https://www.guregipuzkoa.eus/photo/153255/',
  'https://www.guregipuzkoa.eus/photo/153243/',
  'https://www.guregipuzkoa.eus/photo/92431/',
  'https://www.guregipuzkoa.eus/photo/153214/',
  'https://www.guregipuzkoa.eus/photo/37352/',
  'https://www.guregipuzkoa.eus/photo/153256/',
  'https://www.guregipuzkoa.eus/photo/153240/',
  'https://www.guregipuzkoa.eus/photo/153217/',
  'https://www.guregipuzkoa.eus/photo/29993/',
  'https://www.guregipuzkoa.eus/photo/153260/',
  'https://www.guregipuzkoa.eus/photo/153237/',
  'https://www.guregipuzkoa.eus/photo/153221/',
  'https://www.guregipuzkoa.eus/photo/153276/',
  'https://www.guregipuzkoa.eus/photo/68226/',
  'https://www.guregipuzkoa.eus/photo/44534/',
  'https://www.guregipuzkoa.eus/photo/74880/',
  'https://www.guregipuzkoa.eus/photo/76106/',
  'https://www.guregipuzkoa.eus/photo/74896/',
  'https://www.guregipuzkoa.eus/photo/6111/',
  'https://www.guregipuzkoa.eus/photo/153277/',
  'https://www.guregipuzkoa.eus/photo/6146/',
  'https://www.guregipuzkoa.eus/photo/153220/',
  'https://www.guregipuzkoa.eus/photo/153236/',
  'https://www.guregipuzkoa.eus/photo/153261/',
  'https://www.guregipuzkoa.eus/photo/153216/',
  'https://www.guregipuzkoa.eus/photo/153241/',
  'https://www.guregipuzkoa.eus/photo/153257/',
  'https://www.guregipuzkoa.eus/photo/30005/',
  'https://www.guregipuzkoa.eus/photo/153294/',
  'https://www.guregipuzkoa.eus/photo/37353/',
  'https://www.guregipuzkoa.eus/photo/51701/',
  'https://www.guregipuzkoa.eus/photo/153282/',
  'https://www.guregipuzkoa.eus/photo/109212/',
  'https://www.guregipuzkoa.eus/photo/153266/',
  'https://www.guregipuzkoa.eus/photo/153231/',
  'https://www.guregipuzkoa.eus/photo/129302/',
  'https://www.guregipuzkoa.eus/photo/153227/',
  'https://www.guregipuzkoa.eus/photo/153270/',
  'https://www.guregipuzkoa.eus/photo/6213/',
  'https://www.guregipuzkoa.eus/photo/82068/',
  'https://www.guregipuzkoa.eus/photo/153285/',
  'https://www.guregipuzkoa.eus/photo/132016/',
  'https://www.guregipuzkoa.eus/photo/153293/',
  'https://www.guregipuzkoa.eus/photo/153250/',
  'https://www.guregipuzkoa.eus/photo/153246/',
  'https://www.guregipuzkoa.eus/photo/153247/',
  'https://www.guregipuzkoa.eus/photo/153251/',
  'https://www.guregipuzkoa.eus/photo/110023/',
  'https://www.guregipuzkoa.eus/photo/92458/',
  'https://www.guregipuzkoa.eus/photo/82049/',
  'https://www.guregipuzkoa.eus/photo/76120/',
  'https://www.guregipuzkoa.eus/photo/29977/',
  'https://www.guregipuzkoa.eus/photo/153284/',
  'https://www.guregipuzkoa.eus/photo/68217/',
  'https://www.guregipuzkoa.eus/photo/92478/',
  'https://www.guregipuzkoa.eus/photo/153271/',
  'https://www.guregipuzkoa.eus/photo/153226/',
  'https://www.guregipuzkoa.eus/photo/153230/',
  'https://www.guregipuzkoa.eus/photo/153267/',
  'https://www.guregipuzkoa.eus/photo/153288/',

  // Imágenes corrompidas
  'https://www.guregipuzkoa.eus/photo/155945/', // Es un fichero XML insulso
  'https://www.guregipuzkoa.eus/photo/98959/',
  'https://www.guregipuzkoa.eus/photo/152286/',
  'https://www.guregipuzkoa.eus/photo/143317/',
  'https://www.guregipuzkoa.eus/photo/62064/',
  'https://www.guregipuzkoa.eus/photo/107032/',
  'https://www.guregipuzkoa.eus/photo/153286/',
  'https://www.guregipuzkoa.eus/photo/62065/',
  'https://www.guregipuzkoa.eus/photo/74430/',
  'https://www.guregipuzkoa.eus/photo/98958/',
  'https://www.guregipuzkoa.eus/photo/152272/',
  'https://www.guregipuzkoa.eus/photo/34842/',
  'https://www.guregipuzkoa.eus/photo/153281/',
  'https://www.guregipuzkoa.eus/photo/14133/',
  'https://www.guregipuzkoa.eus/photo/152367/',
  'https://www.guregipuzkoa.eus/photo/153274/',
  'https://www.guregipuzkoa.eus/photo/34834/',
  'https://www.guregipuzkoa.eus/photo/153280/',
  'https://www.guregipuzkoa.eus/photo/53114/',
  'https://www.guregipuzkoa.eus/photo/153296/',
  'https://www.guregipuzkoa.eus/photo/153283/',
  'https://www.guregipuzkoa.eus/photo/153295/',
  'https://www.guregipuzkoa.eus/photo/152364/',
  'https://www.guregipuzkoa.eus/photo/153298/',
  'https://www.guregipuzkoa.eus/photo/152535/',
  'https://www.guregipuzkoa.eus/photo/153289/',
  'https://www.guregipuzkoa.eus/photo/152322/',
  'https://www.guregipuzkoa.eus/photo/153292/',
  'https://www.guregipuzkoa.eus/photo/107031/',

  // Imágenes cuyas dimensiones son insuficientes
  'https://www.guregipuzkoa.eus/photo/40162/', // 115×86
  'https://www.guregipuzkoa.eus/photo/46537/', // 1×1
  'https://www.guregipuzkoa.eus/photo/147323/', // 65×65
  'https://www.guregipuzkoa.eus/photo/46385/', // 1×1
  'https://www.guregipuzkoa.eus/photo/137870/', // 73×96
  'https://www.guregipuzkoa.eus/photo/61669/', // 300×119
  'https://www.guregipuzkoa.eus/photo/153064/', // 65×65
  'https://www.guregipuzkoa.eus/photo/40163/', // 120×90
  'https://www.guregipuzkoa.eus/photo/142541/', // 73×96
  'https://www.guregipuzkoa.eus/photo/35382/', // 90×138
  'https://www.guregipuzkoa.eus/photo/153063/', // 65×65
  'https://www.guregipuzkoa.eus/photo/147325/', // 65×65
  'https://www.guregipuzkoa.eus/photo/117891/', // 65×65
  'https://www.guregipuzkoa.eus/photo/117890/', // 65×65
  'https://www.guregipuzkoa.eus/photo/147324/', // 65×65
  'https://www.guregipuzkoa.eus/photo/153062/', // 65×65
  'https://www.guregipuzkoa.eus/photo/27058/', // 118×80
  'https://www.guregipuzkoa.eus/photo/132072/', // 570×119
  'https://www.guregipuzkoa.eus/photo/33191/', // 2×2
  'https://www.guregipuzkoa.eus/photo/61663/', // 300×119
  'https://www.guregipuzkoa.eus/photo/142538/', // 150×106
  'https://www.guregipuzkoa.eus/photo/117889/', // 65×65
  'https://www.guregipuzkoa.eus/photo/27057/', // 117×80
  'https://www.guregipuzkoa.eus/photo/51665/', // 2×2
  'https://www.guregipuzkoa.eus/photo/153061/', // 65×65
  'https://www.guregipuzkoa.eus/photo/147166/', // 240×121
  'https://www.guregipuzkoa.eus/photo/147326/', // 65×65
  'https://www.guregipuzkoa.eus/photo/117892/', // 65×65
  'https://www.guregipuzkoa.eus/photo/32632/', // 2×2
  'https://www.guregipuzkoa.eus/photo/33189/', // 2×2
  'https://www.guregipuzkoa.eus/photo/27056/', // 120×80
  'https://www.guregipuzkoa.eus/photo/137829/', // 150×106
  'https://www.guregipuzkoa.eus/photo/41863/', // 71×106
  'https://www.guregipuzkoa.eus/photo/46830/', // 1×1
  'https://www.guregipuzkoa.eus/photo/45861/', // 164×124
  'https://www.guregipuzkoa.eus/photo/137825/', // 115×127
  'https://www.guregipuzkoa.eus/photo/142533/', // 115×127

  // Imágenes panorámicas que son demasiado grandes:
  'https://www.guregipuzkoa.eus/photo/141326/', // 11680×1788
  'https://www.guregipuzkoa.eus/photo/151391/', // 11756×1593
]

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

const results = [...matches]
  .filter((match) => !excludeIds.includes(match.groups.id))
  .map((match) => match.groups)
const string = JSON.stringify(results)

process.stdout.write(string)
