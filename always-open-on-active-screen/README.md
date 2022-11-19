# Always Open on Active Screen

Extension for KDE’s window manager to make new windows always open on the monitor that has the mouse cursor.

The windows to be affected can be filtered by application.

![logo](.img/logo_.png)


## Installation

### Dependencies

`kwin` (tested with the current version). 

### Installation via graphical interface

1. Install the script via *System Settings* > *Window Management* > *KWin Scripts* > *Get New Scripts …* > search for *Always Open on Active Screen* > *Install*.
2. Enable the script by activating its checkbox, and apply the settings.

Please make sure to select the most recent version.

A [bug](https://bugs.kde.org/show_bug.cgi?id=453521) in Discover cauases a wrong version to be installed, so using System Settings instead is recommended.

### Installation via command line

```bash
git clone https://github.com/nclarius/KWin-window-positioning-scripts.git
cd KWin-window-positioning-scripts/always-open-on-active-screen
./install.sh
```


## Set-up

In order for the script to work, you need to have *Active screen follows mouse* set to enabled.

### Set-up via graphical interface

*System Settings* > *Window Management* > *Window Behavior* > *Focus* > *Multiscreen Behavor* > *Active screen follows mouse* (the option shows only when multiple monitors are currently connected).  

### Set-up via command line

```bash
kwriteconfig5 --file kwinrc --group Windows --key ActiveMouseScreen true
qdbus org.kde.KWin /KWin reconfigure
```

## Configuration

*System Settings* > *Window Management* > *KWin Scripts* > configuration button in the *Always Open on Active Screen* entry.

You may need to uncheck the checkbox for the script, apply the settings, recheck, and reapply in order for the changes to take effect.

In Plasma versions < 5.24, a bug in the KWin scripting system [[1]](https://bugs.kde.org/show_bug.cgi?id=411430) [[2]](https://bugs.kde.org/show_bug.cgi?id=444378) may cause the configuration not to be found. To fix this, please execute the following commands in a terminal:

```bash
sed -i 's/ConfigModule/Library/g' ~/.local/share/kwin/scripts/alwaysopenonactivescreen/metadata.json
mkdir -p ~/.local/share/kservices5/
ln -sf ~/.local/share/kwin/scripts/alwaysopenonactivescreen/metadata.json ~/.local/share/kservices5/alwaysopenonactivescreen.json
qdbus org.kde.KWin /KWin reconfigure
```

To find the window class name of an application: Right-click on the titlebar of a window of the application > *More Actions* > *Configure Special Application Settings...* > the pre-filled entry in *Window class (application)* (if it consists of two words, only the second part) is the window class to put in the script configuration.


## Troubleshooting and known issues

- On X11: If KDE applications open on the wrong screen, consider disabling applications requesting their own window geometry: *System Settings* > *Window Management* > *Window Behavior* > *Advanced* > *Window placement* > *Allow apps to remember the positions of their own windows, if they support it*.  
- On Wayland: Some XWayland applications may attempt to remember their window position; this can be prevented with a window rule: *System Settings* > *Window Management* > *Window Rules* > *Add New...* > enter the window class of the application and  possibly restrict the window type to normal windows > *Add Property..* > *Ignore requested geometry* > *Force*, *Yes* > *Apply*.  
- It has been suggested that the script might not work for snap applications; if this appears to be the case for you, consider using the native packages instead.  
- Notifications do not follow the placement request. The only thing that can be done about this at the moment is to leave a vote at the [bug report](https://bugs.kde.org/show_bug.cgi?id=452294) for this to be addressed in core Plasma.  
- If some applications still open on the wrong screen despite these workarounds, please report it, even more so if you have an idea what the problem might be or how to fix it.


## Small Print

© 2021-2022 Natalie Clarius \<natalie_clarius@yahoo.de\>

with contributions by [Joe Defenderfer](https://github.com/joedefen) and [Tamim Baschour](https://github.com/tam1m).

This work is licensed under the GNU General Public License v3.0.  
This program comes with absolutely no warranty.  
This is free software, and you are welcome to redistribute and/or modify it under certain conditions.  

If you would like to thank me, you can always make me happy with a review or a cup of coffee:  
<a href="https://store.kde.org/p/1617640"><img src="https://raw.githubusercontent.com/nclarius/Plasma-window-decorations/main/.img/kdestore.png" height="25"/></a>
<a href="https://www.paypal.com/donate/?hosted_button_id=7LUUJD83BWRM4"><img src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif" height="25"/></a>&nbsp;&nbsp;<a href="https://www.buymeacoffee.com/nclarius"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="25"/></a>
