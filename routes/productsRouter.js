const express = require("express");
const productModel = require("../models/product-model");
const router = express.Router();
const upload = require("../config/multer-config");

router.get("/", (req, res) => {
  res.send("hey from products routers");
});

router.post("/create", upload.single("image"), async (req, res) => {
  let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

  let createdProduct = await productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });

  req.flash("success", "Product created successfully.");
  res.redirect("/owners/admin");
});

module.exports = router;
