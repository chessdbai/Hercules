#!/bin/bash
set -euxo pipefail

./scripts/clean.sh

rm package-lock.json || true
rm yarn.lock || true