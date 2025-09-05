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

// API
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send(" Error while fetching data:" + err.message);
  }
});

// feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // fetch all users from the database
    res.send(users);
  } catch {
    res.status(400).send(" Error while fetching data:" + err.message);
  }
});

// delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send(" Error while deleting user:" + err.message);
  }
});

// update a user in the database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      return res.status(400).send("Invalid updates!");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send(" Error while updating user:" + err.message);
  }
});