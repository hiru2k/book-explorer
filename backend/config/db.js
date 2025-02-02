require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  if (process.env.NODE_ENV !== "test") {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  } else {
    console.log("Skipping MongoDB connection in test environment.");
  }
};

module.exports = { connectDB };
