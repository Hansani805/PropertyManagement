const express = require("express");

const router = express.Router();

const commentController = require("../controllers/comment");

router.post("/comment", commentController.addComment);

router.delete("/comment", commentController.deleteComment);

router.post("/comment/reply", commentController.addReply);

module.exports = router;
