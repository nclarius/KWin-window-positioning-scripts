/*
KWin Script Swap Left Right
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

registerShortcut("Swap left and right", "Swap Left and Right", "Meta+Shift+Right", swapLeftRight);

function swapLeftRight() {
    // get geometry
    const active = workspace.activeClient;
    if (active == null) {
        return;
    }
    const win1 = active;

    const area = workspace.clientArea(active, active.screen, active.desktop);
    function near(actual, expected) {
        const tolerance = 0.02 * area.width;
        return actual - expected <= tolerance && actual - expected >= - tolerance;
    }

    const leftHalf = {
        x: area.x,
        y: area.y,
        width: 0.5 * area.width,
        height: area.height
    };
    function isLeftHalf(win) {
        return near(win.x, leftHalf.x)
            && near(win.y, leftHalf.y)
            && near(win.width, leftHalf.width)
            && near(win.height, leftHalf.height);
    }

    const rightHalf = {
        x: area.x + 0.5 * area.width,
        y: area.y,
        width: 0.5 * area.width,
        height: area.height
    };
    function isRightHalf(win) {
        return near(win.x, rightHalf.x)
            && near(win.y, rightHalf.y)
            && near(win.width, rightHalf.width)
            && near(win.height, rightHalf.height);
    }

    console.log(win1.geometry, win1.caption);

    // current window is on left
    if (isLeftHalf(win1)) {
         // find window on right
        for (const win2 of workspace.clientList()) {
            if (win2 != win1 && !win2.minimized && (win2.desktop == win1.desktop || win2.desktop == -1 || win1.desktop == -1) && win2.resizeable) {
                if (isRightHalf(win2)) {
                    // swap left and right
                    win1.geometry = rightHalf;
                    win2.geometry = leftHalf;
                    win2.minimized = false;
                    return;
                }
            }
        }
    }

    // current window is on right
    if (isRightHalf(win1)) {
         // find window on right
        for (const win2 of workspace.clientList()) {
            if (win2 != win1 && !win2.minimized && (win2.desktop == win1.desktop || win2.desktop == -1 || win1.desktop == -1) && win2.resizeable) {
                if (isLeftHalf(win2)) {
                    // swap left and right
                    win1.geometry = leftHalf;
                    win2.geometry = rightHalf;
                    win2.minimized = false;
                    return;
                }
            }
        }
    }
}
