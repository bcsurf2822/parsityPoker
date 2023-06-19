const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GamesSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  blinds: {
    type: String,
    required: true,
  },
  players: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  handsHr: {
    type: Number,
    required: true,
  }
});

const Games = mongoose.model("Games", GamesSchema);
module.exports = Games;
