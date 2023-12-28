#!/bin/bash

while read -r id; do
    jq --compact-output --null-input --slurpfile metadata "metadata/${id}.json" \
      "[ $id, \
        \$metadata[0].summary.title, \
        \$metadata[0].summary.caption, \
        \$metadata[0].details.image_data.photographer, \
        \$metadata[0].details.image_data.municipio, \
        \$metadata[0].details.image_data.author, \
        [(\$metadata[0].labels.Labels[] | select (.Confidence >= 75)) | .Name] \
      ]" \
        | sed 's/&amp;/&/g' \
        | sed 's/&lt;/</g' \
        | sed 's/&gt;/>/g' \
        | sed "s/&#39;/'/g" \
        | sed 's/&quot;/\\"/g' \
        | sed "s/&apos;/'/g"
done
