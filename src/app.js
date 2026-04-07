const express = require("express");
const { connectDB } = require("./config/database");
const app = express(); // create web server
const cookieParser = require("cookie-parser");
const cors = require('cors')

const corsOptions = {
  origin: "http://localhost:5173", // set your frontend origin
  credentials: true,
};
app.use(cors(corsOptions));


app.use(express.json()); // middleware to parse JSON request body
app.use(cookieParser()); // middleware to parse cookies

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter  = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
