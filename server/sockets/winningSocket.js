const Game = require("../models/gamesSchema");

function resetActionNone(game) {
  game.seats.forEach((seat) => {
    if (seat.player) {
      seat.player.action = "none";
    }
  });
}

const axios = require('axios'); // Make sure you have axios installed

function winnerSocket(socket, io) {
  socket.on("get_winner", async (data) => {
    const { gameId } = data;

    try {
      const game = await Game.findById(gameId);
      if (!game) {
        return socket.emit("error", { message: "Game not found!" });
      }

      // Ensure there are community cards and players with hand cards
      if (game.communityCards.length === 0 || game.seats.every(seat => !seat.player || seat.player.handCards.length === 0)) {
        return socket.emit("error", { message: "Not enough data to determine a winner." });
      }

      // Format the community cards and player cards for the API call
      const communityCards = game.communityCards.join(',');
      const playersData = game.seats
        .filter(seat => seat.player && seat.player.handCards.length)
        .map(seat => {
          return {
            seatId: seat._id,
            handCards: seat.player.handCards.join(',')
          };
        });

      // Construct the API URL
      const playerCards = playersData.map(p => `pc[]=${p.handCards}`).join('&');
      const url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCards}&${playerCards}`;

      // Make the API request
      const response = await axios.get(url);
      const winnerData = response.data.winners;

      // Logic to update the game state with the winner(s) info
      // (e.g., update the pot, player chips, game stage, etc.)

      await game.save();

      // Emit an event with the updated game state
      io.emit("winner_received", { gameId, winnerData });
    } catch (error) {
      console.error(error);
      socket.emit("winnerError", { error: "Failed to determine winner" });
    }
  });
}


function potToPlayerSocket(socket, io) {
  socket.on("pot_to_player", async (data) => {
    const { gameId } = data;
    console.log(
      `Received pot_to_player event on server for game ID: ${gameId}`
    );

    try {
      const game = await Game.findById(gameId);

      resetActionNone(game);
      
      if (!game) {
        return socket.emit("error", { message: "Game not found!" });
      }

      if (game.pot <= 0) {
        return socket.emit("error", {
          message: "Pot is not greater than 0. Pot transfer aborted.",
        });
      }

      if (Object.keys(game.winnerData).length) {
        console.log("Winner data already present, skipping pot transfer.");
        return socket.emit("error", {
          message: "Winner data already present. Pot transfer aborted.",
        });
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

      for (let seat of game.seats) {
        if (seat.player) {
          seat.player.handCards = [];
        }
      }

      game.winnerData = {
        players: [
          {
            cards: remainingSeat.player.handCards.join(","),
            chips: remainingSeat.player.chips,
            seatId: remainingSeat.id,
            user: remainingSeat.player.username,
          },
        ],
        winners: [
          {
            cards: remainingSeat.player.handCards.join(","),
            chips: potBeforeTransfer,
            seatId: remainingSeat.id,
            user: remainingSeat.player.username,
          },
        ],
        reason: "Last remaining player awarded the pot",
      };

      game.pot = 0;
      game.gameEnd = true;
      game.gameRunning = false;
      game.currentDeck = [];
      game.highestBet = 0;
      game.betPlaced = false;
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

module.exports = {winnerSocket, potToPlayerSocket}
