const {Schema , model} = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    chatHistory: {
        type: [chatMessageSchema],
        default: []
    },
    refreshtoken: {
        type: String,
    }
},{timestamps: true});

userSchema.pre("save" , async (next) => {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 10);
    next();
});

userSchema.methods.isCorrectPassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword , this.password);
}

userSchema.methods.createAccessToken = () => {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    } , process.env.ACCESS_TOKEN_SECRET ,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.createRefreshToken = () => {
    return jwt.sign({
        _id: this._id
    } , process.env.REFRESH_TOKEN_SECRET ,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

const user = model("user" , userSchema);
module.exports = user;