require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http');
// const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); 
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.io = io; // Attach io to your app

app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = 4000;

app.use(express.static('public'))

// Middleware for parsing the request body
app.use(bodyParser.json());

app.use(cors());

mongoose.connect('mongodb://localhost:27017/pokerDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(error => console.error('Connection error', error));

const registerRoute = require('./routes/register');
app.use(registerRoute);

const loginRoute = require('./routes/login');
app.use(loginRoute);

const logoutRoute = require('./routes/logout');
app.use(logoutRoute);

const deckRoute = require("./routes/cards");
app.use(deckRoute);

const fundingRoute = require("./routes/funding")
app.use(fundingRoute);

const userInfoRoute = require("./routes/userInfo");
app.use(userInfoRoute);

const createGamesRoute = require("./routes/createGames");
app.use(createGamesRoute);

const gamesListRoute = require("./routes/gamesList");
app.use(gamesListRoute);

const joinGameRoute = require("./routes/joinGame");
app.use(joinGameRoute);

const viewGameRoute = require("./routes/viewGame");
app.use(viewGameRoute);

const updateUserRoute = require("./routes/updateUser");
app.use(updateUserRoute);

const userNameRoute = require("./routes/userNames");
app.use(userNameRoute);


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });


    socket.on('chat message', (msg) => {
        console.log(`Received message: ${msg.message}`); 
        io.emit('chat message', msg);
      });
});

server.listen(PORT, () => { // Changed from app.listen to server.listen
    console.log(`Server is running on port ${PORT}`);
});