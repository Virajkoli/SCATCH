const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`) //Replaces .env mongodb connection
  .then(function (connection) {
    dbgr("connection established");
  })
  .catch(function (error) {
    dbgr(error.message);
  });

module.exports = mongoose.connection;
