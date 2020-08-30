#!/bin/bash

rm -rf dist || TRUE
mkdir dist

cd src/Hercules.Api
dotnet lambda package
cp ./bin/Release/netcoreapp3.1/Hercules.Api.zip ../../dist
cd ../../
