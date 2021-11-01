/*
KWin Script Always Open on Focused Screen
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

// when a client is activated, update the focused screen
focusedScreen = workspace.activeScreen;
workspace.clientActivated.connect(updateFocusedScreen);
function updateFocusedScreen(client) {
    if (client == null || !client.normalWindow) {
        return;
    }
    focusedScreen = client.screen;
}

// when a client is added, move it to the focused screen
workspace.clientAdded.connect(moveToFocusedScreen);
function moveToFocusedScreen(client) {
    if (client == null || !client.normalWindow) {
        return;
    }
    workspace.sendClientToScreen(client, focusedScreen);
}
