/*
KWin Script Always Open on Active Screen
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

// initialization
const config = {
  classList: readConfig("classList", "")
    .toLowerCase()
    .split("\n")
    .map((s) => s.trim()),
  allowMode: readConfig("allowMode", true),
  denyMode: readConfig("denyMode", false),
  debugMode: readConfig("debugMode", true)
};

  function debug(...args) {
    if (config.debugMode) console.debug("alwaysopenonactivescreen:", ...args);
  }
  debug("initializing");
  debug("config:", config.allowMode ? "allow" : "deny", "list", config.classList);

// when a client is added
workspace.clientAdded.connect(client => {
    debug("client", JSON.stringify(client, undefined, 2));

    // get active screen
    var activeScreen = workspace.activeScreen;

    // abort conditions
    if (!client // null
        || (config.allowMode && config.classList.includes(String(client.resourceClass))) // using allowmode and window class is in list
        || (config.denyMode && !config.classList.includes(String(client.resourceClass))) // using denymode and window class is not in list
        || !(client.resizeable && client.moveable && client.moveableAcrossScreens) // not regeomtrizable
        && !(client.caption == "Plasma" && client.resourceClass == "plasmashell" && 
             client.normalWindow && client.frameGeometry == workspace.clientArea(KWin.MaximizeArea, client)) // except kickerdash
        || client.screen == activeScreen) // already on right screen
        return;

    // move client to active screen
    debug("sending client", client.caption, "to active screen", activeScreen);
    workspace.sendClientToScreen(client, activeScreen);

    // clip and move client into bounds of screen dimensions
    const area = workspace.clientArea(KWin.MaximizeArea, client);
    client.geometry.width = Math.min(area.width, client.width);
    client.geometry.height = Math.min(area.height, client.height);
    client.geometry.x = Math.max(area.x, Math.min(area.x + area.width - client.width, client.x));
    client.geometry.y = Math.max(area.y, Math.min(area.y + area.height - client.height, client.y));
});
