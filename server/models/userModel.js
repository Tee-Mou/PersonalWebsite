const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: String,
    pass: String,
    perms: Number,
});

module.exports = mongoose.model("User", userSchema);