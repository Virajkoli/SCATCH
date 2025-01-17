const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");
const flash = require("connect-flash");

const registerUser = async (req, res, next) => {
  try {
    let { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      req.flash("error", "Please provide all fields!");
      return res.redirect("/"); // This should work properly with flash
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash("error", "You already have an account. Please log in!");
      return res.redirect("/"); // Flash message should be visible now
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        req.flash("error", "An error occurred. Please try again.");
        return res.redirect("/"); // This should set the flash message before redirect
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          req.flash("error", "An error occurred. Please try again.");
          return res.redirect("/"); // This should also work here
        }
        let user = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        req.flash("success", "User created successfully. Please log in!");
        return res.redirect("/"); // Success flash message will be set here
      });
    });
  } catch (err) {
    req.flash("error", "An error occurred. Please try again.");
    return res.redirect("/"); // This will show flash messages on error
  }
};
module.exports.registerUser = registerUser;

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) return res.send("Please provide both the fields!");

  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "You don't have an account, please create one!");
    return res.redirect("/"); // Flash message here
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) return res.send(err.message);
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      req.flash("success", "Login successful!");
      res.redirect("/shop");
    } else {
      req.flash("error", "Email or password is incorrect!");
      return res.redirect("/"); // Show flash message on incorrect credentials
    }
  });
};
module.exports.loginUser = loginUser;

const logout = (req, res) => {
  res.cookie("token", "");
  req.flash("success", "You have successfully logged out.");
  res.redirect("/");
};
module.exports.logout = logout;
