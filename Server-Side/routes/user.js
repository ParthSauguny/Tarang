const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();


router.post("/signup" , async(req , res) => {
    const {username , email , password} = req.body;
    console.log(username , email , password);
    const userfound = await User.findOne({username: username , email: email});
    console.log(userfound);

    if(userfound){
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

router.post("/login" , async(req , res) => {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Please enter all fields"});
    }

    try {
        const founduser = await User.findOne({email});
        if(!founduser){
            return res.status(401).json({message: "User not found"});
        }

        const validornot = await founduser.isCorrectPassword(password);
        if(!validornot){
            return res.status(401).json({message: "wrong password entered"});
        }
        const refreshToken = founduser.createRefreshToken();
        const accessToken = founduser.createAccessToken();

        founduser.refreshToken = refreshToken;

        await founduser.save({validateBeforeSave: false});

        const options = {
            httpOnly: true,
            secure: true
        };

        return res.status(200).cookie("accesstoken" , accessToken , options).cookie("refreshtoken" , refreshToken , options).json({ message: "Login successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "can't do rn. Try later"});
    }    
});

module.exports = router;