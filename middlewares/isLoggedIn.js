const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  if (!req.cookies || !req.cookies.token) {
    req.flash("Please log in first !");
    res.redirect("/");
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    if (!user) {
      req.flash("error", "User not found!");
      return res.redirect("/");
    }
    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};

module.exports = isLoggedIn;
