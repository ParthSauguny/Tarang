const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post("/signup" , (req , res) => {
    const {username , email , password} = req.body;

    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "can't do rn. Try later"});
    }
});