#!/usr/bin/env perl

use Config;
use Term::ANSIColor;

sub output_green {
    print colored(shift, 'green'), "\n";
}

sub output_red {
    print colored(shift, 'red'), "\n";
}

sub macos {
    print "Installing brew...\n";
    `curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh`;
    if ($? != 0) {
        output_red "Failed to install brew";
        return 1;
    }

    print "Installing torch...\n";
    `brew install pytorch`;
    if ($? != 0) {
        output_red "Failed to install torch";
        return 1;
    }

    return 0;
}

sub linux {
    print "Updating apt...\n";
    `sudo apt-get update`;
    if ($? != 0) {
        output_red "Failed to update apt";
        return 1;
    }

    print "Installing basic dependencies...\n";
    `
    sudo apt-get install curl
    sudo apt-get install wget
    sudo apt-get install build-essential
    `;
    if ($? != 0) {
        output_red "Failed to install basic dependencies";
        return 1;
    }

    print "Installing tauri dependencies...\n";
    `
    sudo apt-get install libwebkit2gtk-4.0-dev
    sudo apt-get install libssl-dev
    sudo apt-get install libgtk-3-dev
    sudo apt-get install libayatana-appindicator3-dev
    sudo apt-get install librsvg2-dev
    `;
    if ($? != 0) {
        output_red "Failed to install tauri dependencies";
        return 1;
    }

    print "Installing additional dependencies...\n";
    `
    sudo apt-get install libxcb-shape0-dev
    sudo apt-get install libxcb-xfixes0-dev
    sudo apt-get install libxcb1-dev
    sudo apt-get install libxkbcommon-dev
    sudo apt-get install libwebkit2gtk-4.0
    sudo apt-get install libudev-dev
    sudo apt-get install libsdl2-dev
    sudo apt-get install libasound2-dev
    `;
    if ($? != 0) {
        output_red "Failed to install additional dependencies";
        return 1;
    }

    print "Installing torch...\n";
    $install_command = "wget https://download.pytorch.org/libtorch/cpu/libtorch-cxx11-abi-shared-with-deps-1.13.0%2Bcpu.zip && unzip libtorch-cxx11-abi-shared-with-deps-1.13.0+cpu.zip";
    system($install_command);
    if ($? != 0) {
        output_red "Failed to install torch";
        return 1;
    }

    print "Adding shared libraries...\n";
    `
    export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:${PWD}/libtorch/lib &&\
    sudo sh -c "echo ${PWD}/libtorch/lib >> /etc/ld.so.conf" &&\
    sudo ldconfig &&\
    sudo ldconfig -p
    `;
    if ($? != 0) {
        output_red "Failed to add shared libraries";
        return 1;
    }

    return 0;
}

my $os = $Config{osname};
print "OS:", $os, "\n";

if ( $os =~ /linux/ ) {
    print "Detected OS: Linux\n";
    my $status_code = linux();
    if ($status_code != 0) {
        exit $status_code;
    }
}
elsif ( $os =~ /darwin/ ) {
    print "Detected OS: MacOS\n";
    my $status_code = macos();
    if ($status_code != 0) {
        exit $status_code;
    }
}
else {
    output_red "Error: Unknown OS";
    exit 1;
}

output_green "Successfully installed Mascoty dependencies!";
exit 0;
