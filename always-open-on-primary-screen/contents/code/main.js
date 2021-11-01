/*
KWin Script Always Open on Primary Screen
(C) 2021 Natalie Clarius <natalie_clarius@yahoo.de>
GNU General Public License v3.0
*/

workspace.clientAdded.connect(moveToPrimaryScreen);

function moveToPrimaryScreen(client) {
    if (client == null || !client.normalWindow) {
        return;
    }
    workspace.sendClientToScreen(client, 0);
}
