/*
KWin Script Always Open on Primary Screen
(C) 2021-2022 Natalie Clarius <natalie_clarius@yahoo.de>
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
    if (config.debugMode) console.debug("alwaysopenonprimaryscreen:", ...args);
  }
  debug("initializing");
  debug("config:", config.allowMode ? "allow" : "deny", "list", config.classList);

// primary screen is 0'th
var primaryScreen = 0;

// when a window is added
workspace.clientAdded.connect(window => {
    debug("window", JSON.stringify(window, undefined, 2));

    // abort conditions
    if (!window // null
        || (config.allowMode && config.classList.includes(String(window.resourceClass))) // using allowmode and window class is not in list
        || (config.denyMode && !config.classList.includes(String(window.resourceClass)))  // using denymode and window class is in list
        || !(window.resizeable && window.moveable && window.moveableAcrossScreens) // not regeomtrizable
        || window.screen == primaryScreen) // already on right screen
        return;

    // move window to primary screen
    debug("sending window", window.caption, "to primary screen", primaryScreen);
    workspace.sendClientToScreen(window, primaryScreen);

    // clip and move window into bounds of screen dimensions
    const area = workspace.clientArea(KWin.MaximizeArea, window);
    window.geometry.width = Math.min(area.width, window.width);
    window.geometry.height = Math.min(area.height, window.height);
    window.geometry.x = Math.max(area.x, Math.min(area.x + area.width - window.width, window.x));
    window.geometry.y = Math.max(area.y, Math.min(area.y + area.height - window.height, window.y));
});
