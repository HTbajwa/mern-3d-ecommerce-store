const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: [true, "name must be unique"],
    },
    url: {
        type: String,
        required: [true, "URL is required"],
        unique: true,
        lowercase: true,
    },
    desc: {
        type: String,
        required: [true, "description is required"],
    },
    metatitle: {
        type: String,
        required: [true, "title is required"],
    },
    metadesc: {
        type: String,
        required: [true, "meta description is required"],
    },
    meta_keywords: {
        type: String,
        required: [true, "meta keywords are required"],
    },
    parentcategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category', 
            // Reference to the same model
        },
    ],
    attribute: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        default: "Active",
    },
    banner: {
        type: String,
        default: null,
    },
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('Category', categorySchema);
