const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

authRouter.post("/signUp", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); // create a new User document from request body
    const savedUser = await user.save(); // save the document to the database
    const token = await savedUser.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
    res.json({ message: "data added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send(" Error while saving data:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successfully!");
});

module.exports = authRouter;
