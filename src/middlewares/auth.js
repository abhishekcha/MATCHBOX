const adminAuth = (req, res, next) => {
  console.log("admin auth is getting executed");
  const token = "xyz";
  const isAdminAuthrized = token === "xyz";
  if (!isAdminAuthrized) {
    res.status(401).send("Unauthorized!");
  } else {
    next();
  }
};
module.exports={
    adminAuth,
}
