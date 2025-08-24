const express = require("express");

const app = express(); // create web server

app.use("/user", (req, res,next) => {
  // route handler
  console.log("handling /user route");
  res.send("User route1");
  next();
},(req,res) => {
    console.log("handling /user route");
    res.send("User route2");
  });
  

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
