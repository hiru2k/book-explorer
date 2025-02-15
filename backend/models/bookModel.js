const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    book_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "Users",
      required: true,
      immutable: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Genre model
      ref: "Genre",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
bookSchema.index({ author: 1 }); // Index for author
bookSchema.index({ genre: 1 }); // Index for genre

module.exports = mongoose.model("Book", bookSchema);
