#!/bin/bash

REGION="eu-west-1"
BUCKET="guregipuzkoa-rekognition"
IMAGE=$1

BASENAME="${IMAGE##*/}"
OBJECT="S3Object={Bucket=$BUCKET,Name=images/$BASENAME}"

LABELS="rekognition/labels/${BASENAME%.*}.json"
FACES="rekognition/faces/${BASENAME%.*}.json"

if [[ ! -f $LABELS ]]; then
    echo "detect-labels $IMAGE -> ${LABELS}…"
    aws rekognition detect-labels --region "$REGION" --image "$OBJECT" > "$LABELS"
fi

if [[ ! -f $FACES ]]; then
    echo "detect-faces $IMAGE -> ${FACES}…"
    aws rekognition detect-faces --region "$REGION" --image "$OBJECT" --attributes "ALL" > "$FACES"
fi
