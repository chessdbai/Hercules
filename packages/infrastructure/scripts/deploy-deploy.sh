#!/bin/bash
set -euxo pipefail

yarn run build
cdk deploy --profile chessdb-deploy CicdStack --require-approval never