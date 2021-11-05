/*
KWin Script Step Move
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/


///////////////////////
// configuration
///////////////////////

config = {
    stepHorizontal: readConfig("stepHorizontal", 10),
    stepVertical:   readConfig("stepVertical"  , 10)
};


///////////////////////
// initialization
///////////////////////

debugMode = false;
function debug(...args) {if (debugMode) {console.debug(...args);}}
debug("initializing step move");
debug("step move settings:", "step horizontal:", config.stepHorizontal, "step vertical:", config.stepVertical);


///////////////////////
// register shortcuts
///////////////////////

registerShortcut("Step move left" , "Step Move Left" , "Alt+S", moveLeft );
registerShortcut("Step move right", "Step Move Right", "Alt+F", moveRight);
registerShortcut("Step move up"   , "Step Move Up"   , "Alt+E", moveUp   );
registerShortcut("Step move down" , "Step Move Down" , "Alt+C", moveDown );


///////////////////////
// move window
///////////////////////

function moveLeft() {
    debug("move left", workspace.activeClient.caption);
    win.clientStartUserMovedResized(win);
    workspace.activeClient.geometry.x -= config.stepHorizontal;
    win.clientFinishUserMovedResized(win);
}

function moveRight() {
    debug("move right", workspace.activeClient.caption);
    win.clientStartUserMovedResized(win);
    workspace.activeClient.geometry.x += config.stepHorizontal;
    win.clientFinishUserMovedResized(win);
}

function moveUp() {
    debug("move up", workspace.activeClient.caption);
    win.clientStartUserMovedResized(win);
    workspace.activeClient.geometry.y -= config.stepVertical;
    win.clientFinishUserMovedResized(win);
}

function moveDown() {
    debug("move down", workspace.activeClient.caption);
    win.clientStartUserMovedResized(win);
    workspace.activeClient.geometry.y += config.stepVertical;
    win.clientFinishUserMovedResized(win);
}
