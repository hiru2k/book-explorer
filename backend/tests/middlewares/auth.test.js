const request = require("supertest");
const app = require("../../server");
const jwt = require("jsonwebtoken");

describe("Auth Middleware", () => {
  // Generate a mock token
  const validToken = jwt.sign(
    { id: "valid-user-id" },
    process.env.ACCESS_TOKEN_SECRET
  );

  it("should allow access with a valid token", async () => {
    const res = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${validToken}`);
    expect(res.status).toBe(200);
  });

  it("should deny access without a token", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("token is not found");
  });

  it("should deny access with an invalid token", async () => {
    const res = await request(app)
      .get("/api/books")
      .set("Authorization", "Bearer invalid-token");
    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("invalid Authorization");
  });
});
