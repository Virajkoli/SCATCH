const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const { urlencoded } = require("body-parser");

app.use(express.json());
app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));
app.use(cookieParser);
app.set(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hey");
});

app.listen(3000);
