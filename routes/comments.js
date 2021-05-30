const express = require("express");

const router = express.Router();

const commentController = require("../controllers/comment");

router.post("/", commentController.addComment);

router.delete("/", commentController.deleteComment);

router.post("/reply", commentController.addReply);

module.exports = router;
