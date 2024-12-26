const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey from owners routers");
});

module.exports = router;
