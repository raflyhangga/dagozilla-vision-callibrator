#!/bin/bash

# Check if IP argument is provided
if [ -z "$1" ]; then
  echo "Usage: ./run.sh [ip argument]"
  exit 1
fi

# Set IP as environment variable
export  VUE_APP_ROBOT=$1

# Run Nuxt 3 application
npm install
npm run dev
