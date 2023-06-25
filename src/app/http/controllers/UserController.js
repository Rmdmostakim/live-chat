const UserModel = require("../../models/User");
const TokenModel = require("../../models/UserToken");
const Request = require("../validators/Request");
const { encode } = require("../services/Token");
const bcrypt = require("bcrypt");

const controller = {};

controller.store = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    await UserModel.create({ name, phone, password });
    res.status(200).json({
      message: "user store successfully",
    });
  } catch (error) {
    Request(error, res);
  }
};

controller.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await UserModel.findOne({ phone });
    if (!user) {
      return res.status(422).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    const token = encode({
      phone: user.phone,
      name: user.name,
      id: user.id,
      expired: new Date().setDate(new Date().getDate() + 30),
    });
    await TokenModel.deleteMany({ user: user.id });
    await TokenModel.create({
      user: user.id,
      token,
    });
    res.status(201).json({
      token,
    });
  } catch (error) {
    console.log(error);
    Request(error, res);
  }
};

module.exports = controller;
