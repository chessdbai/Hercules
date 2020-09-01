#!/bin/bash
set -euxo pipefail

rm ./lib/**/*.js || true
rm ./lib/**/*.d.ts || true
rm -rf ./cdk.out || true
rm -rf ./build || true