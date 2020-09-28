import app from "../app";
import request from "supertest";

it("returns a 201 on a successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
});

it("returns a 400 with an invalid email ", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "testtest.com", password: "password" })
    .expect(400);
});

it("returns a 400 without an email  ", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@etest.com" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "aiuyasd" })
    .expect(400);
});

it("should disallow the dupplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@etest.com", password: "aiuyasd" })
    .expect(201);
});

it("should set set-coookie after successul signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@etest.com", password: "aiuyasd" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
