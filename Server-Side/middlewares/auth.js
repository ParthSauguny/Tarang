const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

const auth = (req , res , next) => {
    try {
        const token = req.cookie.accesstoken;

        if(!token){
            return res.status(400).json({message: "unauthorised access"});
        }

        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

        const user = User.findById(decoded?._id).select("-password -refreshToken");

        if(!user){
            return res.status(401).json({message: "user not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "request not valid"});
    }
}
module.exports = auth;