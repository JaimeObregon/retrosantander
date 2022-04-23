const response = await fetch('/retrosantander.json')
const json = await response.json()

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

const index = json.map((item) => {
  return {
    id: item.id,
    title: normalize(item.details['Título']),
    details: {
      ...item.details,
    },
  }
})

const data = {
  length: json.length,

  find: (id) => json.find((item) => item.id === id),

  search: (string) => {
    const query = normalize(string)

    if (!query.length) {
      return index
    }

    const regexp = new RegExp(query)
    return index.filter((item) => item.title.match(regexp))
  },
}

export { data }
