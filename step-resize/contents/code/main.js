/*
KWin Script Step Resize
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/


///////////////////////
// configuration
///////////////////////

config = {
    stepHorizontal: readConfig("stepHorizontal", 50),
    stepVertical:   readConfig("stepVertical"  , 50),
    tolerance:      readConfig("tolerance"     , 0)
};


///////////////////////
// initialization
///////////////////////

debugMode = true;
function debug(...args) {if (debugMode) {console.debug(...args);}}
debug("initializing step resize");
debug("step resize settings:", "step horizontal:", config.stepHorizontal, "step vertical:", config.stepVertical, "tolerance:", config.tolerance);


///////////////////////
// register shortcuts
///////////////////////

registerShortcut("Step resize increase areally"      , "Step Resize Increase Size", "Alt+O", incrAreal     );
registerShortcut("Step resize decrease araelly"      , "Step Resize Decrease Size", "Alt+M", decrAreal     );
registerShortcut("Step resize increase horizontally" , "Step Resize Increase Width" , "Alt+L", incrHorizontal);
registerShortcut("Step resize decrease horizontally" , "Step Resize Decrease Width" , "Alt+J", decrHorizontal);
registerShortcut("Step resize increase vertically"   , "Step Resize Increase Height", "Alt+I", incrVertical  );
registerShortcut("Step resize decrease vertically"   , "Step Resize Decrease Height", "Alt+,", decrVertical  );


///////////////////////
// resize window
///////////////////////

function incrAreal() {
    // increase horizontally and vertically
    incrHorizontal();
    incrVertical();
}

function decrAreal() {
    // decrease horizontally and vertically
    decrHorizontal();
    decrVertical();
}

function incrHorizontal() {
    win = workspace.activeClient;
    area = workspace.clientArea(win, win.screen, win.desktop);
    debug("increase width", win.caption, win.geometry);

    win.clientStartUserMovedResized(win);
    if (tiledLeft(win, area)) {
        // tiled left: increase to right and leave in place
        debug("tiled left");
        win.geometry.width += config.stepHorizontal;
    }
    else if (tiledRight(win, area)) {
        // tiled right: increase to right and move to left
        debug("tiled right");
        win.geometry.width += config.stepHorizontal;
        win.geometry.x -= config.stepHorizontal;
    }
    else {
        // not tiled: increase to right and move half to left
        debug("tiled non-horizontal");
        win.geometry.width += config.stepHorizontal;
        win.geometry.x -= config.stepHorizontal/2;
    }
    win.clientFinishUserMovedResized(win);
}

function decrHorizontal() {
    win = workspace.activeClient;
    area = workspace.clientArea(win, win.screen, win.desktop);
    debug("decrease width",  win.caption, win.geometry);

    win.clientStartUserMovedResized(win);
    if (tiledLeft(win, area)) {
        // tiled left: decrease from right and leave in place
        debug("tiled left");
        win.geometry.width -= config.stepHorizontal;
    }
    else if (tiledRight(win, area)) {
        // tiled right: decrease from right and move to right
        debug("tiled right");
        win.geometry.width -= config.stepHorizontal;
        win.geometry.x += config.stepHorizontal;
    }
    else {
        // not tiled: decrease from right and move half to right
        debug("tiled non-horizontal");
        win.geometry.width -= config.stepHorizontal;
        win.geometry.x += config.stepHorizontal/2;
    }
    win.clientFinishUserMovedResized(win);
}

function incrVertical() {
    win = workspace.activeClient;
    area = workspace.clientArea(win, win.screen, win.desktop);
    debug("increase height",  win.caption, win.geomtry);

    win.clientStartUserMovedResized(win);
    if (tiledTop(win, area)) {
        // tiled top: increase to bottom and leave in place
        debug("tiled top");
        win.geometry.height += config.stepVertical;
    }
    else if (tiledBottom(win, area)) {
        // tiled bottom: increase to bottom and move to top
        debug("tiled bottom");
        win.geometry.height += config.stepVertical;
        win.geometry.y -= config.stepVertical;
    }
    else {
        // not tiled: increase to bottom and move half to top
        debug("tiled non-vertical");
        win.geometry.height += config.stepVertical;
        win.geometry.y -= config.stepVertical/2;
    }
    win.clientFinishUserMovedResized(win);
}

function decrVertical() {
    win = workspace.activeClient;
    area = workspace.clientArea(win, win.screen, win.desktop);
    debug("decrease height",  win.caption, win.geometry);

    win.clientStartUserMovedResized(win);
    if (tiledTop(win, area)) {
        // tiled top: decrease from bottom and leave in place
        debug("tiled top");
        win.geometry.height -= config.stepVertical;
    }
    else if (tiledBottom(win, area)) {
        // tiled bottom: decrease from bottom and move to bottom
        debug("tiled bottom");
        win.geometry.height -= config.stepVertical;
        win.geometry.y += config.stepVertical;
    }
    else {
        // not tiled: decrease from bottom and move half to bottom
        debug("tiled non-vertical");
        win.geometry.height -= config.stepVertical;
        win.geometry.y += config.stepVertical/2;
    }
    win.clientFinishUserMovedResized(win);
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
