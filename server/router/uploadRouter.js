const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { upPhoto, prodImageResize } = require("../middlewares/uploadImg");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, upPhoto.array('images', 10), prodImageResize, uploadImages);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);


module.exports = router;