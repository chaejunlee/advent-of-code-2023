#!/bin/bash

day=$1

command="cd day${day} && npx ts-node index.ts && cd .."
eval $command
