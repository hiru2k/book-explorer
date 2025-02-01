const Books = require("../models/bookModel");
const Users = require("../models/userModel");
const Genre = require("../models/genreModel");
const { validateAuthorAndGenre } = require("../utils/validation");
const { handleErrors } = require("../utils/errorHandler");
const APIfeatures = require("../utils/apiFeatures");

const bookCtrl = {
  getBooks: async (req, res) => {
    try {
      let query = Books.find();

      // If an author query param is provided, filter by author
      if (req.query.author) {
        query = query.where("author").equals(req.query.author);
      }

      const features = new APIfeatures(query, req.query).filtering();

      const books = await features.query
        .populate("author", "name email") // Populate author details
        .populate("genre", "name");

      return res.json({
        status: "success",
        result: books.length,
        books,
      });
    } catch (err) {
      handleErrors(res, err);
    }
  },

  createBook: async (req, res) => {
    try {
      const { book_id, title, author, description, genre } = req.body;

      const book = await Books.findOne({ book_id });

      if (book) return handleErrors(res, "This book already exists", 400);

      const errors = await validateAuthorAndGenre(author, genre);
      if (errors.length) return handleErrors(res, errors.join(", "), 400);

      const newBook = new Books({
        book_id,
        title: title.toLowerCase(),
        author,
        description,
        genre,
      });

      await newBook.save();
      return res.json({ msg: "Book is published successfully" });
    } catch (err) {
      handleErrors(res, err);
    }
  },

  deleteBook: async (req, res) => {
    try {
      const book = await Books.findById(req.params.id);
      if (!book) return handleErrors(res, "Book not found", 404);

      await book.deleteOne();

      res.json({ msg: "Book is deleted successfully" });
    } catch (err) {
      handleErrors(res, err);
    }
  },

  updateBook: async (req, res) => {
    try {
      const { title, author, description, genre } = req.body;

      // Validate author and genre IDs before updating
      const errors = await validateAuthorAndGenre(author, genre);
      if (errors.length) return handleErrors(res, errors.join(", "), 400);

      const updatedBook = await Books.findByIdAndUpdate(
        req.params.id,
        {
          title: title.toLowerCase(),
          description,
          genre,
        },
        { new: true }
      );
      if (!updatedBook) return handleErrors(res, "Book not found", 404);
      return res.json({
        msg: "Book is updated successfully",
        book: updatedBook,
      });
    } catch (err) {
      handleErrors(res, err);
    }
  },
};

module.exports = bookCtrl;
