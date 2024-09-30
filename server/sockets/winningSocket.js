const Game = require("../models/gamesSchema");
var Hand = require("pokersolver").Hand;

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
        console.log("Game not found!");
        return socket.emit("error", { message: "Game not found!" });
      }

      if (
        game.pot <= 0 ||
        game.stage !== "showdown" ||
        game.communityCards.length !== 5
      ) {
        console.log(
          "Not time to determine winner. Pot:",
          game.pot,
          "Stage:",
          game.stage,
          "Community cards:",
          game.communityCards
        );
        return socket.emit("error", {
          message: "Not time to determine winner",
        });
      }

      const playersActive = game.seats.filter(
        (seat) => seat.player && seat.player.handCards.length > 0
      );
      if (playersActive.length <= 1) {
        console.log("Not enough active players to determine a winner.");
        return socket.emit("error", {
          message: "Not enough active players to determine a winner",
        });
      }

      const communityCards = game.communityCards.map(
        (card) => card[0].toUpperCase() + card.slice(1).toLowerCase()
      );
      console.log("Community Cards:", communityCards);

      const playersData = game.seats
        .filter((seat) => seat.player && seat.player.handCards.length)
        .map((seat) => {
          return {
            seatId: seat._id.toString(),
            handCards: seat.player.handCards.map(
              (card) => card[0].toUpperCase() + card.slice(1).toLowerCase()
            ),
            playerData: seat.player,
          };
        });

      console.log("Players Data:", playersData);

      const hands = playersData.map((player, index) => {
        const fullHand = [...communityCards, ...player.handCards];
        console.log(
          `Player ${index + 1} (Seat ID: ${player.seatId}) Hand:`,
          fullHand
        );

        const handSolved = Hand.solve(fullHand);
        console.log(
          `Player ${index + 1} (Seat ID: ${player.seatId}) Evaluated Hand:`,
          handSolved.descr
        );

        return {
          seatId: player.seatId,
          playerData: player.playerData,
          hand: handSolved,
        };
      });

      const winningHands = Hand.winners(hands.map((h) => h.hand));
      console.log("Winning Hands:", winningHands);

      const winnerData = winningHands.map((winner) => {
        const matchingSeat = hands.find(
          (h) => h.hand.toString() === winner.toString()
        );
        return {
          seatId: matchingSeat?.seatId,
          user: matchingSeat?.playerData.username,
          handName: winner.name,
          potAmount: game.pot / winningHands.length,
        };
      });

      console.log("Winner Data:", winnerData);

      game.winnerData = winnerData;
      await game.save();

      socket.emit("winner_recieved", { winners: winnerData });

      resetActionNone(game);
    } catch (error) {
      console.error("Error determining winner:", error);
      socket.emit("winnerError", {
        message: "An error occurred while determining the winner.",
      });
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
