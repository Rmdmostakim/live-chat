const mongoose = require("mongoose");
const schema = require("../../database/schema/User");
const User = new mongoose.model("User", schema);

module.exports = User;
