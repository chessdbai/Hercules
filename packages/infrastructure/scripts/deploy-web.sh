#!/bin/bash
set -euxo pipefail

npm run build
cdk deploy --profile chessdb-prod WebsiteStack-prod --require-approval never
