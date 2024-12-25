const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mongo = require('mongoose');
const DB_URL = process.env.db_Url;
const user_R = require('./routes/user');
const auth = require('./middlewares/auth');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const messSchema = require('./models/messages');

mongo.connect(DB_URL , console.log("connected database at" , PORT));
const corsOptions = {
    origin: 'http://localhost:5173', // Specify the exact origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/user" , user_R);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

app.post("/request", auth , async (req, res) => {
    const { ques } = req.body;
    console.log(ques);

    try {
        const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Start chat with an empty history array to test functionality
        const chatSession = await model.startChat({
            history: []
        });

        // Send the user's question
        const result = await chatSession.sendMessage(ques);
        const textAns = await result.response.text();

        const user = await User.findById(req.user._id);
        console.log(user);
        const history = messSchema.add({sender : user.username , question: ques , message : textAns});

        user.ChatHistory.push(history);
        
        res.send(textAns);
    } catch (error) {
        console.error("Error during chat processing:", error);
        res.status(500).send("Something went wrong with the AI response generation.");
    }
});

app.get("/chat-history" , auth , async (req , res) => {
    const user = await User.findById(req.user._id);
    res.send(user.ChatHistory);
});

app.listen(PORT, () => {
    console.log("Server started at port", PORT);
});