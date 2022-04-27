<?php
/**
 * Interpreta y estructura las fichas de imágenes del sitio web del CDIS.
 *
 * Este script toma de STDIN la ficha de una imagen del CDIS y devuelve por
 * STDOUT un objeto JSON con la información de su título, fotógrafo, fecha,
 * colección, soporte…
 *
 * Esta salida puede, opcionalmente, redireccionarse a `jq` [1] para hacerla más
 * legible y embellecerla.
 *
 * Ejemplo de uso:
 * curl https://portal.ayto-santander.es/portalcdis/Public/FotoView.do?id=1200 | php parser.php
 *
 * [1] https://stedolan.github.io/jq/
 */

const REGEX_DETAILS = '/<li><strong>(?P<keys>.+?):<\/strong>\s*(?P<values>.*?)\s*<\/li>/';

const REGEX_TAGS = '/<a href="\/portalcdis\/Prepare.+List.do;jsessionid=.{32}\?idcateg=\d+">(?P<tags>.*?)<\/a>/';

const REGEX_IMAGE = [
	'/<dd>\s+',
		'<a href=".+" class="thickbox">',
			'<img src="\/portalcdis\/image\/DownloadFile\.do\?id=(?P<id>\d+)&ima=\d" width=".*" height=".*" alt=".*" title=".*" \/>',
		'<\/a>\s*',
		'<ul>\s*',
			'<li class="acciones">\s*',
        '<a href="\/portalcdis\/PrepareElegirResolucionView\.do;jsessionid=.{32}\?id=(?P<file>\d+)" .+?\/a>\s*?',
      '<\/li>',
			'(?P<details>.*?)',
		'<\/ul>\s+',
	'<\/dd>\s+',
	'(',
		'<dd class="block">\s+',
			'<ul>\s+',
				'<li><strong>B.+squeda Im.+genes Relacionadas:<\/strong>\s+',
				'<ul>(?P<tags>.*?)<\/ul>',
	')?/m'
];

$contents = stream_get_contents(STDIN);
$string = str_replace("\r\n", '', html_entity_decode(utf8_encode($contents)));

preg_match(join(REGEX_IMAGE), $string, $matches);

if (!empty($matches['details'])) {
  preg_match_all(REGEX_DETAILS, $matches['details'], $details);
  $details = array_combine($details['keys'], $details['values']);
}

// Aunque en Retrosantander no estoy utilizando la clasificación que hace el
// CDIS de las imágenes, la decodifico aquí por si algún día…
if (!empty($matches['tags'])) {
  preg_match_all(REGEX_TAGS, $matches['tags'], $tags);
  $tags = $tags['tags'];
}

$result = [
	'id' => $matches['id'],
	'file' => $matches['file'],
  'title' => $details['Título'],
  'author' => $details['Fotógrafo'],
  'date' => $details['Fecha'],
  'collection' => $details['Colección/Fondo'],
  'procedure' => $details['Procedimiento'],
  'material' => $details['Soporte'],
];

echo json_encode($result);
