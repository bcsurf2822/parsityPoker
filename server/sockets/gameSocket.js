const Game = require("../models/gamesSchema");

function gamesSocket(socket) {
  // Existing event for fetching all games
  socket.on("getGames", async () => {
    try {
      const games = await Game.find({});
      socket.emit("gamesData", games);
    } catch (error) {
      console.error(error);
      socket.emit("gamesError", error.toString());
    }
  });

  socket.on("getRoom", async (gameId) => {
    try {
      const game = await Game.findById(gameId);
      if (!game) {
        socket.emit("gameError", `Game with ID ${gameId} not found.`);
        return;
      }
      socket.emit("gameData", game);
    } catch (error) {
      console.error(error);
      socket.emit("gameError", error.toString());
    }
  });
}

module.exports = gamesSocket;
