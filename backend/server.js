require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/user", require("./routers/userRouter"));
app.use("/api", require("./routers/genreRouter"));
app.use("/api", require("./routers/bookRouter"));

// connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process on connection failure
  }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is up and running", PORT);
});

connectDB();
