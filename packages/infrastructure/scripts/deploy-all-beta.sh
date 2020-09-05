#!/bin/bash
set -euxo pipefail

npm run build
cdk deploy --profile chessdb-beta CoreStack-beta --require-approval never
cdk deploy --profile chessdb-beta AuthStack-beta --require-approval never
cdk deploy --profile chessdb-beta WebsiteStack-beta --require-approval never
cdk deploy --profile chessdb-beta ApiStack-beta --require-approval never