#!/bin/bash
set -euxo pipefail

yarn run build
cdk deploy --profile chessdb-deploy HerculesCicd --require-approval never