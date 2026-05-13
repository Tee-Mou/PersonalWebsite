const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    _id: String, 
    name: String, 
    statistics: {
        cashout: Number,
        sessionsPlayed: Number,
        cashoutPerSession: Number,
        cashoutDeviation: Number,
        hoursPlayed: Number,
        cashoutPerHour: Number,
        bestSessionDate: String,
        bestSessionCashout: Number,
        worstSessionDate: String,
        worstSessionCashout: Number,
        lastPlayed: String,
    },
})

module.exports = mongoose.model("Player", playerSchema);