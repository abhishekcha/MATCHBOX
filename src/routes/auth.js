const express=require("express");
const authRouter=express.Router();

const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");


authRouter.post("/signUp",async(req,res)=>{
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
    await user.save(); // save the document to the database
    res.send("data added successfully!");
  } catch (err) {
    res.status(400).send(" Error while saving data:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }
    const isPasswordMatch = await user.validatePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid Credentials");
    } else {
      // create jwt token and send it to the client(user)
      const token = await user.getJWT();
      //console.log(token);
      // create jwt token and send it to the client(user)
      res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000),});
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send(" Error while login:" + err.message);
  }
});

module.exports=authRouter;