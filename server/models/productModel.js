const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    prodCategory: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    image: [{
        public_id: String,
        url: String,
    },],
    ratings: [
        {
            star: Number,
            comment: String,
            postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User", }
        }
    ],
    totalRating: {
        type: Number,
        default: 0,
    }
}, { timestamps: true, });

//Export the model
module.exports = mongoose.model('Product', productSchema);