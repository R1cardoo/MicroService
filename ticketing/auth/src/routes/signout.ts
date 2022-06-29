import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  // dump cookie.session
  req.session = null;
  res.send({});
});

export { router as signOutRouter }; // rename
