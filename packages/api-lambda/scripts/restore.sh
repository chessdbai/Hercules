#!/bin/bash

set -euxo pipefail

cd src/Hercules.Api
dotnet restore
cd ../../
