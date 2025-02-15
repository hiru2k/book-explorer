const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../../middlewares/auth");

jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());

// Dummy route to test auth middleware
app.get("/protected", auth, (req, res) => {
  res.json({ msg: "Access granted", user: req.user });
});

describe("Auth Middleware", () => {
  let validToken;
  let userPayload;

  beforeAll(() => {
    userPayload = { id: "12345" };
    validToken = "valid-jwt-token";
  });

  test("Should return 400 if token is missing", async () => {
    const res = await request(app).get("/protected");

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("token is not found");
  });

  test("Should return 400 if token is invalid", async () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error("invalid Authorization"), null);
    });

    const res = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer invalid-token`);

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("invalid Authorization");
  });

  test("Should pass user info in request if token is valid", async () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, userPayload);
    });

    const res = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Access granted");
    expect(res.body.user).toEqual(userPayload);
  });
});
