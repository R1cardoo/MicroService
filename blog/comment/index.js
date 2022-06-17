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
  comments.push({ id: commentId, content, status: "pending " });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });

  res.status(201).send(comments); // 设置http状态码， 和返回数据
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  // 设置监听的端口
  console.log("Listening on 4001");
});
