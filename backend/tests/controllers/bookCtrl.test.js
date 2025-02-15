const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server");
const Book = require("../../models/bookModel");
const User = require("../../models/userModel");
const Genre = require("../../models/genreModel");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let token;
let authorId;
let genreId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Create a test user and genre
  const user = await User.create({
    name: "Test Author",
    email: "test@example.com",
    password: "heifiuehr",
  });
  const genre = await Genre.create({ name: "Fiction" });

  authorId = user._id;
  genreId = genre._id;

  // Generate a JWT token for authentication
  token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Book API Tests", () => {
  let bookId;

  test("Should create a book", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        book_id: "123",
        title: "Test Book",
        author: authorId,
        description: "A test book description",
        genre: genreId,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Book is published successfully");

    const book = await Book.findOne({ book_id: "123" });
    expect(book).not.toBeNull();
    bookId = book._id;
  });

  test("Should fail to create a book with same id", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        book_id: "123",
        title: "Test Book",
        author: authorId,
        description: "A test book description",
        genre: genreId,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toContain("This book already exists");
  });

  test("Should get all books", async () => {
    const res = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.books.length).toBeGreaterThan(0);
  });

  test("Should fail to get books without authentication", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("token is not found");
  });

  test("Should update a book", async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Test Book",
        description: "Updated description",
        genre: genreId,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Book is updated successfully");

    const updatedBook = await Book.findById(bookId);
    expect(updatedBook.title).toBe("updated test book");
  });

  test("Should fail to update a non-existing book", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/books/${fakeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Nonexistent Book" });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Book not found");
  });

  test("Should delete a book", async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Book is deleted successfully");

    const deletedBook = await Book.findById(bookId);
    expect(deletedBook).toBeNull();
  });

  test("Should fail to delete a non-existing book", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .delete(`/api/books/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Book not found");
  });
});
