![Mascoty Logo](https://github.com/2Delight/mascoty-taurine/blob/master/src/assets/mascoty_inline_logo.png?raw=true)

## Statuses

[windows-build]: https://github.com/2Delight/mascoty-taurine/actions/workflows/windows-build.yaml/badge.svg
[windows-test]: https://github.com/2Delight/mascoty-taurine/actions/workflows/windows-test.yaml/badge.svg
[windows-release]: https://github.com/2Delight/mascoty-taurine/actions/workflows/windows-release.yaml/badge.svg

[macos-build]: https://github.com/2Delight/mascoty-taurine/actions/workflows/macos-build.yaml/badge.svg
[macos-test]: https://github.com/2Delight/mascoty-taurine/actions/workflows/macos-test.yaml/badge.svg
[macos-release]: https://github.com/2Delight/mascoty-taurine/actions/workflows/macos-release.yaml/badge.svg

[linux-build]: https://github.com/2Delight/mascoty-taurine/actions/workflows/linux-build.yaml/badge.svg
[linux-test]: https://github.com/2Delight/mascoty-taurine/actions/workflows/linux-test.yaml/badge.svg
[linux-release]: https://github.com/2Delight/mascoty-taurine/actions/workflows/linux-release.yaml/badge.svg

|OS       |Build (Pre-Release)        |Test                      |Release                      |
|---------|---------------------------|--------------------------|-----------------------------|
|Windows  |![Windows][windows-build]  |![Windows][windows-test]  |![Windows][windows-release]  |
|MacOS    |![MacOS][macos-build]      |![MacOS][macos-test]      |![MacOS][macos-release]      |
|Linux    |![Linux][linux-build]      |![Linux][linux-test]      |![Linux][linux-release]      |

## Installation

### Windows

1. Download [LibTorch](https://download.pytorch.org/libtorch/cpu/libtorch-win-shared-with-deps-1.13.1%2Bcpu.zip)

2. Unzip it somewhere you like. From now on we'll refer to this place as `%TORCH_DIR%`

3. Add it to `%PATH%`. You can use GUI or insert next command into CMD:

`setx PATH "%PATH%;%TORCH_DIR%\libtorch\lib"`

Add `/M` flag to set it for all users (requires super user access)

4. Download Windows release MSI installer (coming soon)

### MacOS
1. Install homebrew:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install LibTorch:

```sh
brew install pytorch
```

3. Download MacOS release DMG installer (coming soon)

### Linux

1. Install all dependencies:

```sh
sudo apt-get update

# Basic
sudo apt-get install curl \
                     wget \
                     build-essential

# Tauri
sudo apt-get install libwebkit2gtk-4.0-dev \
                     libssl-dev \
                     libgtk-3-dev \
                     libayatana-appindicator3-dev \
                     librsvg2-dev

# Additional
sudo apt-get install libxcb-shape0-dev \
                     libxcb-xfixes0-dev
                     libxcb1-dev \
                     libxkbcommon-dev \
                     libwebkit2gtk-4.0 \
                     libudev-dev \
                     libsdl2-dev \
                     libasound2-dev
```

2. Install LibTorch

```sh
wget https://download.pytorch.org/libtorch/cpu/libtorch-cxx11-abi-shared-with-deps-1.13.0%2Bcpu.zip
unzip libtorch-cxx11-abi-shared-with-deps-1.13.0+cpu.zip
```

3. Add shared libraries (we'll refer the place where you have unzipped Torch as `$TORCH_DIR`)

```sh
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$TORCH_DIR/libtorch/lib
sudo sh -c "echo $PWD/libtorch/lib >> /etc/ld.so.conf"
sudo ldconfig
sudo ldconfig -p
```

4. Download Linux release Deb installer (coming soon)
