/*
KWin Script Step Resize
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/


///////////////////////
// configuration
///////////////////////

config = {
    stepHor: readConfig("stepHor", 50),
    stepVer: readConfig("stepVer", 50),
    tolerance: readConfig("tolerance", 0)
};


///////////////////////
// initialization
///////////////////////

debugMode = true;
function debug(...args) {if (debugMode) {console.debug(...args);}}
debug("initializing step resize");
debug("step resize settings:", "step horizontal:", config.stepHor, "step vertical:", config.stepVer, "tolerance:", config.tolerance);


///////////////////////
// register shortcuts
///////////////////////

registerShortcut("Step resize: grow size"    , "Step Resize: Grow Size"    , "Alt+O", incrAr);
registerShortcut("Step resize: shrink size"  , "Step Resize: Shrink Size"  , "Alt+M", decrAr);
registerShortcut("Step resize: grow width"   , "Step Resize: Grow Width"   , "Alt+L", incrHor);
registerShortcut("Step resize: shrink width" , "Step Resize: Shrink Width" , "Alt+J", decrHor);
registerShortcut("Step resize: grow height"  , "Step Resize: Grow Height"  , "Alt+I", incrVer);
registerShortcut("Step resize: shrink height", "Step Resize: Shrink Height", "Alt+,", decrVer);


///////////////////////
// resize window
///////////////////////

function incrAr() {
    // grow horizontally and vertically
    incrHor();
    incrVer();
}

function decrAr() {
    // shrink horizontally and vertically
    decrHor();
    decrVer();
}

function incrHor() {
    win = workspace.activeClient;
    area = workspace.clientArea(win, win.screen, win.desktop);
    debug("increase width", win.caption, win.geometry);

    win.clientStartUserMovedResized(win);
    if (tiledWidth(win, area)) {
        // full width: do nothing
    }
    else if (tiledLeft(win, area)) {
        // tiled left: increase to right and leave in place
        debug("tiled left");
        win.geometry.width += config.stepHor;
    }
    else if (tiledRight(win, area)) {
        // tiled right: increase to right and move to left
        debug("tiled right");
        win.geometry.width += config.stepHor;
        win.geometry.x -= config.stepHor;
    }
    else {
        // not tiled: increase to right and move half to left
        debug("tiled non-horizontal");
        win.geometry.width += config.stepHor;
        win.geometry.x -= config.stepHor/2;
    }
    win.clientFinishUserMovedResized(win);
}

function decrHor() {
    win = workspace.activeClient;
    area = workspace.clientArea(win, win.screen, win.desktop);
    debug("decrease width",  win.caption, win.geometry);

    win.clientStartUserMovedResized(win);
    if (tiledWidth(win, area)) {
        // full width: do nothing
    }
    else if (tiledLeft(win, area)) {
        // tiled left: decrease from right and leave in place
        debug("tiled left");
        win.geometry.width -= config.stepHor;
    }
    else if (tiledRight(win, area)) {
        // tiled right: decrease from right and move to right
        debug("tiled right");
        win.geometry.width -= config.stepHor;
        win.geometry.x += config.stepHor;
    }
    else {
        // not tiled: decrease from right and move half to right
        debug("tiled non-horizontal");
        win.geometry.width -= config.stepHor;
        win.geometry.x += config.stepHor/2;
    }
    win.clientFinishUserMovedResized(win);
}

function incrVer() {
    win = workspace.activeClient;
    area = workspace.clientArea(win, win.screen, win.desktop);
    debug("increase height",  win.caption, win.geomtry);

    win.clientStartUserMovedResized(win);
    if (tiledHeight(win, area)) {
        // full height: do nothing
    }
    else if (tiledTop(win, area)) {
        // tiled top: increase to bottom and leave in place
        debug("tiled top");
        win.geometry.height += config.stepVer;
    }
    else if (tiledBottom(win, area)) {
        // tiled bottom: increase to bottom and move to top
        debug("tiled bottom");
        win.geometry.height += config.stepVer;
        win.geometry.y -= config.stepVer;
    }
    else {
        // not tiled: increase to bottom and move half to top
        debug("tiled non-vertical");
        win.geometry.height += config.stepVer;
        win.geometry.y -= config.stepVer/2;
    }
    win.clientFinishUserMovedResized(win);
}

function decrVer() {
    win = workspace.activeClient;
    area = workspace.clientArea(win, win.screen, win.desktop);
    debug("decrease height",  win.caption, win.geometry);

    win.clientStartUserMovedResized(win);
    if (tiledHeight(win, area)) {
        // full height: do nothing
    }
    else if (tiledTop(win, area)) {
        // tiled top: decrease from bottom and leave in place
        debug("tiled top");
        win.geometry.height -= config.stepVer;
    }
    else if (tiledBottom(win, area)) {
        // tiled bottom: decrease from bottom and move to bottom
        debug("tiled bottom");
        win.geometry.height -= config.stepVer;
        win.geometry.y += config.stepVer;
    }
    else {
        // not tiled: decrease from bottom and move half to bottom
        debug("tiled non-vertical");
        win.geometry.height -= config.stepVer;
        win.geometry.y += config.stepVer/2;
    }
    win.clientFinishUserMovedResized(win);
}

///////////////////////
// determine tiledness
///////////////////////

function tiledLeft(win, area) {
    return Math.abs(win.left - area.left) <= config.tolerance;
}

function tiledRight(win, area) {
    return Math.abs(win.right - area.right) <= config.tolerance;
}

function tiledTop(win, area) {
    return Math.abs(win.top - area.top) <= config.tolerance;
}

function tiledBottom(win, area) {
    return Math.abs(win.bottom - area.bottom) <= config.tolerance;
}

function tiledWidth(win, area) {
    return tiledLeft(win, area) && tiledRight(win, area);
}

function tiledHeight(win, area) {
    return tiledTop(win, area) && tiledBottom(win, area);
}
