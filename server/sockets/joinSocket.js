const Game = require("../models/gamesSchema");
const User = require("../models/userSchema");

const isSeatAvailable = (seats, seatId) => {
  return seats.some(seat => seat._id.toString() === seatId && !seat.player);
}

function joinSocket(socket, io) {
  socket.on('joinGame', async (data) => {
  try {
    const { userId, gameId, seatId, buyIn } = data;

    const game = await Game.findById(gameId);
    if (!game) {
      return socket.emit("joinGameError", { message: "Game not found!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return socket.emit("joinGameError", { message: "User not found!" });
    }

    if (buyIn < game.min || buyIn > game.max || !buyIn || typeof buyIn !== "number") {
      return socket.emit("joinGameError", { message: `Invalid buy-in. Buy-in should be between ${game.min} and ${game.max}.` });
    }

    if (user.accountBalance < buyIn) {
      return socket.emit("joinGameError", { message: "Insufficient funds!" });
    }

    if (game.seats.some(seat => seat.player && seat.player.user.toString() === userId)) {
      return socket.emit("joinGameError", { message: "You are already sitting at a seat in this game!" });
    }

    if (!isSeatAvailable(game.seats, seatId)) {
      return socket.emit("joinGameError", { message: "Seat not available or does not exist!" });
    }

    user.accountBalance -= buyIn;
    const player = {
      user: user._id,
      username: user.username,
      chips: buyIn,
      handCards: [],
      bet: 0
    };
    game.seats.find(seat => seat._id.toString() === seatId).player = player;

    await game.save();
    await user.save();
    

io.emit("playerJoin", {
      gameId,
      player,
      seatId
    });

    socket.emit("gameJoined", { message: "Successfully joined the game!", game });

  } catch (err) {
    console.error(err);
    socket.emit("joinGameError", { message: err.message });
  }
})
};

module.exports = joinSocket;

