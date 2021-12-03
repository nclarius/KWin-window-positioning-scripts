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

    // get area geometry
    var active = workspace.activeClient;
    if (active == undefined) return;
    var area = workspace.clientArea(KWin.MaximizeArea, active);
    var grid = {
        left: area.x,
        midH: area.x + area.width/2,
        halfWidth: area.width/2
    };

    // get halves to swap
    // left windows
    var left = workspace.clientList().filter(win =>
        relevant(win, active) &&
        near(win.x, grid.left) && near(win.width, grid.halfWidth));
    // right windows
    var right = workspace.clientList().filter(win =>
        relevant(win, active) &&
        near(win.x, grid.midH) && near(win.width, grid.halfWidth));

    // swap halves
    // move left windows to right
    for (var i = 0; i < left.length; i++) {
        win = left[i];
        win.geometry.x = grid.midH;
        win.minimized = false;
    }
    // move right windows to left
    for (var i = 0; i < right.length; i++) {
        win = right[i];
        win.geometry.x = grid.left;
        win.minimized = false;
    }


    // helper functions

    // window is considered near an area iff the difference of the coordinates is within tolerance
    function near(actual, expected) {
        return Math.abs(actual - expected) <= 0.02 * area.width;
    }

    // window is relevant iff it is not identical, unminimized, on the same desktop and screen, and resizable
    function relevant(win, active) {
        return !win.minimized
            && (win.desktop == active.desktop || win.onAllDesktops)
            && win.screen == active.screen
            && win.resizeable;
    }
}
