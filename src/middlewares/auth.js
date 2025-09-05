// const jwt = require("jsonwebtoken");
// const {User} = require("../models/user");
// const userAuth = async (req, res, next) => {
//   // read the token from the cookies
//   try {
//     const cookie = req.cookies.token;
//     if (!token) {
//       return res.status(401).send("Unauthorized: No token provided");
//     }
//     const decodedMessage = jwt.verify(token, "ABHI@1234");
//     const { _id } = decodedMessage;
//     const user = await User.findbyId(_id);
//     if (!user) {
//       return res.status(401).send("Unauthorized: user not found");
//     }
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).send("Unauthorized: Invalid token");
//   }
// };

// module.exports = {
//   userAuth,
// };
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }
    let decoded;
    try {
      decoded = jwt.verify(token, "ABHI@1234");
    } catch (err) {
      return res.status(401).send("Unauthorized: Invalid token");
    }
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).send("Unauthorized: User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

module.exports = { userAuth };