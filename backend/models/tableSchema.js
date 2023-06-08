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

const TableSchema = new Schema({
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

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;
