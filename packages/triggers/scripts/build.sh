#!/bin/bash

rm -rf dist || TRUE
mkdir dist

cd src/apitriggers
dotnet lambda package
cp ./bin/Release/netcoreapp3.0/apitriggers.zip ../../dist
cd ../../
