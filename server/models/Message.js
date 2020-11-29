const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  content: {type: String, required: true}
}, {
  timestamps: true,
});

module.exports = messageSchema;
