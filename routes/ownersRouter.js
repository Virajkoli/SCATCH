const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
  res.send("hey from owners routers");
});

if (process.env.NODE_ENV === "development") {
  router.get("/create", (req, res) => {
    res.send("Heyyy fron Owners create route");
  });
}

module.exports = router;
