const mongoose = require("mongoose");
const { environment } = require("../config");
const env = environment();
const database = () => {
  mongoose
    .connect(`mongodb://${env.db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("database connection success"))
    .catch(() => console.log("database connection failed"));
};

module.exports = database;