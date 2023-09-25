require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);
const setupSockets = require("./sockets");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.io = io;
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = 4000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/pokerDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));

const registerRoute = require("./routes/register");
app.use(registerRoute);

const loginRoute = require("./routes/login");
app.use(loginRoute);

const logoutRoute = require("./routes/logout");
app.use(logoutRoute);

const deckofcardsapiRoute = require("./routes/deckOfCardsAPI");
app.use(deckofcardsapiRoute);

const pokerApiRoute = require("./routes/winning");
app.use(pokerApiRoute);

const fundingRoute = require("./routes/funding");
app.use(fundingRoute);

const userInfoRoute = require("./routes/userInfo");
app.use(userInfoRoute);

const createGamesRoute = require("./routes/createGames");
app.use(createGamesRoute);

const userNameRoute = require("./routes/userNames");
app.use(userNameRoute);

setupSockets(io);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
