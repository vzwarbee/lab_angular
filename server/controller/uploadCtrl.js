
const asyncHandler = require("express-async-handler");
const { cloudinaryUpImg, cloudinaryDeleteImg } = require("../utils/cloudinary")
const fs = require("fs")

const uploadImages = asyncHandler(async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUpImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        const images = urls.map((file) => {
            return file

        });
        res.json(images);
    } catch (error) {
        throw new Error(error)
    };
});

const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteImg = await cloudinaryDeleteImg(id, "images");
        res.json({ message: "Delete success" });
    } catch (error) {
        throw new Error(error)
    };
});

module.exports = { uploadImages, deleteImages }