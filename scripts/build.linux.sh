#!/bin/sh

set -ex

CI=true
api="$(pwd)/api"

# Build the API (using the Rust toolchain + wasm-pack)
cd $api
npm install
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

npm run build

# Note: Oryx skips non-regular (symlinks) files. Give it regular files!
rm -fr dist/func

mkdir -p dist/func
tree -L 4 -I 'node_modules|.git'

find dist/bin/func -name '*.js' -exec cp "{}" dist/func/ \;
find dist/bin/rust -name '*.wasm' -exec cp "{}" dist/func/ \;
