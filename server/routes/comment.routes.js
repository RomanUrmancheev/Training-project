const express = require("express");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something goes wrong. Try again later." });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newComment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something goes wrong. Try again later." });
    }
  });

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removedComment = await Comment.findById(commentId);

    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.deleteOne();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "Something goes wrong. Try again later.",
    });
  }
});

module.exports = router;
