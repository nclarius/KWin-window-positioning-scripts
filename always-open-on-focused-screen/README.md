# Always Open on Focused Screen

Extension for KDE’s window manager to make new windows always open on the monitor that has the focused window.

![icon](img/icon_small.png)

[view in KDE Store](https://store.kde.org/p/1618008)



## Installation

### Dependencies

`kwin` (tested with v5.22 - v5.23 on X11).

### Method 1: via graphical interface

1. Install the script via *System Settings* > *Window Management* > *KWin Scripts* > *Get New Scripts …* > search for *Always Open on Focused Screen* > *Install*.
2. Activate the script by selecting the checkbox in the respective entry.

### Method 2: via command line

```bash
git clone https://github.com/nclarius/KWin-window-positioning-scripts.git
plasmapkg2 --type kwinscript -i KWin-window-positioning-scripts/always-open-on-focused-screen
kwriteconfig5 --file kwinrc --group Plugins --key alwaysopenonfocusedscreenEnabled true
qdbus org.kde.KWin /KWin reconfigure
```



## Small Print

© 2021 Natalie Clarius \<natalie_clarius@yahoo.de\>

This work is licensed under the GNU General Public License v3.0.  
This program comes with absolutely no warranty.  
This is free software, and you are welcome to redistribute and/or modify it under certain conditions.  

If you would like to thank me, you can always make me happy with [a review](https://store.kde.org/p/1618008) or [a cup of tea](https://www.buymeacoffee.com/nclarius).

