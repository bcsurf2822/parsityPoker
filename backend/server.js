const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});