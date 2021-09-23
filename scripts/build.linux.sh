!/bin/sh

set -ex

CI=true
api="$(pwd)/api"

# Build the API (using the Rust toolchain + wasm-pack)
cd $api
npm install
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

npm run build

# Note: Oryx skips non-regular (symlinks) files. Give it regular files!
rm -fr dist/func dist/rust

mkdir -p dist/func
find bazel-dist/bin/func -name '*.js' -exec cp "{}" dist/func/ \;

mkdir -p dist/rust
find bazel-dist/bin/rust -name '*.wasm' -exec cp "{}" dist/rust/ \;