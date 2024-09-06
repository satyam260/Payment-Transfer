const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;