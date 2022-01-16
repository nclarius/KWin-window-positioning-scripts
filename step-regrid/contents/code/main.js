/*
KWin Script Step Re-Grid
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/


///////////////////////
// configuration
///////////////////////

config = {
    stepHor: readConfig("stepHorizontal", 50),
    stepVer: readConfig("stepVertical", 50),
    resizeOthers:    readConfig("resizeOthers",    true),
    resizeMinimized: readConfig("resizeMinimized", false),
    tolerance: readConfig("tolerance", 0)
};


///////////////////////
// initialization
///////////////////////

debugMode = true;
function debug(...args) {if (debugMode) {console.debug("Step Re-grid:", ...args);}}
debug("initializing");
debug("step sizes:", "horizontal:", config.stepHor, "vertical:", config.stepVer);
debug("filters:", "resize others:", config.resizeOthers, "resize minimized:", config.resizeMinimized, "tolerance:", config.tolerance);
console.debug("");


///////////////////////
// register shortcuts
///////////////////////

registerShortcut("Step regrid: shift center"    , "Step Regrid: Shift Center"    , "Alt+K", shiftCenter);
registerShortcut("Step regrid: shift rightwards", "Step Regrid: Shift Rightwards", "Alt+L", shiftRight);
registerShortcut("Step regrid: shift leftwards" , "Step Regrid: Shift Leftwards" , "Alt+J", shiftLeft);
registerShortcut("Step regrid: shift downwards" , "Step Regrid: Shift Downwards" , "Alt+,", shiftDown);
registerShortcut("Step regrid: shift upwards"   , "Step Regrid: Shift Upwards"   , "Alt+I", shiftUp);


///////////////////////
// regrid windows
///////////////////////

function shiftCenter() {
    debug("regrid center");
    active = workspace.activeClient;
    area = workspace.clientArea(KWin.MaximizeArea, active);
    wins = getClients(area);
    wins.forEach(win => win.clientStartUserMovedResized(win));
    for (var i = 0; i < wins.length; i++) {
        win = wins[i];
        // shift windows horizontally center
        if (tiledWidth(win, area)) {
            // tiled width: don't change
        }
        else if (tiledLeft(win, area)) {
            // tiled left: set to half width
            win.geometry.x = area.x;
            win.geometry.width = area.width/2;
        }
        else if (tiledRight(win, area)) {
            // tiled right: set to half width
            win.geometry.x = area.x + area.width/2;
            win.geometry.width = area.width/2;
        }
        else {
            // tiled mid: don't change
        }
        // shift windows vertically center
        if (tiledWidth(win, area)) {
            // tiled width: don't change
        }
        else if (tiledTop(win, area)) {
            // tiled top: set to half height
            win.geometry.y = area.y;
            win.geometry.height = area.height/2;
        }
        else if (tiledBottom(win, area)) {
            // tiled bottom: set to half height
            win.geometry.y = area.y + area.height/2;
            win.geometry.height = area.height/2;
        }
        else {
            // tiled mid: don't change
        }
    }
    wins.forEach(win => win.clientFinishUserMovedResized(win));
}

function shiftRight() {
    debug("regrid rightwards");
    active = workspace.activeClient;
    area = workspace.clientArea(KWin.MaximizeArea, active);
    wins = getClients(area);
    wins.forEach(win => win.clientStartUserMovedResized(win));
    for (var i = 0; i < wins.length; i++) {
        win = wins[i];
        // shift windows right
        if (tiledWidth(win, area)) {
            // tiled width: don't change
        }
        else if (tiledLeft(win, area)) {
            // tiled left: increase to right
            win.geometry.width += config.stepHor;
        }
        else if (tiledRight(win, area)) {
            // tiled right: decrease from left
            win.geometry.width -= config.stepHor;
            win.geometry.x += config.stepHor;
        }
        else {
            // tiled mid: move to right
            win.geometry.x += config.stepHor;
        }
    }
    wins.forEach(win => win.clientFinishUserMovedResized(win));
}

function shiftLeft() {
    debug("regrid leftwards");
    active = workspace.activeClient;
    area = workspace.clientArea(KWin.MaximizeArea, active);
    wins = getClients(area);

    wins.forEach(win => win.clientStartUserMovedResized(win));
    for (var i = 0; i < wins.length; i++) {
        win = wins[i];
        // shift windows left
        if (tiledWidth(win, area)) {
            // tiled width: don't change
        }
        else if (tiledLeft(win, area)) {
            // tiled left: decrease from right
            win.geometry.width -= config.stepHor;
        }
        else if (tiledRight(win, area)) {
            // tiled right: increase to left
            win.geometry.width += config.stepHor;
            win.geometry.x -= config.stepHor;
        }
        else {
            // tiled mid: move to right
            win.geometry.x += config.stepHor;
        }
    }
    wins.forEach(win => win.clientFinishUserMovedResized(win));
}

function shiftDown() {
    debug("regrid downwards");
    active = workspace.activeClient;
    area = workspace.clientArea(KWin.MaximizeArea, active);
    wins = getClients(area);
    wins.forEach(win => win.clientStartUserMovedResized(win));
    for (var i = 0; i < wins.length; i++) {
        win = wins[i];
        // shift windows down
        if (tiledHeight(win, area)) {
            // tiled height: don't change
        }
        else if (tiledTop(win, area)) {
            // tiled top: increase to bottom
            win.geometry.height += config.stepVer;
        }
        else if (tiledBottom(win, area)) {
            // tiled bottom: decrease from top
            win.geometry.height -= config.stepVer;
            win.geometry.y += config.stepVer;
        }
        else {
            // tiled mid: move to bottom
            win.geometry.y += config.stepVer;
        }
    }
    wins.forEach(win => win.clientFinishUserMovedResized(win));
}

function shiftUp() {
    debug("regrid upwards");
    active = workspace.activeClient;
    area = workspace.clientArea(KWin.MaximizeArea, active);
    wins = getClients(area);
    wins.forEach(win => win.clientStartUserMovedResized(win));
    for (var i = 0; i < wins.length; i++) {
        win = wins[i];
        // shift windows up
        if (tiledHeight(win, area)) {
            // tiled height: don't change
        }
        else if (tiledTop(win, area)) {
            // tiled top: decrease from bottom
            win.geometry.height -= config.stepVer;
        }
        else if (tiledBottom(win, area)) {
            // tiled bottom: increase to top
            win.geometry.height += config.stepVer;
            win.geometry.y -= config.stepVer;
        }
        else {
            // tiled mid: move to top
            win.geometry.y -= config.stepVer;
        }
    }
    wins.forEach(win => win.clientFinishUserMovedResized(win));
}

///////////////////////
// filter relevant windows
///////////////////////

function getClients(area) {
    return workspace.clientList().filter(client =>
        (client == workspace.activeClient || config.resizeOthers) &&
        client.normalWindow && client.moveable && client.resizeable &&
        (client.desktop == workspace.currentDesktop || client.allDesktops) &&
        client.screen == workspace.activeClient.screen &&
        (!client.minimized || config.includeMinimized) &&
        !client.fullScreen && !tiledFull(client, area));
}


///////////////////////
// determine tiledness
///////////////////////

function tiledLeft(win, area) {
    return Math.abs(win.x - area.x) <= config.tolerance;
}

function tiledRight(win, area) {
    return Math.abs((win.x + win.width) - (area.x + area.width)) <= config.tolerance;
}

function tiledTop(win, area) {
    return Math.abs(win.y - area.y) <= config.tolerance;
}

function tiledBottom(win, area) {
    return Math.abs((win.y + win.height) - (area.y + area.height)) <= config.tolerance;
}

function tiledWidth(win, area) {
    return tiledLeft(win, area) && tiledRight(win, area);
}

function tiledHeight(win, area) {
    return tiledTop(win, area) && tiledBottom(win, area);
}

function tiledFull(win, area) {
    return tiledWidth(win, area) && tiledHeight(win, area);
}
