# Always Open on Active Screen

Extension for KDE’s window manager to make new windows always open on the monitor that has the mouse cursor.

![logo](.img/logo_.png)




## Installation

### Dependencies

`kwin` (tested with v5.22 - v5.24 on X11).

### Installation via graphical interface

*System Settings* > *Window Management* > *KWin Scripts* > *Get New Scripts …* > search for *Always Open on Active Screen* > *Install*.

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


## Troubleshooting

If some applications still open on the wrong screen, consider disabling *System Settings* > *Window Management* > *Window Behavior* > *Advanced* > *Window placement* > *Allow apps to remember the positions of their own windows, if they support it*.



## Small Print

© 2021 Natalie Clarius \<natalie_clarius@yahoo.de\>

with contributions by [Joe Defenderfer](https://github.com/joedefen).

This work is licensed under the GNU General Public License v3.0.  
This program comes with absolutely no warranty.  
This is free software, and you are welcome to redistribute and/or modify it under certain conditions.  

If you would like to thank me, you can always make me happy with a review or a cup of coffee:  
<a href="https://store.kde.org/p/1617640"><img src="https://raw.githubusercontent.com/nclarius/Plasma-window-decorations/main/.img/kdestore.png" height="25"/></a>
<a href="https://www.paypal.com/donate/?hosted_button_id=7LUUJD83BWRM4"><img src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif" height="25"/></a>&nbsp;&nbsp;<a href="https://www.buymeacoffee.com/nclarius"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="25"/></a>
