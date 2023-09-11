const gamesSocket = require("./gameSocket");
const joinSocket = require("./joinSocket");
const leaveSocket = require("./leaveSocket");
const roomSocket = require("./roomSocket");
const { positionsAndBlindsSocket, updateCurrentPlayerSocket, endGameSocket } = require("./mechSocket");


function setupSockets(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    gamesSocket(socket, io);
    joinSocket(socket, io);
    leaveSocket(socket, io);
    roomSocket(socket);
    positionsAndBlindsSocket(socket, io);
    updateCurrentPlayerSocket(socket, io);
    endGameSocket(socket, io);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

module.exports = setupSockets;
