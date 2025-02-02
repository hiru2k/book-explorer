const request = require("supertest");
const app = require("../../server");
const jwt = require("jsonwebtoken");
const Books = require("../../models/bookModel");

beforeAll(() => {
  jest.setTimeout(10000);
});

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: jest.fn(),
}));

// Mock the Books model methods
jest.mock("../../models/bookModel");

describe("Auth Middleware", () => {
  const validToken = jwt.sign(
    { id: "valid-user-id" },
    process.env.ACCESS_TOKEN_SECRET
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should allow access with a valid token", async () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: "valid-user-id" });
    });

    // Mock the find method of Books to avoid hitting the actual database
    Books.find.mockResolvedValue([
      { title: "Book 1", author: "Author 1" },
      { title: "Book 2", author: "Author 2" },
    ]);

    const res = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${validToken}`);
    expect(res.status).toBe(200);
    expect(res.body.books).toHaveLength(2);
  });

  it("should deny access without a token", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("token is not found");
  });

  it("should deny access with an invalid token", async () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error("invalid token"), null);
    });

    const res = await request(app)
      .get("/api/books")
      .set("Authorization", "Bearer invalid-token");
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("invalid Authorization");
  });
});
