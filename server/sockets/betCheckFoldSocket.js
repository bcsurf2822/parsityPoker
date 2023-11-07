const Game = require("../models/gamesSchema");

function playersHaveActed(game, currentSeatId, currentAction) {
  // If the current action is a raise, then we must check that all players have either called, folded, or are all-in.
  if (currentAction === 'raise') {
    return game.seats.every((seat) => {
      return (
        !seat.player ||
        seat._id.toString() === currentSeatId ||
        seat.player.action === 'fold' ||
        seat.player.action === 'all-in' ||
        (seat.player.bet >= game.highestBet && seat.player.checkBetFold)
      );
    });
  } else {
    // Original logic for non-raise actions
    return game.seats.every((seat) => {
      return (
        !seat.player ||
        seat._id.toString() === currentSeatId ||
        seat.player.checkBetFold
      );
    });
  }
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

  game.highestBet = 0;
}

//Bet and All in
function playerBetSocket(socket, io) {
  socket.on("player_bet", async (data) => {
    const { gameId, seatId, bet, action } = data;
    let betAmount;

    console.log("Received player_bet or all_in data:", data);

    try {
      const game = await Game.findById(gameId);

      if (!game) {
        return socket.emit("error", { message: "Game not found!" });
      }

      const seat = game.seats.find((s) => s._id.toString() === seatId);
      if (!seat || !seat.player) {
        return socket.emit("error", { message: "No Player at this Seat" });
      }

      betAmount = Number(bet);
      if (!betAmount || isNaN(betAmount) || seat.player.chips < betAmount && action !== "all-in") {
        return socket.emit("error", { message: "Invalid Bet or Not Enough Chips" });
      }

      switch (action) {
        case "all-in":
          betAmount = seat.player.chips; // all-in could be a bet or a call depending on the amount
          // No break here since all-in needs to set game.highestBet if it's higher than the current highest bet
        case "bet":
          // for both bet and all-in, set the highestBet if it's higher than the current highest bet
          if (betAmount > game.highestBet) {
            game.highestBet = betAmount;
          }
          break;
        case "raise":
          if (betAmount <= game.highestBet) {
            return socket.emit("error", { message: "Raise must be higher than the current highest bet" });
          }
          game.highestBet = betAmount;
          game.seats.forEach((s) => {
            if (s.player && s._id.toString() !== seatId) {
              s.player.checkBetFold = false; // Only reset for other players on a raise
            }
          });
          break;
        default:
          return socket.emit("error", { message: "Invalid Action" });
      }

      seat.player.chips -= betAmount;
      game.pot += betAmount;
      seat.player.bet += betAmount;
      seat.player.action = action;
      seat.player.checkBetFold = true;
      game.betPlaced = true;

      await game.save();

      if (playersHaveActed(game, seatId, action)) {
        proceedToNextStage(game);
        await game.save();
      } else {
        game.currentPlayerTurn = findNextPosition(game.currentPlayerTurn, game.seats);
      }

      await game.save();

      io.emit("next_current_player", game);
      io.emit(action === "raise" ? "player_raised_bet" : "player_bet_placed", game);
    } catch (error) {
      console.error(error);
      socket.emit("playerBetError", { error: "Failed to place bet" });
    }
  });
}

//call socket

function callSocket(socket, io) {
  socket.on("player_call", async (data) => {
    const { gameId, seatId } = data;

    console.log("Received player_call data:", data);

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

      const callAmount = game.highestBet - seat.player.bet;

      if (seat.player.chips < callAmount) {
        return socket.emit("error", { message: "Not Enough Chips to Call" });
      }

      seat.player.chips -= callAmount;
      game.pot += callAmount;
      seat.player.bet += callAmount;
      seat.player.action = "call";
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

      io.emit("player_called_bet", game);
    } catch (error) {
      console.error(error);
      socket.emit("playerCallError", { error: "Failed to call bet" });
    }
  });
}

// Raise Socket

// function raiseSocket(socket, io) {
//   socket.on("player_raise", async (data) => {
//     const { gameId, seatId, bet, action } = data; // Include action in the destructured data

//     console.log("Received player_raise data:", data);

//     try {
//       const game = await Game.findById(gameId);

//            if (!game) {
//         return socket.emit("error", { message: "Game not found!" });
//       }

//       const seat = game.seats.find((s) => s._id.toString() === seatId);

//       if (!seat) {
//         return socket.emit("error", { message: "Seat not Found!" });
//       }

//       if (!seat.player) {
//         return socket.emit("error", { message: "No Player at this Seat" });
//       }

//       const raiseAmount = Number(bet); // Assuming bet is the additional amount the player wants to raise by

//       if (action !== "raise") {
//         return socket.emit("error", { message: "Invalid Action" });
//       }

//       if (!raiseAmount || isNaN(raiseAmount) || raiseAmount <= game.highestBet) {
//         return socket.emit("error", { message: "Invalid raise amount" });
//       }

//       if (seat.player.chips < raiseAmount) {
//         return socket.emit("error", { message: "Not Enough Chips to Raise" });
//       }
      
//       const additionalBet = raiseAmount - seat.player.bet; // Fixed variable name here
//       seat.player.chips -= additionalBet;
//       game.pot += additionalBet;
//       seat.player.bet += additionalBet; // Fixed variable name here and adjusted logic
//       seat.player.action = "raise";
//       game.highestBet += raiseAmount; // Assuming this should be the new highest bet
//       game.seats.forEach((s) => {
//         if (s.player && s._id.toString() !== seatId) {
//           s.player.checkBetFold = false;
//         }
//       });
//       await game.save();


//       game.currentPlayerTurn = findNextPosition(seatId, game.seats);
//       await game.save();

//       io.emit("player_raised_bet", game);


//       io.emit("next_current_player", {
//         currentPlayerTurn: game.currentPlayerTurn,
//         highestBet: game.highestBet,
//       });
//     } catch (error) {
//       console.error(error);
//       socket.emit("playerRaiseError", { error: "Failed to raise bet" });
//     }
//   });
// }

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
  playerBetSocket,
  callSocket,
  checkSocket,
  foldSocket,
  // raiseSocket,
};
