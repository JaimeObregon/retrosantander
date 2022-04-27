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
  const first = title[0]
  const last = title[title.length - 1]

  if ((first === '[' && last === ']') || (first === '"' && last === '"')) {
    return title.slice(1, -1).trim()
  }

  return title.trim()
}

class Database {
  index

  constructor(json) {
    this.index = json.map((item) => ({
      ...item,
      title: prettify(item.title),
      index: normalize(item.title),
    }))
  }

  get length() {
    return this.index.length
  }

  find(id) {
    return this.index.find((item) => item.id === id)
  }

  search(string) {
    const query = normalize(string)

    if (!query.length) {
      return this.index.sort(() => Math.random() - 0.5)
    }

    const regexp = new RegExp(query)
    return this.index.filter((item) => item.index.match(regexp))
  }
}

export { Database }
