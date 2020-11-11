const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//What to store in the database
const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "contributor", "admin"]
    }, 
    accessToken: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        address1: { type: String },
        address2: { type: String },
        city: { type: String },
        state: {type: String },
        zipCode: { type: Number },
    }
});

module.exports = mongoose.model('user', UserSchema);
