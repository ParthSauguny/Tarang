const { Schema } = require('mongoose');
const userSchema = require('./user');

const chatMessageSchema = new Schema({
  sender: {
    type: String,
    required: true,
    enum: [userSchema.username, 'Tarang'], // Define if the sender is the user or the bot
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