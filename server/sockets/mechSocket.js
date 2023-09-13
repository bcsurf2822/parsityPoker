const Game = require("../models/gamesSchema");
const axios = require("axios");

function cardCode(code) {
  return code.replace('0', '10');
}

const findNextPosition = (startPosition, seats) => {
  let seatCount = seats.length;
  let nextPosition = (startPosition + 1) % seatCount;
  while (!seats[nextPosition].player) {
    nextPosition = (nextPosition + 1) % seatCount;
  }
  return nextPosition;
};

function positionsAndBlindsSocket(socket, io) {
  socket.on("updatePositionsAndBlinds", async ({ gameId }) => {
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

function updateCurrentPlayerSocket(socket, io) {
  socket.on("updateCurrentPlayer", async ({ gameId }) => {
    try {
      const game = await Game.findById(gameId);

      if (!game) {
        console.error(`Game with ID: ${gameId} not found!`);
        socket.emit("error", "Game not found!");
        return;
      }

      console.log(`Updating current player for game ${gameId}`);

      game.currentPlayerTurn = findNextPosition(game.currentPlayerTurn, game.seats);

      await game.save();

      console.log(`Updated current player position for game ${gameId}. Current Turn: ${game.currentPlayerTurn}`);

      io.emit("next_current_player", game);

    } catch (error) {
      console.error(`Error updating current player for game ${gameId}:`, error);
      socket.emit("error", error.message);
    }
  });
};

function endGameSocket(socket, io) {
  socket.on("end_game", async ({ gameId }) => {
    try {
      const game = await Game.findById(gameId);

      if (!game) {
        console.error(`Game with ID: ${gameId} not found!`);
        socket.emit("error", "Game not found!");
        return;
      }

      game.currentDeck = [];
      game.communityCards = [];
      game.dealtCards = [];
      game.winnerData = [];
      game.pot = 0;
      game.stage = "preflop";
      game.gameEnd = false;
  
      game.seats.forEach((seat) => {
        if (seat.player) {
          seat.player.handCards = [];
          seat.player.checkBetFold = false; 
        }
      });
  
      // Logic to Move the blinds forward
      game.dealerPosition = findNextPosition(game.dealerPosition, game.seats);
      game.smallBlindPosition = findNextPosition(game.dealerPosition, game.seats);
      game.bigBlindPosition = findNextPosition(game.smallBlindPosition, game.seats);
      game.currentPlayerTurn = findNextPosition(game.bigBlindPosition, game.seats);
  
      const [smallBlindAmount, bigBlindAmount] = game.blinds.split("/").map(Number);
  
      // Deducting blinds from the players and adding to the pot
      if (game.seats[game.smallBlindPosition].player) {
        game.seats[game.smallBlindPosition].player.chips -= smallBlindAmount;
        game.pot += smallBlindAmount;
      }
  
      if (game.seats[game.bigBlindPosition].player) {
        game.seats[game.bigBlindPosition].player.chips -= bigBlindAmount;
        game.pot += bigBlindAmount;
      }
  
      // Fetch new deck and populate currentDeck
      const response = await axios.get("https://www.deckofcardsapi.com/api/deck/new/draw/?count=52");
  
      const currentGameCards = response.data.cards.map((card) => ({
        value: card.value,
        suit: card.suit,
        code: cardCode(card.code)
      }));
  
      game.currentDeck = currentGameCards;

      await game.save();
      io.emit("game_ended", game);

      socket.emit("game_end_success", { message: "Game ended, cards cleared" });
    } catch (error) {
      console.error(error);
      socket.emit("error", "Failed to end the game");
    }
  });
};

module.exports = {
  positionsAndBlindsSocket,
  updateCurrentPlayerSocket,
  endGameSocket
};
