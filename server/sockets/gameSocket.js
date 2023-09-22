const Game = require("../models/gamesSchema");

function allGamesSocket(socket) {
  socket.on("getGames", async () => {
    console.log(`Received 'getGames' request from socket: ${socket.id}`);

    try {
      const games = await Game.find({});
      console.log(`Sending 'gamesData' to all clients with ${games.length} game(s).`);
      socket.emit("gamesData", games);
    } catch (error) {
      console.error(`Error fetching games for socket: ${socket.id}. Error: ${error}`);
      socket.emit("gamesError", error.toString());
    }
  });
};

function gameSocket (socket) {
  socket.on("getGame", async (gameId) => {
    console.log(`Received 'getGame' request for gameId: ${gameId} from socket: ${socket.id}`);
  
    try {
      const game = await Game.findById(gameId);
      if (game) {
        console.log(`Sending 'gameData' to socket: ${socket.id} for game: ${gameId}.`);
        socket.emit("gameData", game);
      } else {
        throw new Error(`Game with id: ${gameId} not found`);
      }
    } catch (error) {
      console.error(`Error fetching game with id: ${gameId} for socket: ${socket.id}. Error: ${error}`);
      socket.emit("gameError", error.toString());
    }
  });
};

module.exports = {allGamesSocket, gameSocket};