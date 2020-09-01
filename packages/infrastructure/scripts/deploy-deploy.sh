#!/bin/bash
set -euxo pipefail

cdk bootstrap aws://541249553451/us-east-2 --profile chessdb-prod
cdk bootstrap aws://996734812344/us-east-2 --profile chessdb-beta
cdk bootstrap aws://667342691845/us-east-2 --profile chessdb-deploy

yarn run build
cdk deploy --profile chessdb-deploy HerculesCicd --require-approval never