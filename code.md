const express = require("express");
const app = express(); // create web server
// request handler
// app.use("/hello/2",(req,res)=>{
//     res.send("system hacked!! warning!!!");
// });
// app.use("/hello",(req,res)=>{
//     res.send("Hello mr. hacker");
// });/

// this will match only get http method to /user
app.get("/user", (req, res) => {
  res.send({ name: "abhishek", age: 22, city: "delhi" });
});

app.post("/user", (req, res) => {
  res.send("data successfully saved");
});

app.delete("/user", (req, res) => {
  res.send("data successfully deleted");
});

// this will match all the  http methods to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

// app.use("/",(req,res)=>{
//     res.send("hello abhishek");
// });

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
//////////////////////////////////////////////////

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