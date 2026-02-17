/*const {GoogleGenerativeAI} = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

async function listModels() {
  const result = await genAI.listModels();
  console.log("Available Models:");
  result.models.forEach((m) => console.log(m.name));
}
listModels(); */

require('dotenv').config();
const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

async function listModels() {
  const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}&pageSize=100`
);
  const data = await response.json();

  // Debug: see the full raw response
  console.log("Status:", response.status);
  console.log("Full response:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    console.error("API Error:", data.error?.message || "Unknown error");
    return;
  }

  if (!data.models) {
    console.error("No 'models' field in response. Keys found:", Object.keys(data));
    return;
  }

  console.log("Available Models:");
  data.models.forEach((m) => console.log(m.name));
}

listModels();