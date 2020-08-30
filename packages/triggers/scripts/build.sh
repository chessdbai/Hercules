#!/bin/bash

set -Eeuo pipefail

STARTDIR=$(pwd)

trap "cd $STARTDIR" ERR

dobuild()
{
  rm -rf dist || TRUE
  mkdir dist

  cd src/Hercules.Triggers
  dotnet lambda package
  cp ./bin/Release/netcoreapp3.1/Hercules.Triggers.zip ../../dist
  cd ../../
}

dobuild