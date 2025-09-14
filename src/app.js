const express = require("express");
const { connectDB } = require("./config/database");
const app = express(); // create web server
const cookieParser = require("cookie-parser");
app.use(express.json()); // middleware to parse JSON request body
app.use(cookieParser()); // middleware to parse cookies

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
