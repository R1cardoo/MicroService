import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  // 测试环境的cookie不会自动携带，需要手动复制
  const cookie = signupResponse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  console.log(response.body);
});
