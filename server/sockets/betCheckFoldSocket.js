const Game = require("../models/gamesSchema");

function playersHaveActed(game, currentSeatId) {
  return game.seats.every((seat) => {
    return (
      !seat.player ||
      seat._id.toString() === currentSeatId ||
      seat.player.checkBetFold
    );
  });
}

function resetCheckBetFold(game) {
  game.seats.forEach((seat) => {
    if (seat.player) {
      seat.player.checkBetFold = false;
    }
  });
}

function playersWithCards(game) {
  return game.seats.filter(
    (seat) => seat.player && seat.player.handCards.length
  ).length;
}

const findNextPosition = (startPosition, seats) => {
  let seatCount = seats.length;
  let nextPosition = (startPosition + 1) % seatCount;
  while (!seats[nextPosition].player) {
    nextPosition = (nextPosition + 1) % seatCount;
  }
  return nextPosition;
};

function proceedToNextStage(game) {
  if (game.stage !== "showdown") {
    if (playersWithCards(game) > 2) {
      game.stage = "showdown";
    } else {
      switch (game.stage) {
        case "preflop":
          game.stage = "flop";
          break;
        case "flop":
          game.stage = "turn";
          break;
        case "turn":
          game.stage = "river";
          break;
        case "river":
          game.stage = "showdown";
          break;
      }
    }
    if (game.stage !== "showdown") {
      resetCheckBetFold(game);
    }
  }

  game.currentHighestBet = 0;
}

//Bet and All in

function playerBetSocket(socket, io) {
  socket.on("player_bet", async (data) => {
    const { gameId, seatId, bet, action } = data;
    let betAmount;

    console.log("Received player_bet_all_in data:", data);

    try {
      const game = await Game.findById(gameId);

      if (!game) {
        return socket.emit("error", { message: "Game not found!" });
      }

      const seat = game.seats.find((s) => s._id.toString() === seatId);

      if (!seat) {
        return socket.emit("error", { message: "Seat not Found!" });
      }

      if (!seat.player) {
        return socket.emit("error", { message: "No Player at this Seat" });
      }

      switch (action) {
        case "all-in":
            console.log("All-in action recognized", data);
            betAmount = seat.player.chips;
            break;
            
        case "bet":
          betAmount = Number(bet);
          if (!betAmount || isNaN(betAmount)) {
            return socket.emit("error", { message: "Invalid Bet" });
          }
          break;

        default:
          return socket.emit("error", { message: "Invalid Action" });
      }

      if (
        action === "bet" &&
        betAmount > game.highestBet
      ) {
        game.highestBet = betAmount;

        game.seats.forEach((s) => {
          if (s.player) {
            s.player.checkBetFold = false;
          }
        });
      }

      if (seat.player.chips < betAmount && action !== "all-in") {
        return socket.emit("error", { message: "Not Enough Chips to Bet" });
      }

      seat.player.chips -= betAmount;
      game.pot += betAmount;
      seat.player.bet += betAmount;
      seat.player.action = action;
      seat.player.checkBetFold = true;

      await game.save();

      if (playersHaveActed(game, seatId)) {
        proceedToNextStage(game);
        await game.save();
      } else {
        game.currentPlayerTurn = findNextPosition(
          game.currentPlayerTurn,
          game.seats
        );
        while (
          !game.seats[game.currentPlayerTurn].player ||
          game.seats[game.currentPlayerTurn].player.handCards.length === 0
        ) {
          game.currentPlayerTurn = findNextPosition(
            game.currentPlayerTurn,
            game.seats
          );
        }
      }

      await game.save();

      io.emit("next_current_player", game);

      io.emit("player_bet_placed", game);
    } catch (error) {
      console.error(error);
      socket.emit("playerBetError", { error: "Failed to place bet" });
    }
  });
}

function playerToPotSocket(socket, io) {
  socket.on("player_to_pot", async (data) => {
    const { gameId, seatId, bet, action } = data;
    let betAmount;

    console.log("Received player_to_pot data:", data);

    try {
      const game = await Game.findById(gameId);

      if (!game) {
        return socket.emit("error", { message: "Game not found!" });
      }

      const seat = game.seats.find((s) => s._id.toString() === seatId);

      if (!seat) {
        return socket.emit("error", { message: "Seat not Found!" });
      }

      if (!seat.player) {
        return socket.emit("error", { message: "No Player at this Seat" });
      }

      switch (action) {
        case "call":
          const highestBet = Math.max(
            ...game.seats.map((s) => (s.player ? s.player.bet : 0))
          );
          betAmount = highestBet

          console.log("Highest Bet from all players:", highestBet);
          console.log("Current Player's Bet:", seat.player.bet);
          console.log("Computed Bet Amount for Call:", betAmount);

          if (betAmount <= 0) {
            return socket.emit("error", {
              message: "Player has Match or exceeded bet",
            });
          }

          if (seat.player.chips < betAmount) {
            betAmount = seat.player.chips;
          }
          break;

        case "all-in":
          betAmount = seat.player.chips;
          break;

        case "bet":
          betAmount = Number(bet);
          if (!betAmount || isNaN(betAmount)) {
            return socket.emit("error", { message: "Invalid Bet" });
          }
          break;

        case "raise":
          betAmount = Number(bet);
          if (!betAmount || isNaN(betAmount) || betAmount <= game.highestBet) {
            return socket.emit("error", { message: "Invalid Raise Amount" });
          }
          break;

        default:
          return socket.emit("error", { message: "Invalid Action" });
      }

      if (
        (action === "bet" || action === "raise") &&
        betAmount > game.highestBet
      ) {
        game.highestBet = betAmount;

        game.seats.forEach((s) => {
          if (s.player) {
            s.player.checkBetFold = false;
          }
        });
      }

      if (seat.player.chips < betAmount && action !== "call") {
        return socket.emit("error", { message: "Not Enough Chips to Call" });
      }

      seat.player.chips -= betAmount;
      game.pot += betAmount;
      seat.player.bet += betAmount;
      seat.player.action = action;
      seat.player.checkBetFold = true;

      await game.save();

      // Check if all players except the current one have acted
      if (playersHaveActed(game, seatId)) {
        proceedToNextStage(game);
        await game.save();
      } else {
        // Otherwise, determine the next player's turn as usual
        game.currentPlayerTurn = findNextPosition(
          game.currentPlayerTurn,
          game.seats
        );
        while (
          !game.seats[game.currentPlayerTurn].player ||
          game.seats[game.currentPlayerTurn].player.handCards.length === 0
        ) {
          game.currentPlayerTurn = findNextPosition(
            game.currentPlayerTurn,
            game.seats
          );
        }
      }

      await game.save();

      io.emit("next_current_player", game);

      io.emit("player_acted", game);
    } catch (error) {
      console.error(error);
      socket.emit("playerBetError", { error: "Failed to place bet" });
    }
  });
}

function checkSocket(socket, io) {
  socket.on("check", async (data) => {
    const { gameId, seatId } = data;
    console.log("Received check event on server with data:", data);
    try {
      const game = await Game.findById(gameId);

      if (!game) {
        return socket.emit("error", { message: "Game not found!" });
      }

      const seat = game.seats.find((s) => s._id.toString() === seatId);

      if (!seat) {
        return socket.emit("error", { message: "Seat not found!" });
      }

      if (!seat.player) {
        return socket.emit("error", { message: "No Player At Seat" });
      }

      seat.player.action = "check";
      seat.player.checkBetFold = true;

      await game.save();

      if (playersHaveActed(game)) {
        proceedToNextStage(game);
        await game.save();
      }

      game.currentPlayerTurn = findNextPosition(
        game.currentPlayerTurn,
        game.seats
      );

      while (
        !game.seats[game.currentPlayerTurn].player ||
        game.seats[game.currentPlayerTurn].player.handCards.length === 0
      ) {
        game.currentPlayerTurn = findNextPosition(
          game.currentPlayerTurn,
          game.seats
        );
      }

      await game.save();

      console.log("Emitting next_current_player with game:", game);
      io.emit("next_current_player", game);

      console.log("About to emit player_checked with game:", game);
      io.emit("player_checked", game);
      console.log("Emitted player_checked with game:", game);
    } catch (error) {
      console.error(error);
      socket.emit("checkError", { error: "Failed to handle the check" });
    }
  });
}

function foldSocket(socket, io) {
  socket.on("fold", async (data) => {
    const { gameId, seatId } = data;

    try {
      const game = await Game.findById(gameId);

      if (!game) {
        return socket.emit("error", { message: "Game not found!" });
      }

      const seat = game.seats.find((s) => s._id.toString() === seatId);

      if (!seat) {
        return socket.emit("error", { message: "Seat not found!" });
      }

      if (!seat.player) {
        return socket.emit("error", { message: "No Player At Seat" });
      }

      seat.player.handCards = [];
      seat.player.action = "fold";
      seat.player.checkBetFold = true;

      await game.save();

      if (playersHaveActed(game)) {
        proceedToNextStage(game);
        await game.save();
      }

      game.currentPlayerTurn = findNextPosition(
        game.currentPlayerTurn,
        game.seats
      );

      while (
        !game.seats[game.currentPlayerTurn].player ||
        game.seats[game.currentPlayerTurn].player.handCards.length === 0
      ) {
        game.currentPlayerTurn = findNextPosition(
          game.currentPlayerTurn,
          game.seats
        );
      }

      await game.save();

      io.emit("next_current_player", game);

      io.emit("player_folded", game);
    } catch (error) {
      console.error(error);
      socket.emit("foldError", { error: "Failed to handle the fold" });
    }
  });
}

module.exports = {
  playerToPotSocket,
  playerBetSocket,
  checkSocket,
  foldSocket,
};
