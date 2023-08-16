// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const CardSchema = new Schema({
//   suit: {
//     type: String,
//     enum: ["hearts", "diamonds", "clubs", "spades"],
//     required: true,
//   },
//   rank: {
//     type: String,
//     enum: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
//     required: true,
//   },
// });

// const DeckSchema = new Schema({
//   cards: {
//     type: [CardSchema],
//     validate: [arrayLimit, "{PATH} exceeds the limit of 52 cards"],
//   },
// });

// function arrayLimit(val) {
//   return val.length <= 52;
// }

// const Deck = mongoose.model("Deck", DeckSchema);

// module.exports = Deck;
