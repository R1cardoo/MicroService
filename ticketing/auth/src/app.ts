import express from "express";
import "express-async-errors"; // 避免处理同步/异步状态的throw
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user"; // 引入写在其他文件夹的router
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@tickets_io/common"; // 错误处理中间件, 处理错误的URL

const app = express();
app.set("trust proxy", true); // 避免把来自ingress的流量认为是异常流量
app.use(json());
app.use(
  cookieSession({
    signed: false, // 不加密
    secure: process.env.NODE_ENV !== "test", // 相信安全
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all("*", async () => {
  // 处理错误URL
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
