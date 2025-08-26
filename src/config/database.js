const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    // cluster
    "mongodb+srv://abhishek0221997:lCNL14542o2GTGlh@abhihacked.6gsw3nh.mongodb.net/matchBox"
  );
};
module.exports = {
  connectDB,
};


