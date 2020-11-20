const mongoose = require('mongoose');
const messageSchema = require('./Message');

const roomSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  ownerId: {type: String, required: true},
  private: {type: Boolean, default: true},
  joinCode: {type: String, unique: true, required: true},
  users: [{
    userId: String,
    active: Boolean,
  }],
  messages: [messageSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Room', roomSchema);
