const Game = require("../models/gamesSchema");

const findNextPosition = (startPosition, seats) => {
  let seatCount = seats.length;
  let nextPosition = (startPosition + 1) % seatCount;
  while (!seats[nextPosition].player) {
    nextPosition = (nextPosition + 1) % seatCount;
  }
  return nextPosition;
};

function positionsAndBlindsSocket(socket, io) {
  socket.on("updatePositionsAndBlinds", async (gameId) => {
    try {
      const game = await Game.findById(gameId);

      if (!game) {
        console.error(`Game with ID: ${gameId} not found!`);
        socket.emit("error", "Game not found!");
        return;
      }

      console.log(`Starting updatePostionsAndBlinds for game ${gameId}`);

      game.dealerPosition = findNextPosition(game.dealerPosition, game.seats);
      game.smallBlindPosition = findNextPosition(
        game.dealerPosition,
        game.seats
      );
      game.bigBlindPosition = findNextPosition(
        game.smallBlindPosition,
        game.seats
      );
      game.currentPlayerTurn = findNextPosition(
        game.bigBlindPosition,
        game.seats
      );

      const [smallBlindAmount, bigBlindAmount] = game.blinds
        .split("/")
        .map(Number);

      for (let seat of game.seats) {
        if (seat.player) {
          seat.player.checkBetFold = false;
        }
      }

      if (game.seats[game.smallBlindPosition].player) {
        game.seats[game.smallBlindPosition].player.chips -= smallBlindAmount;
        game.pot += smallBlindAmount;
      }

      if (game.seats[game.bigBlindPosition].player) {
        game.seats[game.bigBlindPosition].player.chips -= bigBlindAmount;
        game.pot += bigBlindAmount;
      }

      await game.save();

      console.log(`Updated positions and blinds for game ${gameId}. 
                   Dealer: ${game.dealerPosition}, 
                   Small Blind: ${game.smallBlindPosition}, 
                   Big Blind: ${game.bigBlindPosition}, 
                   Current Turn: ${game.currentPlayerTurn}`);

      io.emit("positions_and_blinds", game);
    } catch (error) {
      console.error(
        `Error updating positions and blinds for game ${gameId}:`,
        error
      );
      socket.emit("error", error.message);
    }
  });
};

module.export = positionsAndBlindsSocket;
