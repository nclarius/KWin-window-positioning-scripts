/*
KWin Script Always Open on Active Screen
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

workspace.clientAdded.connect(moveToActiveScreen);

function moveToActiveScreen(client) {
    if (client == null || !client.normalWindow) {
        return;
    }
    workspace.sendClientToScreen(client, workspace.activeScreen);
}
