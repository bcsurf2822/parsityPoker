const Game = require("../models/gamesSchema");

function gamesSocket(socket) {
  socket.on("getGames", async () => {
    try {
      const games = await Game.find({});
      socket.emit("gamesData", games);
    } catch (error) {
      console.error(error);
      socket.emit("gamesError", error.toString());
    }
  });
}

module.exports = gamesSocket;
