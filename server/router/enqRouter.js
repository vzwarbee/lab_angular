const express = require("express");
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getAllEnquiry } = require("../controller/enqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createEnquiry);
router.put("/:id", authMiddleware, updateEnquiry);
router.delete("/:id", authMiddleware, deleteEnquiry);
router.get("/:id", getEnquiry);
router.get("/", getAllEnquiry);


module.exports = router;