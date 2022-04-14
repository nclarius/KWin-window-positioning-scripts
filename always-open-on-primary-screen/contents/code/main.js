/*
KWin Script Always Open on Primary Screen
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

// initialization
const debugMode = readConfig("debugMode", true);
function debug(...args) {if (debugMode) 
    console.debug("alwaysopenonprimaryscreen:", ...args);}
debug("initializing");

// read config
const config = {
    classlist: readConfig("classlist", "").toLowerCase().split("\n").map(s => s.trim()),
    allowmode: readConfig("allowmode", false),
    denymode: readConfig("denymode", true),
};

// primary screen is 0'th
primaryScreen = 0;

// when a client is added
workspace.clientAdded.connect(client => {
    debug("client", JSON.stringify(client, undefined, 2));

    // abort if client is null, not regeometrizable, or already on right screen
    if (!client
        || (config.denymode && config.classlist.includes(String(client.resourceClass)))     // using denymode and window class is in list
        || (config.allowmode && !config.classlist.includes(String(client.resourceClass)))   // using allowmode and window class is not in list
        || !(client.resizeable && client.moveable && client.moveableAcrossScreens)
        || client.screen == primaryScreen)
        return;

    // move client to primary screen
    debug("sending client", client.caption, "to primary screen", primaryScreen);
    workspace.sendClientToScreen(client, primaryScreen);

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
