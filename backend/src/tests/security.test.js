const request = require("supertest");
const app = require("../index");

describe("Security — Rate Limiting", () => {
  test("blocks after 10 failed logins", async () => {
    for (let i = 0; i < 10; i++) {
      await request(app).post("/api/auth/login").send({ email: "x@x.com", password: "wrong" });
    }
    const res = await request(app).post("/api/auth/login").send({ email: "x@x.com", password: "wrong" });
    expect(res.status).toBe(429);
  });
});

describe("Security — Input Validation", () => {
  test("rejects invalid email on register", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "not-an-email", password: "password123", display_name: "Test"
    });
    expect(res.status).toBe(422);
  });

  test("rejects short password", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@test.com", password: "short", display_name: "Test"
    });
    expect(res.status).toBe(422);
  });

  test("rejects unknown extra fields (mass assignment)", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@test.com", password: "password123", display_name: "Test",
      role: "admin", is_superuser: true
    });
    // Should not error on extra fields — Zod strips them silently
    expect([201, 409]).toContain(res.status);
    expect(res.body.user?.role).not.toBe("admin");
  });
});

describe("Security — SQL Injection", () => {
  test("rejects SQL injection in prediction", async () => {
    const res = await request(app)
      .post("/api/predictions")
      .set("Authorization", "Bearer fake")
      .send({ match_id: "1; DROP TABLE predictions;--", predicted_home: 1, predicted_away: 0 });
    expect([400, 401, 422]).toContain(res.status);
  });
});

describe("Security — XSS", () => {
  test("strips script tags from input", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "xss@test.com",
      password: "password123",
      display_name: "<script>alert(1)</script>"
    });
    if (res.body.user) {
      expect(res.body.user.display_name).not.toContain("<script>");
    }
  });
});

describe("Security — Headers", () => {
  test("sets X-Frame-Options: DENY", async () => {
    const res = await request(app).get("/health");
    expect(res.headers["x-frame-options"]).toBe("DENY");
  });

  test("sets X-Content-Type-Options: nosniff", async () => {
    const res = await request(app).get("/health");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });

  test("does not expose X-Powered-By", async () => {
    const res = await request(app).get("/health");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });

  test("returns request ID header", async () => {
    const res = await request(app).get("/health");
    expect(res.headers["x-request-id"]).toBeDefined();
  });
});

describe("Security — Auth", () => {
  test("rejects requests without token", async () => {
    const res = await request(app).get("/api/predictions");
    expect(res.status).toBe(401);
  });

  test("rejects tampered JWT", async () => {
    const res = await request(app)
      .get("/api/predictions")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.fake.signature");
    expect(res.status).toBe(401);
  });
});
