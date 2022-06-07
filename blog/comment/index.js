const express = require("express");
const bodyParser = require("body-parser"); // 用于对post请求的请求体进行解析
const { randomBytes } = require("crypto");
const cors = require("cors"); // 跨域资源共享
const axios = require("axios");

const app = express();
app.use(bodyParser.json()); // app.use 用于加载中间件
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []); // 返回数据
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body; // 获取post的内容

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id },
  });

  res.status(201).send(comments); // 设置http状态码， 和返回数据
});

app.post("/event", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  // 设置监听的端口
  console.log("Listening on 4001");
});
