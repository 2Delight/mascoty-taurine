#!/usr/bin/env perl

use Config;

my $os = $Config{osname};

print $os, "\n";

if ( $os =~ /linux/ ) {
    print "Detected OS: Linux\n";
}
elsif ( $os =~ /darwin/ ) {
    print "Detected OS: MacOS\n";
}
else {
    print "Unknown OS\n";
    exit 1;
}

exit 0;
