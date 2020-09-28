import app from "../app";
import request from "supertest";

it("response with details about the current user", async () => {
  const cookie = await global.getCookie();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
