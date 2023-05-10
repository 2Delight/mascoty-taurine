#!/usr/bin/env perl

use Config;

sub macos {
    print "Installing brew...\n";
    `curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh`;
    if ($? != 0) {
        print "Failed to install brew\n";
        exit 1;
    }

    print "Installing torch...\n";
    `brew install pytorch`;
    if ($? != 0) {
        print "Failed to install torch\n";
        exit 1;
    }
}

sub linux {
    print "Updating apt...\n";
    `sudo apt-get update`;
    if ($? != 0) {
        print "Failed to update apt\n";
        exit 1;
    }

    print "Installing basic dependencies...\n";
    `
    sudo apt-get install curl \
                     wget \
                     build-essential
    `;
    if ($? != 0) {
        print "Failed to install basic dependencies\n";
        exit 1;
    }

    print "Installing tauri dependencies...\n";
    `
    sudo apt-get install libwebkit2gtk-4.0-dev \
                     libssl-dev \
                     libgtk-3-dev \
                     libayatana-appindicator3-dev \
                     librsvg2-dev
    `;
    if ($? != 0) {
        print "Failed to install tauri dependencies\n";
        exit 1;
    }

    print "Installing additional dependencies...\n";
    `
    sudo apt-get install libxcb-shape0-dev \
                     libxcb-xfixes0-dev
                     libxcb1-dev \
                     libxkbcommon-dev \
                     libwebkit2gtk-4.0 \
                     libudev-dev \
                     libsdl2-dev \
                     libasound2-dev
    `;
    if ($? != 0) {
        print "Failed to install additional dependencies\n";
        exit 1;
    }

    print "Installing torch...\n";
    $install_command = "wget https://download.pytorch.org/libtorch/cpu/libtorch-cxx11-abi-shared-with-deps-1.13.0%2Bcpu.zip && unzip libtorch-cxx11-abi-shared-with-deps-1.13.0+cpu.zip";
    system($install_command);
    if ($? != 0) {
        print "Failed to install torch\n";
        exit 1;
    }

    print "Adding shared libraries...\n";
    `
    export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$TORCH_DIR/libtorch/lib
    sudo sh -c "echo $TORCH_DIR/libtorch/lib >> /etc/ld.so.conf"
    sudo ldconfig
    sudo ldconfig -p
    `;
    if ($? != 0) {
        print "Failed to add shared libraries\n";
        exit 1;
    }
}

my $os = $Config{osname};
print "OS:", $os, "\n";

if ( $os =~ /linux/ ) {
    print "Detected OS: Linux\n";
    linux();
}
elsif ( $os =~ /darwin/ ) {
    print "Detected OS: MacOS\n";
    macos();
}
else {
    print "Unknown OS\n";
    exit 1;
}

print("Successfully installed Mascoty dependencies!");

exit 0;
