function dealToPlayersSocket(socket, io) {
  socket.on("deal_cards", async (data) => {
    const { gameId } = data;

    try {
      const game = await Game.findById(gameId);

      if (!game) {
        return socket.emit("dealCardsError", { message: "Game not found!" });
      }

      const seatsWithPlayers = game.seats.filter(
        (seat) => seat.player !== null
      );
      const numberOfPlayers = seatsWithPlayers.length;

      if (numberOfPlayers * 2 > game.currentDeck.length) {
        return socket.emit("dealCardsError", {
          message: "Not enough cards to deal!",
        });
      }

      game.seats.forEach((seat) => {
        if (seat.player) {
          seat.player.handCards = [];
          seat.player.checkBetFold = false;
        }
      });

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < numberOfPlayers; j++) {
          const playerIndex = (game.bigBlindPosition + 1 + j) % numberOfPlayers;
          const seat = seatsWithPlayers[playerIndex];
          const card = game.currentDeck.shift();
          seat.player.handCards.push(card.code);
        }
      }

      await game.save();
      socket.emit("cards_dealt", game);
    } catch (error) {
      console.error(error);
      socket.emit("dealCardsError", { error: "Failed to deal cards" });
    }
  });
}

module.exports = dealToPlayersSocket;
