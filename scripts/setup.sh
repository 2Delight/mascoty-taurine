#!/usr/bin/env bash

function macos {
    echo "Installing brew..."
    if ! curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh; then
        echo "Failed to install brew\n"
        exit 1
    fi

    echo "Installing torch..."
    if ! brew install pytorch; then
        echo "Failed to install torch"
        exit 1
    fi
}

function linux {
    echo "Updating apt..."
    if ! sudo apt-get update; then
        echo "Failed to update apt"
        exit 1;
    fi

    echo "Installing basic dependencies..."
    if !     sudo apt-get install curl \
                     wget \
                     build-essential; then
        echo "Failed to install basic dependencies"
        exit 1;
    fi

    echo "Installing tauri dependencies..."
    if !     sudo apt-get install libwebkit2gtk-4.0-dev \
                     libssl-dev \
                     libgtk-3-dev \
                     libayatana-appindicator3-dev \
                     librsvg2-dev; then
        echo "Failed to install tauri dependencies"
        exit 1
    fi

    echo "Installing additional dependencies..."
    if !     sudo apt-get install libxcb-shape0-dev \
                     libxcb-xfixes0-dev
                     libxcb1-dev \
                     libxkbcommon-dev \
                     libwebkit2gtk-4.0 \
                     libudev-dev \
                     libsdl2-dev \
                     libasound2-dev; then
        echo "Failed to install additional dependencies"
        exit 1
    fi

    echo "Installing torch..."
    if ! wget https://download.pytorch.org/libtorch/cpu/libtorch-cxx11-abi-shared-with-deps-1.13.0%2Bcpu.zip &&#
            unzip libtorch-cxx11-abi-shared-with-deps-1.13.0+cpu.zip; then
        echo "Failed to install torch"
        exit 1
    fi

    echo "Adding shared libraries..."
    if ! export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$TORCH_DIR/libtorch/lib &&#
            sudo sh -c "echo $TORCH_DIR/libtorch/lib >> /etc/ld.so.conf" &&#
            sudo ldconfig &&#
            sudo ldconfig -p; then
        echo "Failed to add shared libraries"
        exit 1
    fi
}

os="$OSTYPE"

echo $os

if [[ $os == "linux-gnu"* ]]; then
    echo "Detected OS: Linux"
    linux
elif [[ $os == "darwin"* ]]; then
    echo "Detected OS: MacOS"
    macos
else
    echo "Error: Unknown OS"
    exit 1
fi

exit 0
