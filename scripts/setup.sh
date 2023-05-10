#!/usr/bin/env bash

os="$OSTYPE"

echo $os

if [[ $os == "linux-gnu"* ]]; then
    echo "Detected OS: Linux"
elif [[ $os == "darwin"* ]]; then
    echo "Detected OS: MacOS"
else
    echo "Error: Unknown OS"
    exit 1
fi

exit 0
