const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mongo = require('mongoose');
const DB_URL = process.env.db_Url;
const user_R = require('./routes/user');
const conversation_R = require('./routes/conversation');
const cookieParser = require('cookie-parser');

mongo.connect(DB_URL)
    .then(() => console.log("Connected to database, server running on port", PORT))
    .catch((err) => console.error("Database connection error:", err));

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Set CLIENT_ORIGIN in .env for production
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/user" , user_R);
app.use("/conversations" , conversation_R);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log("Server started at port", PORT);
    });
}

module.exports = app;