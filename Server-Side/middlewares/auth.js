const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accesstoken;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access: Token missing" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded || !decoded._id) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Find the user in the database
        const user = await User.findById(decoded._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({ message: "Request not valid" });
    }
};

module.exports = auth;
