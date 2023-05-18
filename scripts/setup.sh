#!/usr/bin/env bash

set -e
set -o nounset

readonly NC='\033[0m'

function output_green {
    local -r green='\033[0;32m'
    echo -e "${green}${1}${NC}"
}

function output_red {
    local -r red='\033[0;31m'
    echo -e "${red}${1}${NC}"
}

function macos {
    echo "Installing brew..."
    if ! curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh; then
        output_red "Failed to install brew"
        return 1
    fi

    echo "Installing torch..."
    if ! brew install pytorch; then
        output_red "Failed to install torch"
        return 1
    fi

    return 0
}

function linux {
    echo "Updating apt..."
    if ! sudo apt-get update; then
        output_red "Failed to update apt"
        return 1
    fi

    echo "Installing basic dependencies..."
    if ! sudo apt-get install curl \
        wget \
        build-essential; then
        output_red "Failed to install basic dependencies"
        return 1
    fi

    echo "Installing tauri dependencies..."
    if ! sudo apt-get install libwebkit2gtk-4.0-dev \
        libssl-dev \
        libgtk-3-dev \
        libayatana-appindicator3-dev \
        librsvg2-dev; then
        output_red "Failed to install tauri dependencies"
        return 1
    fi

    echo "Installing additional dependencies..."
    if
        ! sudo apt-get install libxcb-shape0-dev \
            libxcb-xfixes0-dev \
            libxcb1-dev \
            libxkbcommon-dev \
            libwebkit2gtk-4.0 \
            libudev-dev \
            libsdl2-dev \
            libasound2-dev
    then
        output_red "Failed to install additional dependencies"
        return 1
    fi

    echo "Installing torch..."
    if ! wget https://download.pytorch.org/libtorch/cpu/libtorch-cxx11-abi-shared-with-deps-1.13.0%2Bcpu.zip && #
        unzip libtorch-cxx11-abi-shared-with-deps-1.13.0+cpu.zip; then
        output_red "Failed to install torch"
        return 1
    fi

    echo "Adding shared libraries..."
    if ! export LD_LIBRARY_PATH="${LD_LIBRARY_PATH:+$LD_LIBRARY_PATH:}${PWD}/libtorch/lib" && #
        sudo sh -c "echo ${PWD}/libtorch/lib >> /etc/ld.so.conf" &&     #
        sudo ldconfig &&                                                    #
        sudo ldconfig -p; then
        output_red "Failed to add shared libraries"
        return 1
    fi

    return 0
}

readonly OS="$OSTYPE"
echo "$OS"

if [[ "$OS" =~ "linux-gnu" ]]; then
    echo "Detected OS: Linux"
    linux
elif [[ "$OS" =~ "darwin" ]]; then
    echo "Detected OS: MacOS"
    macos
else
    output_red "Error: Unknown OS"
    exit 1
fi

output_green "Successfully installed Mascoty dependencies!"
exit 0
