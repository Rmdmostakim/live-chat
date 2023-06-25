const path = require("path");
const cors = require("cors");
const express = require("express");
const database = require("../database");
const Socket = require("../app/http/services/Socket");
const { environment } = require("../config");
const env = environment();
const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/../views"));

const server = () => {
  app.listen(env.port, () => {
    console.log(`server started at port ${env.port}`);
  });
  const abc = path.join(__dirname, "/../views");
  database();
};
//routes
const Routes = require("../routes");
app.get("/", Routes.Home);
app.use("/user", Routes.User);
Socket();
module.exports = server;
