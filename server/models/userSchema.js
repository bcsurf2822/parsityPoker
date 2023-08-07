const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
  bankBalance: { type: Number, default: 10000 },
  avatar: {
    type: String,
    default: "http://localhost:4000/defaultUser.png",
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
