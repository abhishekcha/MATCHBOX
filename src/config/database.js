const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    // cluster
    "mongodb+srv://abhishek0221997:yMH2tZpi4Z9a8rWd@abhihacked.6gsw3nh.mongodb.net/matchBox"
  );
};
module.exports = {
  connectDB,
};

