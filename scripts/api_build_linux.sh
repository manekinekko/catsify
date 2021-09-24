#!/bin/bash

set -ex

CI=true
# Build the API (using the Rust toolchain + wasm-pack)
cd api/
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

FUNCTIONS_CORE_TOOLS_TELEMETRY_OPTOUT=1
npm install
npm run build