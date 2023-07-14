const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PlayerSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  chips: {type: Number, required: true},
  handCards: {
    type: [Number],
    validate: [arrayLimit, "{PATH} exceeds the limit of 2 cards"],
  },
  bet: {type: Number, required: true},
});

function arrayLimit(val) {
  return val.length <= 2;
};

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gameType: {
    type: String,
    required: true,
  },
  blinds: {
    type: String,
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
  },
  playersInGame: [PlayerSchema],
  communityCards: [Number],
  pot: Number,
  deck: {
    type: ObjectId,
    ref: 'Deck',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;