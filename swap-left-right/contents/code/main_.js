/*
KWin Script Swap Left and Right
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

// register keyboard shortcut
registerShortcut("Swap left and right", "Swap Left and Right", "Meta+Shift+Right", swapLeftRight);

// swap left and right halves for the active window
function swapLeftRight() {
    console.debug("swap left and right");

    // get active window
    var active = workspace.activeClient;
    if (active == null) return;
    var win1 = active;

    // get area geometry
    var area = workspace.clientArea(active, active.screen, active.desktop);
    var leftHalf = {
        x: area.x,
        y: area.y,
        width: area.width/2,
        height: area.height
    };
    var rightHalf = {
        x: area.x + area.width/2,
        y: area.y,
        width: area.width/2,
        height: area.height
    };

    // try swapping the halves
    if (swapHalves(leftHalf, rightHalf)) return;
    if (swapHalves(rightHalf, leftHalf)) return;

    function swapHalves(half1, half2) {
        // check if active window is on one half
        if (near(win1.geometry, half1)) {
            // find window on other half
            var clients = workspace.clientList().reverse();
            for (var i = 0; i < clients.length; i++) {
                win2 = clients[i];
                // other window is on other half
                if (relevant(win1, win2) && near(win2.geometry, half2)) {
                    // swap halves and unminimize
                    win1.geometry = half2;
                    win2.geometry = half1;
                    win1.minimized = false;
                    win2.minimized = false;
                    return true;
                }
            }
        }
    }

    // helper functions

    // window is considered near an area iff the difference on all coordinates is within tolerance
    function near(actual, expected) {
        return Object.keys(expected).every(coord =>
            Math.abs(actual[coord] - expected[coord]) <= 0.02 * area.width);
    }

    // window is relevant iff it is not identical, unminimized, on the same desktop and screen, and resizable
    function relevant(win1, win2) {
        return win2 != win1
            && !win2.minimized
            && (win2.desktop == win1.desktop || win2.onAllDesktops || win1.onAllDesktops)
            && win2.screen == win1.screen
            && win2.resizeable;
    }
}
