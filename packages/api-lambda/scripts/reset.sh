#!/bin/bash

set -euxo pipefail

./scripts/clean.sh

rm -rf ./node_modules || true
rm ./yarn.lock || true
rm ./package-lock.json || true