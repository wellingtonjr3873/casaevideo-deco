#!/bin/bash

# Get a list of changed files
changed_files=$(git diff --name-only --cached)

# Run deno lint only for changed files
for file in $changed_files
do
  if [ -f "$file" ] && [[ "$file" == *.ts ]]; then
    deno fmt $file
    echo "Linting $file..."
    deno lint --unstable "$file"
  fi
done
