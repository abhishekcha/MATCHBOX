const express = require("express");

const app = express(); // create web server
const {adminAuth}=require("./middlewares/auth");
app.use("/admin",adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All the data from admin--");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user--");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
