/*
KWin Script Always Open on Active Screen
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

// when a client is added
workspace.clientAdded.connect(function(client) {
    // move client to active screen
    if (client == null || !client.normalWindow) return;
    workspace.sendClientToScreen(client, workspace.activeScreen);

    // clip and move client into bounds of screen dimensions
    if (!client.moveable) return;
    area = workspace.clientArea(KWin.MaximizeArea, client);
    // window width/height maximally screen width/height
    client.geometry.width = Math.min(client.width, area.width);
    client.geometry.height = Math.min(client.height, area.height);
    // left/top window edge between left and right/top and bottom screen edges
    client.geometry.x = Math.max(area.left, Math.min(area.right - client.width, client.left));
    client.geometry.y = Math.max(area.top, Math.min(area.bottom - client.height, client.top));
});
