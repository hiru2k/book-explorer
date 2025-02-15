const Books = require("../models/bookModel");
const { validateAuthorAndGenre } = require("../utils/validation");
const { handleErrors } = require("../utils/errorHandler");

async function getBooks(req, res) {
  try {
    let query = Books.find();

    if (req.query.author) {
      query = query.where("author").equals(req.query.author);
    }

    if (req.query.genre) {
      query = query.where("genre").equals(req.query.genre);
    }

    const books = await query
      .populate("author", "name email")
      .populate("genre", "name");

    return res.json({
      status: "success",
      result: books.length,
      books,
    });
  } catch (err) {
    handleErrors(res, err);
  }
}

async function createBook(req, res) {
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
}

async function deleteBook(req, res) {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) return handleErrors(res, "Book not found", 404);

    await book.deleteOne();
    res.json({ msg: "Book is deleted successfully" });
  } catch (err) {
    handleErrors(res, err);
  }
}

async function updateBook(req, res) {
  try {
    const { title, author, description, genre } = req.body;

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
}

module.exports = {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
};
