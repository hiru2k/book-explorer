require("dotenv").config();
const mongoose = require("mongoose");
const Genre = require("../models/genreModel");

const connectDB = async () => {
  if (process.env.NODE_ENV !== "test") {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
      await seedGenres();
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  } else {
    console.log("Skipping MongoDB connection in test environment.");
  }
};

// Function to create default genres
const seedGenres = async () => {
  const existingGenres = await Genre.countDocuments();
  if (existingGenres === 0) {
    const defaultGenres = [
      { name: "Fiction" },
      { name: "Non-Fiction" },
      { name: "Science" },
      { name: "History" },
    ];

    await Genre.insertMany(defaultGenres);
    console.log("Default genres added.");
  }
};

module.exports = { connectDB };
