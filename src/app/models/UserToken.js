const mongoose = require("mongoose");
const schema = require("../../database/schema/UserToken");
const UserToken = new mongoose.model("UserToken", schema);

module.exports = UserToken;
