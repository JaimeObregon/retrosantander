// Solo para que Prettier formatee la sintaxis.
const html = String.raw
const css = String.raw

// Escapa una cadena para interpolarla de manera segura en HTML
const escape = (string) =>
  string.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#apos;',
        '"': '&quot;',
      })[tag],
  )

// He comprobado que estas son las únicas entidades que aparecen en los metadatos del CDIS y de GureGipuzkoa.
const decode = (string) => {
  return string.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;|&apos;|&ordm;|&aacute;|&eacute;|&iacute;|&iquest;|&ntilde;|&oacute;/g,
    (match) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"',
        '&apos;': "'",
        '&ordm;': 'º',
        '&aacute;': 'á',
        '&eacute;': 'é',
        '&iacute;': 'í',
        '&iquest;': '¿',
        '&ntilde;': 'ñ',
        '&oacute;': 'ó',
      })[match],
  )
}

// Tokeniza una cadena. Véase https://es.stackoverflow.com/a/62032.
// `Manuel   González-Mesones` → `manuel gonzalez mesones`.
// `Camión en Oñati` → `camion en oñati`.
const normalize = (string) => {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      '$1',
    )
    .normalize()
    .replace(/[^a-z0-9ñç ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Devuelve el «slug» de una cadena.
// `Ayuntamiento de Donostia/San Sebastián` → `ayuntamiento_de_donostia_san_sebastian`
// `Leintz-Gatzaga` → `leintz_gatzaga`
const slugize = (string) => normalize(string).replaceAll(' ', '_')

// El CDIS a veces encierra los títulos de las imágenes entre corchetes,
// entre comillas… Aquí tratamos de revertir los casos más habituales.
const prettify = (title) => {
  let string = title.trim()

  let [first, last] = [string[0], string[string.length - 1]]

  const period = last === '.' && string.slice(0, -1).indexOf('.') === -1
  if (period) {
    string = string.slice(0, -1)
    first = string[0]
    last = string[string.length - 1]
  }

  const betweenBrackets = first === '[' && last === ']'
  const betweenQuotationMarks =
    first === '"' && last === '"' && string.slice(1, -1).indexOf('"') === -1

  return betweenBrackets || betweenQuotationMarks ? string.slice(1, -1) : string
}

export { css, decode, escape, html, normalize, prettify, slugize }
