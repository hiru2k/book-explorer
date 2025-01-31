const Books = require("../models/bookModel");
const Users = require("../models/userModel");
const Genre = require("../models/genreModel");

//sort, filtering, paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const bookCtrl = {
  getBooks: async (req, res) => {
    try {
      let query = Books.find();

      // If an author query param is provided, filter by author
      if (req.query.author) {
        query = query.where("author").equals(req.query.author);
      }

      const features = new APIfeatures(query, req.query)
        .filtering()
        .sorting()
        .paginating();

      const books = await features.query
        .populate("author", "name email") // Populate author details
        .populate("genre", "name");

      return res.json({
        status: "success",
        result: books.length,
        books,
      });
    } catch (err) {
      //   console.error("Error in getBooks:", err);
      return res.status(500).json({ msg: err.message });
    }
  },

  createBook: async (req, res) => {
    try {
      const { book_id, title, author, description, genre } = req.body;

      const book = await Books.findOne({ book_id });

      if (book)
        return res.status(400).json({ msg: "This book already exists" });

      // Check if the author (user) and genre exist
      const user = await Users.findById(author);
      if (!user) return res.status(400).json({ msg: "Author not found" });

      const cat = await Genre.findById(genre);
      if (!cat) return res.status(400).json({ msg: "Genre not found" });

      const newBook = new Books({
        book_id,
        title: title.toLowerCase(),
        author,
        description,
        genre,
      });

      await newBook.save();
      return res.json({ msg: "Created the Book" });
    } catch (err) {
      // console.error("Error in getBooks:", err);
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const book = await Books.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });
      }

      await book.deleteOne();

      res.json({ msg: "Deleted the Book" });
    } catch (err) {
      // console.error("Error in deleteBook:", err);
      return res.status(500).json({ msg: err.message });
    }
  },

  updateBook: async (req, res) => {
    try {
      const { title, author, description, genre } = req.body;

      // Validate author and genre IDs before updating
      if (author) {
        const user = await Users.findById(author);
        if (!user) return res.status(400).json({ msg: "Author not found" });
      }

      if (genre) {
        const cat = await Genre.findById(genre);
        if (!cat) return res.status(400).json({ msg: "Genre not found" });
      }

      const updatedBook = await Books.findByIdAndUpdate(
        req.params.id,
        {
          title: title.toLowerCase(),

          description,
          genre,
        },
        { new: true }
      );

      return res.json({ msg: "Updated the Book", book: updatedBook });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = bookCtrl;
