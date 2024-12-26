const { Schema } = require('mongoose');
const userSchema = require('./user');

const chatMessageSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = chatMessageSchema;