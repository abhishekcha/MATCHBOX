
const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName age gender bio photoUrl";
const { User } = require("../models/user");
// get all the pending connection requests for logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInuser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);
    res.status(200).json({
      success: true,
      message: "Connection Requests fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "ERROR:" + err.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  // give all accepted connection requests for the logged in user
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

    const data = connectionRequests
      .map((row) => {
      if (!row.fromUserId || !row.toUserId) {
        return null;
      }
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
      })
      .filter(Boolean);

    res.set("X-Total-Connections", String(data.length));
    res.set("X-Response-Message", "Connections fetched successfully");

    res.status(200).json({
      success: true,
      message: "Connections fetched successfully",
      totalConnections: data.length,
      data: data,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: "ERROR:" + err.message });
  }
});
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page= parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const connectionRequests = await connectionRequest
      .find({
        // not same as video of namaste dev
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId ");
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    //console.log(hideUsersFromFeed);
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    res.send(users);
    //res.json({ data: connectionRequests });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
