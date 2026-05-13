const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Player = require("./playerModel");

const sessionSchema = new Schema({
    _id: String,
    date: String,
    players: [{Player, cashout: Number}],
});

module.exports = mongoose.model("Session", sessionSchema);