#!/bin/bash

set -euxo pipefail

rm -rf node_modules || TRUE
rm -rf dist || TRUE
rm package-lock.json || TRUE