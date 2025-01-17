const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("index", { error, success, loggedIn: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    // Fetch products from the database (adjust query as necessary)
    const products = await productModel.find();

    // Pass the products to the template
    let success = req.flash("success");
    res.render("shop", { products, success });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  res.render("cart", { user });
});

router.get("/addToCart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

router.get("/myAccount", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  res.render("profile", { user });
});

module.exports = router;
