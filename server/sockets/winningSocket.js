const Game = require("../models/gamesSchema");
const axios = require("axios");


//When All players fold, the pot is transferred to the remaining player
function potToPlayerSocket(socket, io) {
  socket.on("pot_to_player", async (data) => {
    const { gameId } = data;
    console.log(
      `Received pot_to_player event on server for game ID: ${gameId}`
    );

    try {
      const game = await Game.findById(gameId);
      if (!game) {
        return socket.emit("error", { message: "Game not found!" });
      }

      if (Object.keys(game.winnerData).length) {
        console.log("Winner data already present, skipping pot transfer.");
        return socket.emit("error", { message: "Winner data already present. Pot transfer aborted." });
      }

      const occupiedSeats = game.seats.filter(
        (seat) => seat.player && seat.player.handCards.length
      );

      if (occupiedSeats.length !== 1) {
        return socket.emit("error", {
          message:
            "There is more than one player remaining. Can't determine who to transfer the pot to.",
        });
      }

      const remainingSeat = occupiedSeats[0];
      const potBeforeTransfer = game.pot;
      remainingSeat.player.chips += game.pot;

      game.winnerData = {
        players: [
          {
            cards: remainingSeat.player.handCards.join(","),
            chips: remainingSeat.player.chips,
            seatId: remainingSeat.id,
            user:  remainingSeat.player.username,
          },
        ],
        winners: [
          {
            cards: remainingSeat.player.handCards.join(","),
            chips: potBeforeTransfer,
            seatId: remainingSeat.id,
            user:  remainingSeat.player.username,

          },
        ],
        reason: "Last remaining player awarded the pot",
      };

      game.pot = 0;
      game.gameEnd = true;
      game.gameRunning = false;
      game.currentDeck = [];
      game.stage = "end";

      await game.save();

      console.log("Emitting pot_transfer with game:", game);
      io.emit("pot_transferred", game);

      console.log(
        `Pot transferred to the remaining player in seat: ${remainingSeat._id}.`
      );
    } catch (error) {
      console.error(error);
      socket.emit("potTransferError", { error: "Failed to transfer the pot" });
    }
  });
}


module.exports = potToPlayerSocket;