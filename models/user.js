const mongoose = require('mongoose');
const AccessControl = require("accesscontrol");
const ac = new AccessControl();
const Schema = mongoose.Schema;

//What to store in the database
const userSchema = new Schema ({
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
        type: Object,
        default: ac.grant('basic'),
        enum: ['basic', 'contributor', 'admin']
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
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);
