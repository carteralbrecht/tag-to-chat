const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: String,
    users: [{
        id: String,
        active: Boolean
    }],
    createdBy: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('Room', roomSchema);
