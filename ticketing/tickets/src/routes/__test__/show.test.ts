import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  // 这里id一定要通过mongoose生成，不然类型匹配会失败
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  // 需要先注册，但是注册的模块需要全局函数 全局函数不知道咋写 所以这里先空着
});
