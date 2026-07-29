const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {GoogleGenerativeAI} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

router.post("/request", auth, async (req, res) => {
    const { ques } = req.body;

    try {
        // 1. Fetch user and prepare history for the AI
        const user = await User.findById(req.user._id);
        
        // Map your DB history to the format Gemini expects: [{ role: 'user', parts: [{ text: '...' }] }]
        const formattedHistory = user.chatHistory.slice(-10).map(msg => ([
            { role: "user", parts: [{ text: msg.question }] },
            { role: "model", parts: [{ text: msg.message }] }
        ])).flat();

        // 2. Start session with actual history
        const chatSession = model.startChat({
            history: formattedHistory,
        });

        // 3. Get AI Response
        const result = await chatSession.sendMessage(ques);
        const textAns = result.response.text();

        // 4. Update Database (Atomic push is faster for large histories)
        const newMessage = { sender: user.username, question: ques, message: textAns };
        
        await User.findByIdAndUpdate(req.user._id, {
            $push: { chatHistory: newMessage }
        });

        res.send(textAns);

    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Failed to generate AI response." });
    }
});

router.get("/chat-history" , auth , async (req , res) => {
    const user = await User.findById(req.user._id);
    const his = user.chatHistory
    res.send(his);
});

module.exports = router;