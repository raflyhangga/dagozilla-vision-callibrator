#!/bin/bash

# Check if IP argument is provided
if [ -z "$1" ]; then
  echo "Usage: ./run.sh [ip argument]"
  exit 1
fi

# Set IP as environment variable
export URL_PARAM="http://$1"
export PARAM_PORT="5820"
export STREAMER_PORT="5812" 


# Run Nuxt 3 application
npm install
npm run build
npm run preview