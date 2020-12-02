const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  content: {type: String, required: true},
  sentAt: {type: Date, required: true}
},
);

module.exports = messageSchema;
