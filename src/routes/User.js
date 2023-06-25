const express = require("express");
const User = express.Router();
const controller = require("../app/http/controllers/UserController");
const Auth = require("../app/http/middlewares/AuthMiddleware");

// user routes
User.post("/store", controller.store);
User.post("/login", controller.login);
module.exports = User;
