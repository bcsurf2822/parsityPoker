const gamesSocket = require("./gameSocket");
const joinSocket = require("./joinSocket");
const leaveSocket = require("./leaveSocket");


function setupSockets(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    gamesSocket(socket); 
    joinSocket(socket);
    leaveSocket(socket);


    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

module.exports = setupSockets;