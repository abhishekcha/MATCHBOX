const express = require("express");
const { connectDB } = require("./config/database");
const app = express(); // create web server
const { User } = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "sweta",
    lastName: "singh",
    emailId: "sweta@gmail.com",
    password: "sweta@1234",
  }); // new user document based on user model

  try {
    await user.save(); // save the document to the database
    res.send("data added successfully!");
  } catch (err) {
    res.status(400).send(" Error while saving data:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
  });
