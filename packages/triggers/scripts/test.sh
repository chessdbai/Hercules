#!/bin/bash

cd test/Hercules.Triggers.Tests
dotnet restore

dotnet test \
  /p:CoverletOutputFormat=cobertura \
  /p:CollectCoverage=true \
  /p:CoverletOutput=../../../../test-reports/Hercules.Triggers/coverage.xml \
  --logger "junit;LogFilePath=../../../../test-reports/Hercules.Triggers/test-results.xml"

cd ../../
