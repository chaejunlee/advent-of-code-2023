#!/bin/bash

day=$1

command="npx ts-node day${day}/index.ts"
eval $command
