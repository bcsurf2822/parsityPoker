const Game = require("../models/gamesSchema");

function gamesSocket(socket, io) {
  socket.on("getGames", async () => {
    try {
      const games = await Game.find({});
      io.emit("gamesData", games);
    } catch (error) {
      console.error(error);
      socket.emit("gamesError", error.toString());
    }
  });
}

module.exports = gamesSocket;
