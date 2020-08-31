#!/bin/bash

rm -rf dist || TRUE
mkdir dist

cd src/Hercules.Triggers
dotnet lambda package
cp ./bin/Release/netcoreapp3.1/Hercules.Triggers.zip ../../dist
cd ../../
