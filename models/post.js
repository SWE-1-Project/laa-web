const mongoose = require('mongoose');

var postSchema = new mongoose.Schema ({
    title: {
        type: String
    },
    author: {
        type: String
    },
    date: {
        type: String
    },
    mainImage: {
        type: String
    },
    content: {
        type: String
    },
    category: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Post', postSchema);