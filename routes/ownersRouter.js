const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      const owners = await ownerModel.find();

      if (owners.length > 0) {
        return res
          .status(500)
          .send(
            "You don't have permission to create an owner, owner already exists!"
          );
      }

      let { fullname, email, password, contact } = req.body;

      if (!fullname || !email || !password || !contact) {
        return res
          .status(400)
          .send(
            "All fields (fullname, email, password, contact) are required."
          );
      }

      // Create the owner
      const createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
        contact,
      });

      return res.status(201).send(createdOwner);
    } catch (error) {
      console.error("Error creating owner:", error);
      return res
        .status(500)
        .send("An error occurred while creating the owner.");
    }
  });
}

router.get("/", (req, res) => {
  res.send("hey from owners routers");
});

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createProducts", { success });
});

module.exports = router;
