const io = require('socket.io-client');
const socket = io('http://localhost:4000');


socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('joinGame', {
    userId: '6490c5afab7a873674700586',
    gameId: '64f7613d2c863b2118c8ab2e',
    seatId: '64f7613d2c863b2118c8ab2f',
    buyIn: 200
  });
});

socket.on('joinGameError', (data) => {
  console.log('Join Game Error:', data.message);
});

socket.on('playerJoin', (data) => {
  console.log('Player Joined:', data);
});

socket.on('gameJoined', (data) => {
  console.log('Game Joined:', data.message);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});