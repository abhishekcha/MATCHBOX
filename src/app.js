const express = require("express");
const app = express(); // create web server


// this will match only get http method to /user
app.get("/abc", (req, res) => {
  res.send({ name: "abhishek", age: 22, city: "delhi" });
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
