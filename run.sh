#!/bin/sh

# get first argument
if [ -z "$1" ]; then
    echo "No IP argument supplied"
    exit 1
fi

export NUXT_APP_URL_PARAM="http://$1:5820" && npm run dev
