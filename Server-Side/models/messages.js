const {Schema , model} = require('mongoose');
const userSchema = require('./user');

const chatMessageSchema = new Schema({
  sender: {
    type: String,
    required: true,
    enum: [userSchema.username, 'Tarang'], // Define if the sender is the user or the bot
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