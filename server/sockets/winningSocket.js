const Game = require("../models/gamesSchema");
const axios = require("axios");
var Hand = require('pokersolver').Hand;

function resetActionNone(game) {
  game.seats.forEach((seat) => {
    if (seat.player) {
      seat.player.action = "none";
    }
  });
}

function winnerSocket(socket, io) {
  socket.on("get_winner", async (data) => {
    const { gameId } = data;

    try {
      const game = await Game.findById(gameId);
      if (!game) {
        return socket.emit("error", { message: "Game not found!" });
      }

      if (
        game.pot <= 0 ||
        game.stage !== "showdown" ||
        game.communityCards.length !== 5
      ) {
        return socket.emit("error", {
          message: "Not time to determine winner",
        });
      }

      const playersActive = game.seats.filter(
        (seat) => seat.player && seat.player.handCards.length > 0
      );
      if (playersActive.length <= 1) {
        return socket.emit("error", {
          message: "Not enough active players to call API",
        });
      }

      const communityCards = game.communityCards.join(",");
      const playersData = game.seats
        .filter((seat) => seat.player && seat.player.handCards.length)
        .map((seat) => {
          return {
            seatId: seat._id.toString(),
            handCards: seat.player.handCards.join(","),
            playerData: seat.player,
          };
        });

      const playerCards = playersData
        .map((p) => `pc[]=${p.handCards}`)
        .join("&");
      const url = `https://api.pokerapi.dev/v1/winner/texas_holdem?cc=${communityCards}&${playerCards}`;

      const response = await axios.get(url);
      let winnerData = response.data.winners;

      winnerData = winnerData.map((winner) => {
        const matchingSeat = playersData.find(
          (p) => p.handCards === winner.cards
        );
        return {
          ...winner,
          seatId: matchingSeat?.seatId,
          user: matchingSeat?.playerData.username,
          winningHand: winner.result,
          reward: game.pot / winnerData.length,
        };
      });

      winnerData.forEach((winner) => {
        const winningSeat = game.seats.find(
          (seat) => seat._id.toString() === winner.seatId
        );
        if (winningSeat && winningSeat.player) {
          winningSeat.player.chips += winner.reward; 
        }
      });

      game.winnerData = winnerData;
      game.pot = 0;
      game.gameEnd = true;
      game.gameRunning = false;
      game.currentDeck = [];
      game.highestBet = 0;
      game.betPlaced = false;
      game.stage = "end";

      await game.save();

      console.log("Emitting winner_received with game:", game);
      io.emit("winner_received", game);
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

module.exports = { winnerSocket, potToPlayerSocket };
