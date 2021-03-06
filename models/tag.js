const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('tags', tagSchema);