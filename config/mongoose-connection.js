const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/scatch")
  .then(function (connection) {
    console.log("connection established");
  })
  .catch(function (error) {
    console.log(error.message);
  });

module.exports = mongoose.connection;
