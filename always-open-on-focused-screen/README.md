# Always Open on Focused Screen

Extension for KDE’s window manager to make new windows always open on the monitor that has the focused window.

![logo](.img/logo_.png)


## Installation

### Dependencies

`kwin` (tested with v5.22 - v5.24 on X11).

### Installation via graphical interface

1. Install the script via *System Settings* > *Window Management* > *KWin Scripts* > *Get New Scripts …* > search for *Always Open on Focused Screen* > *Install*.
2. Enable the script by activating its checkbox, and apply the settings.

### Installation via command line

```bash
git clone https://github.com/nclarius/KWin-window-positioning-scripts.git
cd KWin-window-positioning-scripts/always-open-on-focused-screen
./install.sh
```


## Troubleshooting and known issues

- If some applications still open on the wrong screen, consider disabling applications requesting their own window geometry (this features only exists on X11): *System Settings* > *Window Management* > *Window Behavior* > *Advanced* > *Window placement* > *Allow apps to remember the positions of their own windows, if they support it*.  
- Some XWayland applications may attempt to remember their window position; this can be prevented with a window rule, as suggested [here](https://github.com/nclarius/KWin-window-positioning-scripts/issues/11#issuecomment-1091979196): *System Settings* > *Window Management* > *Window Rules* > *Add New...* > enter the window class of the application and  possibly restrict the window type to normal windows > *Add Property..* > *Ignore requested geometry* > *Force*, *Yes* > *Apply*.  
- - It has been suggested that the script might not work for snap applications; if this appears to be the case for you, consider using native packages instead.  
- Notifications do not follow the placement request. The only thing that can be done about this at the moment is to leave a vote at the [bug report](https://bugs.kde.org/show_bug.cgi?id=452294) for this to be addressed in core Plasma.  
- Some applications (e.g. Spotify) may still open on the wrong screen despite these workarounds. I have not yet figured out how to fix this. If you do, please let me know!


## Small Print

© 2021 Natalie Clarius \<natalie_clarius@yahoo.de\>

with contributions by [Joe Defenderfer](https://github.com/joedefen).

This work is licensed under the GNU General Public License v3.0.  
This program comes with absolutely no warranty.  
This is free software, and you are welcome to redistribute and/or modify it under certain conditions.  

If you would like to thank me, you can always make me happy with a review or a cup of coffee:  
<a href="https://store.kde.org/p/1618008"><img src="https://raw.githubusercontent.com/nclarius/Plasma-window-decorations/main/.img/kdestore.png" height="25"/></a>
<a href="https://www.paypal.com/donate/?hosted_button_id=7LUUJD83BWRM4"><img src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif" height="25"/></a>&nbsp;&nbsp;<a href="https://www.buymeacoffee.com/nclarius"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="25"/></a>
