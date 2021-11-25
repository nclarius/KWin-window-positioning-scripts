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

debugMode = true;
function debug(...args) {if (debugMode) {console.debug(...args);}}
debug("initializing step move");
debug("step move settings:", "step horizontal:", config.stepHorizontal, "step vertical:", config.stepVertical);


///////////////////////
// register shortcuts
///////////////////////

registerShortcut("Step move: center", "Step Move: Center", "Alt+D", moveCenter);
registerShortcut("Step move: left"  , "Step Move: Left"  , "Alt+S", moveLeft  );
registerShortcut("Step move: right" , "Step Move: Right" , "Alt+F", moveRight );
registerShortcut("Step move: up"    , "Step Move: Up"    , "Alt+E", moveUp    );
registerShortcut("Step move: down"  , "Step Move: Down"  , "Alt+C", moveDown  );


///////////////////////
// move window
///////////////////////

function moveCenter() {
    win = workspace.activeClient;
    area = workspace.clientArea(win, win.screen, win.desktop);
    debug("move center", win.caption);
    win.clientStartUserMovedResized(win);
    win.geometry.x = area.x + area.width/2 - win.width/2;
    win.geometry.y = area.y + area.height/2 - win.height/2;
    win.clientFinishUserMovedResized(win);
}

function moveLeft() {
    win = workspace.activeClient;
    debug("move left", win.caption);
    win.clientStartUserMovedResized(win);
    win.geometry.x -= config.stepHorizontal;
    win.clientFinishUserMovedResized(win);
}

function moveRight() {
    win = workspace.activeClient;
    debug("move right", win.caption);
    win.clientStartUserMovedResized(win);
    win.geometry.x += config.stepHorizontal;
    win.clientFinishUserMovedResized(win);
}

function moveUp() {
    win = workspace.activeClient;
    debug("move up", win.caption);
    win.clientStartUserMovedResized(win);
    win.geometry.y -= config.stepVertical;
    win.clientFinishUserMovedResized(win);
}

function moveDown() {
    win = workspace.activeClient;
    debug("move down", win.caption);
    win.clientStartUserMovedResized(win);
    win.geometry.y += config.stepVertical;
    win.clientFinishUserMovedResized(win);
}
