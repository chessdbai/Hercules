#!/bin/bash

cd test/Hercules.Api.Tests
dotnet restore

dotnet test \
  /p:CoverletOutputFormat=cobertura \
  /p:CollectCoverage=true \
  /p:CoverletOutput=../../../../test-reports/Hercules.Api/coverage.xml \
  --logger "junit;LogFilePath=../../../../test-reports/Hercules.Api/test-results.xml"

cd ../../
