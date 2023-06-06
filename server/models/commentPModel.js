const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var CommentPostSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    commentContent: {
        type: String,
        required: true,
    },

},
    {
        timestamps: true
    });

//Export the model
module.exports = mongoose.model('CommentPost', CommentPostSchema);
