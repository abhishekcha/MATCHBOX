const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName age gender";
// get all the pending connection requests for logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInuser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName", "age", "gender"]);
    res.json({
      message: "Connection Requests fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    req.status(400).send("ERROR:" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    });
 
    res.json({ data });
  } catch (err) {
    req.status(400).send("ERROR:" + err.message);
  }
});
module.exports = userRouter;
