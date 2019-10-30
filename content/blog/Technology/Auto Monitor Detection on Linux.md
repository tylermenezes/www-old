---
date: 2015-12-01
category: Technology
slug: auto-monitor-detection-on-linux
title: Auto Monitor Detection on Linux
---

When you get excited about replicating features which mainstream operating systems have had for years, it's a good sign you're the perfect target Linux user. Today's adventure: automatic monitor configuration.

Our goal is getting Linux to automatically mirror the desktop when an external monitor is connected, and stop mirroring when it's disconnected. We'll also include support for custom profiles for specific monitors, e.g. "extend to the left when my desk monitor is connected."

(A quick side note: I'm using Arch Linux, but this should work on most distributions. I've heard rumors, however, that some cards won't generate a udev event when a monitor is connected, so your milage may vary.)

## udev

To get started on our task, we're going to need to write a config file for `udev` -- a device manager for the Linux kernel. Specifically, we'll need to add a handler which, when udev detects a change in the connected devices, checks for connected displays and runs the necessary commands to use them.

Luckily, this is actually super easy: we just create a `.rules` file in `/etc/udev/rules.d` (so, let's call it `/etc/udev/rules.d/95-monitors.rules`) with the following content:

    ACTION=="change", RUN+="/home/tylermenezes/Cloud/System/usr/bin/disp-auto"

`RUN` should point to wherever you want to store the monitor connection script we're about to create. (I keep my scripts in a Dropbox-like folder, hence the long path.)

Once that's saved, tell udev to reload its rules with:

    sudo udevadm control --reload-rules

## xrandr

Most long-time Linux users will be familiar with `xrandr`: the "X [windowing server] Resize and Rotate" utility -- a deeply technical name for the utility which allows configuration of external displays. In order to have external monitors automatically connect and disconnect, we'll simply need to run some xrandr commands whenever the display connects.

Edit the file at the location you assigned in `95-monitors.rules` (so, in my case, `/home/tylermenezes/Cloud/System/usr/bin/disp-auto`)

    #!/usr/bin/bash

    # udev will wait for our script to finish before the monitor is available
    # for use, so we will use the `at` command to run our command again as
    # another user:
    if [ "$1" != "forked" ]; then
        echo "$(dirname $0)/$(basename $0) forked" | at now
        exit
    fi

    # udev runs as root, so we need to tell it how to connect to the X server:
    export DISPLAY=:0
    export XAUTHORITY=/home/tylermenezes/.Xauthority

    # Find out the device path to our graphics card:
    cardPath=/sys/$(udevadm info -q path -n /dev/dri/card0)

    # Detect if the monitor is connected and, if so, the monitor's ID:
    conHdmi=$(xrandr | sed -n '/HDMI1 connected/p')
    shaHdmi=$(sha1sum $cardPath/card0-HDMI-A-1/edid | cut -f1 -d " ")

    # The useful part: check what the connection status is, and run some other commands
    if [ -n "$conHdmi" ]; then
        if [ "$shaHdmi" = "xxxxxxxxxxxxxxxx" ]; then    # Office PC
            xrandr --output eDP1 --auto --output HDMI1 --auto --right-of eDP1
        else                                            # Probably a projector
            xrandr --output eDP1 --auto --output HDMI1 --auto --same-as eDP1
        fi
    else
        xrandr --output eDP1 --auto --output HDMI1 --off
    fi

If you're running this on something other than a Macbook Air, you'll probably need to update HDMI1 in the `Detect if the monitor...` section, and change all the xrandr commands at the bottom.

At this point, you should pretty much have it working! If you'd like to create separate profiles for different monitors, you can add them in the format above. To get the monitor's ID (the `xxxxxx` in the example above), run this command with the monitor connected:

    sha1sum /sys/$(udevadm info -q path -n /dev/dri/card0)/card0-HDMI-A-1/edid

Also, one final note: this file is executed as root! Be sure to `chmod` it to `0700` if you want to avoid introducing huge security holes into your system.
