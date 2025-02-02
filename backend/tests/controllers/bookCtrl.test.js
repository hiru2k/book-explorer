const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../server");
const jwt = require("jsonwebtoken");

// Mock mongoose connection
jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");

  return {
    ...actualMongoose,
    connect: jest.fn().mockResolvedValue(),
    model: jest.fn((name, schema) => ({
      create: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn(),
      findByIdAndDelete: jest.fn(),
    })),
    Schema: class {
      constructor() {
        this.Types = {
          ObjectId: "mock-object-id",
        };
      }
    },
  };
});

const Users = mongoose.model("Users");
const Genre = mongoose.model("Genre");
const Books = mongoose.model("Books");

let authorId;
let genreId;

const validToken = jwt.sign(
  { id: "valid-user-id" },
  process.env.ACCESS_TOKEN_SECRET
);

beforeAll(async () => {
  Users.findOne.mockResolvedValueOnce({
    _id: "test-author-id",
    name: "Test Author",
    email: "test@example.com",
    password: "password123",
  });

  Users.create.mockResolvedValueOnce({
    _id: "test-author-id",
    name: "Test Author",
    email: "test@example.com",
    password: "password123",
  });

  authorId = "test-author-id";
  genreId = "test-genre-id";

  Books.create.mockResolvedValueOnce({
    book_id: "book-1",
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

      Books.create.mockResolvedValueOnce({
        ...newBook,
        _id: "new-book-id",
      });

      const res = await request(app)
        .post("/api/books")
        .set("Authorization", `Bearer ${validToken}`)
        .send(newBook);

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Book is published successfully");
    });

    it("should return an error if the book already exists", async () => {
      const newBook = {
        book_id: `book_${Date.now()}`,
        title: "Existing Book",
        author: authorId,
        description: "Existing Test Description",
        genre: genreId,
      };

      Books.findOne.mockResolvedValueOnce({
        ...newBook,
        _id: "existing-book-id",
      });

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

    beforeAll(() => {
      bookId = "book-id-to-update";
    });

    it("should update a book", async () => {
      const updatedBook = {
        title: "Updated Book",
        description: "Updated Description",
        genre: genreId,
      };

      Books.findById.mockResolvedValueOnce({
        _id: bookId,
        title: "Updated Book",
        description: "Updated Description",
        genre: genreId,
      });

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

    beforeAll(() => {
      bookId = "book-id-to-delete";
    });

    it("should delete a book", async () => {
      Books.findById.mockResolvedValueOnce({
        _id: bookId,
        title: "Book to Delete",
        author: authorId,
        description: "Description to Delete",
        genre: genreId,
      });

      Books.findByIdAndDelete.mockResolvedValueOnce({
        _id: bookId,
        title: "Book to Delete",
        author: authorId,
        description: "Description to Delete",
        genre: genreId,
      });

      const res = await request(app)
        .delete(`/api/books/${bookId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Book is deleted successfully");
    });

    it("should return an error if the book is not found", async () => {
      Books.findById.mockResolvedValueOnce(null);

      const res = await request(app)
        .delete(`/api/books/${bookId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(res.status).toBe(404);
      expect(res.body.msg).toBe("Book not found");
    });
  });
});
