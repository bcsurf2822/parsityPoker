const Game = require("../models/gamesSchema");

function gamesSocket(socket, io) {
  socket.on("getGames", async () => {
    console.log(`Received 'getGames' request from socket: ${socket.id}`);

    try {
      const games = await Game.find({});
      console.log(`Sending 'gamesData' to all clients with ${games.length} game(s).`);
      io.emit("gamesData", games);
    } catch (error) {
      console.error(`Error fetching games for socket: ${socket.id}. Error: ${error}`);
      socket.emit("gamesError", error.toString());
    }
  });
}

module.exports = gamesSocket;