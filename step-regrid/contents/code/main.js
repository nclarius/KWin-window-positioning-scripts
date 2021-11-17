/*
KWin Script Step Re-Grid
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/


///////////////////////
// configuration
///////////////////////

config = {
    stepHor: readConfig("stepHor", 50),
    stepVer: readConfig("stepVer", 50),
    resizeOthers:    readConfig("resizeOthers",    true),
    resizeMinimized: readConfig("resizeMinimized", false),
    tolerance: readConfig("tolerance", 0)
};


///////////////////////
// initialization
///////////////////////

debugMode = true;
function debug(...args) {if (debugMode) {console.debug(...args);}}
debug("initializing step re-grid");
debug("step re-grid step sizes:", "horizontal:", config.stepHor, "step vertical:", config.stepVer);
debug("step re-grid filters:", "resize others:", config.resizeOthers, "resize minimized:", config.resizeMinimized, "tolerance:", config.tolerance);


///////////////////////
// register shortcuts
///////////////////////

registerShortcut("Step regrid: shift rightwards", "Step Regrid: Shift Rightwards", "Alt+L", shiftRight);
registerShortcut("Step regrid: shift leftwards" , "Step Regrid: Shift Leftwards" , "Alt+J", shiftLeft);
registerShortcut("Step regrid: shift downwards" , "Step Regrid: Shift Downwards" , "Alt+,", shiftDown);
registerShortcut("Step regrid: shift upwards"   , "Step Regrid: Shift Upwards"   , "Alt+I", shiftUp);


///////////////////////
// regrid windows
///////////////////////


function shiftRight() {
    debug("regrid rightwards");
    active = workspace.activeClient;
    area = workspace.clientArea(active, active.screen, active.desktop);
    wins = config.resizeOthers ? getClients(area) : [active];
    for (var i = 0; i < wins.length; i++) {
        win = wins[i];
        if (!tiledWidth(win, area)) {
            win.clientStartUserMovedResized(win);
            if (tiledLeft(win, area)) {
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
            win.clientFinishUserMovedResized(win);
        }
    }
}

function shiftLeft() {
    debug("regrid leftwards");
    active = workspace.activeClient;
    area = workspace.clientArea(active, active.screen, active.desktop);
    wins = config.resizeOthers ? getClients(area) : [active];
    for (var i = 0; i < wins.length; i++) {
        win = wins[i];
        if (!tiledWidth(win, area)) {
            win.clientStartUserMovedResized(win);
            if (tiledLeft(win, area)) {
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
            win.clientFinishUserMovedResized(win);
        }
    }
}

function shiftDown() {
    debug("regrid downwards");
    active = workspace.activeClient;
    area = workspace.clientArea(active, active.screen, active.desktop);
    wins = config.resizeOthers ? getClients(area) : [active];
    for (var i = 0; i < wins.length; i++) {
        win = wins[i];
        if (!tiledHeight(win, area)) {
            win.clientStartUserMovedResized(win);
            if (tiledTop(win, area)) {
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
            win.clientFinishUserMovedResized(win);
        }
    }
}

function shiftUp() {
    debug("regrid upwards");
    active = workspace.activeClient;
    area = workspace.clientArea(active, active.screen, active.desktop);
    wins = config.resizeOthers ? getClients(area) : [active];
    for (var i = 0; i < wins.length; i++) {
        win = wins[i];
        if (!tiledHeight(win, area)) {
            win.clientStartUserMovedResized(win);
            if (tiledTop(win, area)) {
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
            win.clientFinishUserMovedResized(win);
        }
    }
}

///////////////////////
// filter relevant windows
///////////////////////

function getClients(area) {
    return workspace.clientList().filter(client =>
        (client == workspace.activeClient || config.resizeOthers) &&
        client.normalWindow && client.resizeable &&
        (client.desktop == workspace.currentDesktop || client.allDesktops) &&
        client.screen == workspace.activeClient.screen &&
        (!client.minimized || config.includeMinimized) &&
        !client.fullScreen && !tiledFull(client, area));
}


///////////////////////
// determine tiledness
///////////////////////

function tiledWidth(win, area) {
    return Math.abs(win.width - area.width) <= 2 * config.tolerance;
}

function tiledHeight(win, area) {
    return Math.abs(win.height - area.height) <= 2 * config.tolerance;
}

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

function tiledFull(win, area) {
    return Object.keys(area).every(coord =>
        Math.abs(win[coord] - area[coord]) <= config.tolerance);
}