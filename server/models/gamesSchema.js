const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CardSchema = new Schema({
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
  checkBetFold: {
    type: Boolean,
    default: false,
  }
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
    default: -1,
  },
  smallBlindPosition: {
    type: Number,
    default: -1,
  },
  bigBlindPosition: {
    type: Number,
    default: -1,
  },
  currentPlayerTurn: {
    type: Number,
    default: -1,  
  },
  gameRunning: {
    type: Boolean,
    default: false,
  },
  stage: {
    type: String,
    enum: ['preflop',  'flop', 'turn', 'river', 'showdown'],
    default: 'preflop',
},
  gameEnd: {
    type: Boolean,
    default: false,
  },
  currentDeck: {
    type: [CardSchema],
    default: [],
  },
  communityCards: {
    type: [String],
    default: [],
  },
  dealtCards: {
    type: [String],
    default: [],
  },
  winnerData: {
    type: Schema.Types.Mixed, 
    default: {},
},
  seats: {
    type: [SeatSchema],
    default: Array.from({ length: 6 }, (_, i) => ({ id: i + 1, player: null })),
  },

});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
