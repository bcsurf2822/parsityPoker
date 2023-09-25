const {allGamesSocket, gameSocket} = require("./gameSocket");
const joinSocket = require("./joinSocket");
const leaveSocket = require("./leaveSocket");
const roomSocket = require("./roomSocket");
const { updateCurrentPlayerSocket, endGameSocket } = require("./mechSocket");
const {dealToPlayersSocket, dealFlopSocket, dealTurnSocket, dealRiverSocket} = require("./dealerSocket");
const {playerToPotSocket, checkSocket, foldSocket} = require("./betCheckFoldSocket");
const positionsAndBlindsSocket = require("./newRoundSocket");


function setupSockets(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    gameSocket(socket);
    allGamesSocket(socket);
    joinSocket(socket, io);
    leaveSocket(socket, io);
    roomSocket(socket);
    positionsAndBlindsSocket(socket, io);
    updateCurrentPlayerSocket(socket, io);
    endGameSocket(socket, io);
    dealToPlayersSocket(socket, io);
    dealFlopSocket(socket, io);
    dealTurnSocket(socket, io);
    dealRiverSocket(socket, io);
    playerToPotSocket(socket, io);
    checkSocket(socket, io);
    foldSocket(socket, io);


    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

module.exports = setupSockets;
