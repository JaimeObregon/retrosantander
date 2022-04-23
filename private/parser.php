<?php

const REGEX_DETAILS = '/<li><strong>(?P<keys>.+?):<\/strong>[ "\[]*(?P<values>.+?)[ "\]]*<\/li>/';
const REGEX_TAGS = '/<a href="\/portalcdis\/Prepare.+List.do;jsessionid=.{32}\?idcateg=\d+">(?P<tags>.*?)<\/a>/';
const REGEX_IMAGE = [
	'/<dd>\s+',
		'<a href=".+" class="thickbox">',
			'<img src="\/portalcdis\/image\/DownloadFile\.do\?id=(?P<id>\d+)&ima=\d" width=".*" height=".*" alt=".*" title=".*" \/>',
		'<\/a>\s*',
		'<ul>\s*',
			'<li class="acciones">\s*<a .+?\/a>\s*?<\/li>',
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

if (!empty($matches['tags'])) {
    preg_match_all(REGEX_TAGS, $matches['tags'], $tags);
    $tags = $tags['tags'];
}

$result = [
	'id' => trim($matches['id']),
	'details' => $details ?? [],
	'tags' => $tags ?? [],
];

echo json_encode($result);
