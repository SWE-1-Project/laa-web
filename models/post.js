const mongoose = require('mongoose');

var postSchema = new mongoose.Schema ({
    title: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
    titleCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    titleTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
    }
});

module.exports = mongoose.model('Post', postSchema);