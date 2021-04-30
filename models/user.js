const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userid: String,
    userData: Object,
    levelData: Object,
    dataversion: Number,
    ships: Array
});

module.exports = mongoose.model("User", userSchema, "userdata")