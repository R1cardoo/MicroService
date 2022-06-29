import express from "express";

import { currentUser } from "@tickets_io/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null }); // req.currentUser在中间件中添加了
});

export { router as currentUserRouter }; // rename
