//Server/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//What to store in the database
const UserSchema = new Schema ({
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
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;