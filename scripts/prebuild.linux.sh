#!/bin/sh

set -ex

mkdir __backup
mv -v .bazel* __backup
mv -v BUILD.bazel __backup
mv -v WORKSPACE __backup
mv -v Cargo.lock __backup
mv -v Cargo.toml __backup