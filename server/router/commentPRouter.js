const express = require("express");
const { createComment, updateComment, deleteComment, getComment, getAllComment } = require("../controller/commentPCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/:id", getComment);
router.get("/", getAllComment);


module.exports = router;