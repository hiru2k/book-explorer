const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const Users = require("../../models/userModel");
const Genre = require("../../models/genreModel");
const Books = require("../../models/bookModel");
const jwt = require("jsonwebtoken");

let authorId;
let genreId;
//Generate a mock token
const validToken = jwt.sign(
  { id: "valid-user-id" },
  process.env.ACCESS_TOKEN_SECRET
);

beforeAll(async () => {
  let user = await Users.findOne({ email: "test@example.com" });
  if (!user) {
    user = await Users.create({
      name: "Test Author",
      email: "test@example.com",
      password: "password123",
    });
  }
  authorId = user._id;

  // Ensure a unique book_id using a timestamp or random string
  const bookId = `book-${Date.now()}`;

  let genre = await Genre.findOne({ name: "Fiction" });
  if (!genre) {
    genre = await Genre.create({ name: "Fiction" });
  }
  genreId = genre._id;

  await Books.create({
    book_id: bookId,
    title: "Test Book",
    author: authorId,
    description: "A book about testing",
    genre: genreId,
  });
});

describe("Book API", () => {
  it("should return all books", async () => {
    const res = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${validToken}`);

    expect(res.status).toBe(200);
    expect(res.body.books).toBeInstanceOf(Array);
    expect(res.body.books.length).toBeGreaterThan(0);
    expect(res.body.books[0].author.name).toBe("Test Author");
    expect(res.body.books[0].genre.name).toBe("Fiction");
  });

  describe("POST /books", () => {
    it("should create a new book", async () => {
      const newBook = {
        book_id: `book_${Date.now()}`,
        title: "New Test Book",
        author: authorId,
        description: "New Test Description",
        genre: genreId,
      };

      const res = await request(app)
        .post("/api/books")
        .set("Authorization", `Bearer ${validToken}`)
        .send(newBook);

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Book is published successfully");

      const book = await Books.findOne({ book_id: newBook.book_id });
      expect(book).not.toBeNull();

      expect(book.title.toLowerCase()).toBe(newBook.title.toLowerCase());
    });

    it("should return an error if the book already exists", async () => {
      const newBook = {
        book_id: `book_${Date.now()}`,
        title: "Existing Book",
        author: authorId,
        description: "Existing Test Description",
        genre: genreId,
      };

      await Books.create(newBook);

      const res = await request(app)
        .post("/api/books")
        .set("Authorization", `Bearer ${validToken}`)
        .send(newBook);

      expect(res.status).toBe(400);
      expect(res.body.msg).toBe("This book already exists");
    });
  });

  describe("PUT /books/:id", () => {
    let bookId;

    beforeAll(async () => {
      const book = await Books.create({
        book_id: `book_${Date.now()}`,
        title: "Book to Update",
        author: authorId,
        description: "Old Description",
        genre: genreId,
      });
      bookId = book._id;
    });

    it("should update a book", async () => {
      const updatedBook = {
        title: "Updated Book",
        description: "Updated Description",
        genre: genreId,
      };

      const res = await request(app)
        .put(`/api/books/${bookId}`)
        .set("Authorization", `Bearer ${validToken}`)
        .send(updatedBook);

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Book is updated successfully");
      expect(res.body.book.title.toLowerCase()).toBe(
        updatedBook.title.toLowerCase()
      );
    });
  });

  describe("DELETE /books/:id", () => {
    let bookId;

    beforeAll(async () => {
      const book = await Books.create({
        book_id: `book_${Date.now()}`,
        title: "Book to Delete",
        author: authorId,
        description: "Description to Delete",
        genre: genreId,
      });
      bookId = book._id;
    });

    it("should delete a book", async () => {
      const res = await request(app)
        .delete(`/api/books/${bookId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Book is deleted successfully");

      const deletedBook = await Books.findById(bookId);
      expect(deletedBook).toBeNull();
    });

    it("should return an error if the book is not found", async () => {
      const res = await request(app)
        .delete(`/api/books/${bookId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(res.status).toBe(404);
      expect(res.body.msg).toBe("Book not found");
    });
  });
});
