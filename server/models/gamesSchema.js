const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CardApiSchema = new Schema({
  value: String,
  suit: String,
  code: String,
});

const PlayerSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  chips: { type: Number, required: true },
  handCards: {
    type: [String],
    default: [],
  },
  bet: { type: Number, required: true },
});

const SeatSchema = new Schema({
  id: { type: Number, required: true },
  player: {
    type: PlayerSchema,
    default: null,
  },
});

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
  pot: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  dealerPosition: {
    type: Number,
    default: 0,
  },
  smallBlindPosition: {
    type: Number,
    default: 1,
  },
  bigBlindPosition: {
    type: Number,
    default: 2,
  },
  currentGameCards: {
    type: [CardApiSchema],
    default: [],
  },
  communityCards: {
    type: [CardApiSchema],
    default: [],
  },
  dealtCards: {
    type: [String],
    default: [],
  },
  seats: {
    type: [SeatSchema],
    default: Array.from({ length: 6 }, (_, i) => ({ id: i + 1, player: null })),
  },
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
