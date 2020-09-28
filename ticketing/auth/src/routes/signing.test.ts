import app from "../app";
import request from "supertest";

it("returns a 400 when email does not exist", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: "afsdtest@test.com", password: "password" })
    .expect(400);
});

it("returns a 400 when incorrect password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password2" })
    .expect(400);
});

it("should set a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test2@test.com", password: "password" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test2@test.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
