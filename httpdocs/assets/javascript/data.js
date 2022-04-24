const normalize = (string) => {
  // https://es.stackoverflow.com/a/62032
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      '$1'
    )
    .normalize()
}

const prettify = (title) => {
  const firstCharacter = title[0]
  const lastCharacter = title[title.length - 1]

  if (
    (firstCharacter === '[' && lastCharacter === ']') ||
    (firstCharacter === '"' && lastCharacter === '"')
  ) {
    return title.slice(1, -1).trim()
  }

  return title.trim()
}

const response = await fetch('/retrosantander.json')
const json = await response.json()

const index = json.map((item) => ({
  ...item,
  title: prettify(item.title),
  index: normalize(item.title),
}))

const data = {
  length: index.length,

  find: (id) => index.find((item) => item.id === id),

  search: (string) => {
    const query = normalize(string)

    if (!query.length) {
      return index.sort(() => Math.random() - 0.5)
    }

    const regexp = new RegExp(query)
    return index.filter((item) => item.index.match(regexp))
  },
}

export { data }
