const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema ({
    title: {
        type: String
    },
    author: {
        type: String
    },
    date: {
        type: String
    },
    eventDate: {
        type: String
    },
    eventTime: {
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

module.exports = mongoose.model('Event', eventSchema);