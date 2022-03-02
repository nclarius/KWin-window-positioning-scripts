/*
KWin Script Always Open on Focused Screen
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

// initialization
const debugMode = readConfig("debugMode", true);
function debug(...args) {if (debugMode) 
    console.debug("alwaysopenonfocusedscreen:", ...args);}
debug("initializing");

// when a client is activated, update focused screen to screen client is on
focusedScreen = workspace.activeScreen;
workspace.clientActivated.connect(client => {
    if (!client || client.resourceClass == "plasmashell") return;
    focusedScreen = client.screen;
    debug("focused screen", activeScreen);
});

// when a client is added
workspace.clientAdded.connect(client => {
    debug("client", JSON.stringify(client, undefined, 2));

    // abort if client is null or not a normal window
    if (!client || client.resourceClass == "plasmashell") return;

    // abort if client is already on the right screen
    if (client.screen == focusedScreen) return;

    // move client to focused screen
    debug("sending client", client.caption, "to focused screen", focusedScreen);
    workspace.sendClientToScreen(client, focusedScreen);

    // clip and move client into bounds of screen dimensions
    if (!(client.moveable && client.resizeable)) return;
    area = workspace.clientArea(KWin.MaximizeArea, client);
    // window width/height maximally screen width/height
    client.geometry.width = Math.min(client.width, area.width);
    client.geometry.height = Math.min(client.height, area.height);
    // left/top window edge between left and right/top and bottom screen edges
    client.geometry.x = Math.max(area.x, Math.min(area.x + area.width - client.width, client.x));
    client.geometry.y = Math.max(area.y, Math.min(area.y + area.height - client.height, client.y));
});
