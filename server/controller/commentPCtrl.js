const CommentPost = require("../models/commentPModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId")

const createComment = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findEmail = await CommentPost.findOne({ email: email });

    if (!findEmail) {
        // tạo mới người dùng

        try {
            const newComment = await CommentPost.create(req.body);
            res.json(newComment);
        } catch (error) {
            throw new Error(error);
        }
    } else {
        throw new Error("User Already Exist");
    };
});
const updateComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updateComment = await CommentPost.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateComment);
    } catch (error) {
        throw new Error(error);
    }
});
const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    try {
        const deleteComment = await CommentPost.findByIdAndDelete(id);
        res.json(deleteComment);
    } catch (error) {
        throw new Error(error);
    }
});

const getComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getComment = await CommentPost.findById(id);
        res.json(getComment);
    } catch (error) {
        throw new Error(error);
    }
});
const getAllComment = asyncHandler(async (req, res) => {

    try {
        const getAllComment = await CommentPost.find();
        res.json(getAllComment);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createComment, updateComment, deleteComment, getComment, getAllComment }