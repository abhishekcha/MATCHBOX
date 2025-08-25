const express = require("express");
const { connectDB } = require("./config/database");
const app = express(); // create web server
const { User } = require("./models/user");
app.use(express.json()); // middleware to parse JSON request body

app.post("/signup", async (req, res) => {
  const user = new User(req.body); // create a new User document from request body

  try {
    await user.save(); // save the document to the database
    res.send("data added successfully!");
  } catch (err) {
    res.status(400).send(" Error while saving data:" + err.message);
  }
});

// get a user by email
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
app.delete("/user",async (req,res)=>{
  const userId=req.body.userId;
  try{
    const user=await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  }catch(err){
    res.status(400).send(" Error while deleting user:" + err.message);
  }
});

// update a user in the database
app.patch("/user",async (req,res)=>{
  const userId=req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({_id:userId}, data, {
    runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send(" Error while updating user:" + err.message);
    
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
