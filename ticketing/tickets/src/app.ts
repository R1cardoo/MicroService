import express from "express";
import "express-async-errors"; // 避免处理同步/异步状态的throw
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";
import { errorHandler, NotFoundError, currentUser } from "@tickets_io/common"; // 错误处理中间件, 处理错误的URL

const app = express();
app.set("trust proxy", true); // 避免把来自ingress的流量认为是异常流量
app.use(json());
app.use(
  cookieSession({
    signed: false, // 不加密
    secure: process.env.NODE_ENV !== "test", // 相信安全
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  // 处理错误URL
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
