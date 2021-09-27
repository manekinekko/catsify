#!/bin/bash

set -ex

cp -fr dist/bin/func/index.js func/index.js
cp -fr dist/bin/rust/catsify.js func/catsify.js
cp -fr dist/bin/rust/catsify_bg.wasm func/catsify_bg.wasm
npm run clean
rm -fr \
  WORKSPACE \
  *.bazel \
  func/*.bazel \
  rust/ \
  Cargo.* \
  docs \
  dist \
  readme.md \
  LICENSE \
  tsconfig.json

rm -fr func/index.ts
cat <<EOT > func/function.json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "get"
      ],
      "route": "name-suggestion"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ],
  "scriptFile": "./index.js"
}
EOT

# log debug info
printenv
tree -L 5 -I 'node_modules|.git'