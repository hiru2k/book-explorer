const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../server");
const User = require("../../models/userModel");

const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Authentication API", () => {
  let userId;

  test("Should register a user", async () => {
    const res = await request(app).post("/user/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Successfully Registered");

    const user = await User.findOne({ email: "test@example.com" });
    expect(user).not.toBeNull();
    userId = user._id;
  });

  test("Should fail to register with an existing email", async () => {
    const res = await request(app).post("/user/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("This email already exists");
  });

  test("Should log in the user", async () => {
    const res = await request(app).post("/user/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.accesstoken).toBeDefined();

    token = res.body.accesstoken;
  });

  test("Should fail login with incorrect password", async () => {
    const res = await request(app).post("/user/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("Incorrect password");
  });

  test("Should fetch user info", async () => {
    const res = await request(app)
      .get("/user/infor")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });

  test("Should fail to fetch user info without token", async () => {
    const res = await request(app).get("/user/infor");

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("token is not found");
  });

  test("Should logout the user", async () => {
    const res = await request(app).get("/user/logout");

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Logged Out");
  });
});
