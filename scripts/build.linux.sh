!/bin/sh

set -ex

CI=true
api="$(pwd)/api"

# Build the API (using the Rust toolchain + wasm-pack)
cd $api
npm install
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

npm run build
