const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {type: String, required: true},
  content: {type: String, required: true},
}, {
  timestamps: true,
});

module.exports = messageSchema;
