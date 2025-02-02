const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const Users = require("../../models/userModel");
const jwt = require("jsonwebtoken");

jest.mock("../../models/userModel");

describe("POST /user/register", () => {
  it("should register a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    Users.prototype.save = jest.fn().mockResolvedValue(userData);

    const res = await request(app).post("/user/register").send(userData);

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Successfully Registered");
  });

  it("should return error if email already exists", async () => {
    const userData = {
      name: "Jane Doe",
      email: "john@example.com",
      password: "password123",
    };

    Users.findOne = jest.fn().mockResolvedValue(userData);

    const res = await request(app).post("/user/register").send(userData);

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("This email already exists");
  });
});

describe("POST /user/login", () => {
  it("should log in the user successfully", async () => {
    const loginData = {
      email: "john@example.com",
      password: "password123",
    };

    Users.findOne = jest.fn().mockResolvedValue({
      email: "john@example.com",
      password: "password123",
    });

    const res = await request(app).post("/user/login").send(loginData);

    expect(res.status).toBe(200);
    expect(res.body.accesstoken).toBeDefined();
  });

  it("should return error for incorrect password", async () => {
    const loginData = {
      email: "john@example.com",
      password: "wrongpassword",
    };

    Users.findOne = jest.fn().mockResolvedValue({
      email: "john@example.com",
      password: "password123",
    });

    const res = await request(app).post("/user/login").send(loginData);

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("Incorrect password");
  });
});

describe("POST /user/logout", () => {
  it("should log out the user", async () => {
    const res = await request(app)
      .post("/user/logout")
      .set("Authorization", "Bearer valid-jwt-token");

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Logged Out");
  });
});

describe("GET /user", () => {
  let token;
  let userId;

  beforeAll(async () => {
    const newUser = {
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    };

    Users.prototype.save = jest.fn().mockResolvedValue(newUser);

    const user = await new Users(newUser).save();

    token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    userId = user._id;
  });

  afterAll(async () => {
    jest.resetAllMocks();
    await mongoose.connection.close();
  });

  it("should return the user details without the password", async () => {
    const res = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(userId.toString());
    expect(res.body.password).toBeUndefined();
    expect(res.body.name).toBe("Test User");
    expect(res.body.email).toBe("testuser@example.com");
  });

  it("should return an error if the user does not exist", async () => {
    const invalidToken = jwt.sign(
      { id: mongoose.Types.ObjectId() },
      process.env.ACCESS_TOKEN_SECRET
    );

    const res = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("User does not exist");
  });

  it("should return an error if no token is provided", async () => {
    const res = await request(app).get("/user");

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("token is not found");
  });

  it("should return an error if the token is invalid", async () => {
    const res = await request(app)
      .get("/user")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("invalid Authorization");
  });
});
