const express = require("express");
const { connectDB } = require("./config/database");
const app = express(); // create web server
const { User } = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json()); // middleware to parse JSON request body
app.use(cookieParser()); // middleware to parse cookies

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid Credentials");
    } else {
      // create jwt token and send it to the client(user)
      const token = jwt.sign({ _id: user._id }, "ABHI@1234",{ expiresIn: '10 d'});
      //console.log(token);

      // create jwt token and send it to the client(user)
      res.cookie("token", token);

      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send(" Error while login:" + err.message);
  }
});

app.get("/profile", userAuth ,async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(" Error while fetching profile data:" + err.message);
  }
});

app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
  const user=req.user;
  console.log("sending connection request");
  res.send(user.firstName + " send the connection request");
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
