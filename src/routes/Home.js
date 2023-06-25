const express = require("express");
const Home = express.Router();
const controller = require("../app/http/controllers/HomeController");
const Auth = require("../app/http/middlewares/AuthMiddleware");

// user routes
Home.get("/", Auth, controller.index);
module.exports = Home;
