const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { decode } = require("../services/Token");
const UserModel = require("../../models/User");
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const Socket = () => {
  io.on("connection", async (socket) => {
    const userToken = socket.handshake.auth.token;
    let userId = null;
    let activeUsers = [];
    if (userToken) {
      const decodeToken = decode(userToken);
      if (decodeToken) {
        userId = decodeToken.id;
      }
    }
    if (userId) {
      await UserModel.updateOne({ _id: userId }, { $set: { active: true } });
      activeUsers = await UserModel.find({}).select({
        createdAt: 0,
        updatedAt: 0,
        password: 0,
        phone: 0,
      });
      console.log("a user connected");
    }
    //emit event
    socket.broadcast.emit("getActiveUsers", { users: activeUsers });

    socket.on("disconnect", async () => {
      await UserModel.updateOne({ _id: userId }, { $set: { active: false } });
      activeUsers = await UserModel.find({}).select({
        createdAt: 0,
        updatedAt: 0,
        password: 0,
        phone: 0,
      });
      socket.broadcast.emit("getActiveUsers", { users: activeUsers });
      console.log("a user disconnected");
    });
  });

  server.listen(3001, () => {
    console.log("socket listening on 3001");
  });
};

module.exports = Socket;
