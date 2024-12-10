const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/signup" , async(req , res) => {
    const {username , email , password} = req.body;

    if(User.findOne({username: username , email: email})){
        return res.status(400).json({message: "account already exists"});
    }
    try {
        await User.create({
          username,
          email,
          password
        });

        return res.status(200).json({message: "Signed up successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "can't do rn. Try later"});
    }
});

router.post("/login" , auth , async(req , res) => {
    const {email , password} = req.body;

    if(!User.isCorrectPassword(password)){
        return res.status(400).json({message: "wrong password entered"});
    }
});

module.exports = router;