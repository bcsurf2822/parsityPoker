const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

function leaveSocket(socket, io) {
  socket.on("leaveGame", async (data) => {
    try {
      const { gameId, userId } = data;

      const game = await Game.findById(gameId);

      if (!game) {
        return socket.emit("leaveGameError", { message: "Game not found!" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return socket.emit("leaveGameError", { message: "User not found!" });
      }

      const playerSeat = game.seats.find(
        (seat) => seat.player && seat.player.user.toString() === userId
      );

      if (!playerSeat) {
        return socket.emit("leaveGameError", {
          message: "You are not sitting in this game!",
        });
      }

      user.accountBalance += playerSeat.player.chips;
      playerSeat.player = null;
      game.playerCount -= 1;

      await user.save();

      const remainingPlayers = game.seats.filter(
        (seat) => seat.player !== null
      );

      if (remainingPlayers.length === 1) {
        const lastPlayer = remainingPlayers[0].player;
        lastPlayer.chips += game.pot;
        game.pot = 0;

        game.currentDeck = [];
        game.communityCards = [];
        game.dealtCards = [];
        game.winnerData = [];
        game.stage = "preflop";
        game.gameEnd = false;
        game.dealerPosition = -1;
        game.smallBlindPosition = -1;
        game.bigBlindPosition = -1;
        game.currentPlayerTurn = -1;

        socket.broadcast.emit("game_ended", game);
      }

      await game.save();
      console.log("Emitting playerLeave event...");
      io.emit("playerLeft", game);

      console.log("Emitting gameLeft event...");
      socket.emit("gameLeft", { message: "Successfully left the game!", game });
    } catch (err) {
      console.error(err);
      socket.emit("leaveGameError", { message: err.message });
    }
  });
}

module.exports = leaveSocket;
