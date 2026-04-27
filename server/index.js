const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./Ai");
const DataBase = require("./db");
const cors = require("cors");

app.use(express.json());

const allowedOrigins = ["https://ai-bot-pyeh.vercel.app",
    "http://localhost:3000",
  "http://localhost:5173"
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// API
app.post("/first", async (req, res) => {
const { msg, id } = req.body;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  const chatHistory = [];

  if (!chatHistory[id]) {
    chatHistory[id] = [];
  }

  const history = chatHistory[id];

  const promptmessage = [
    ...history,
    { role: "user", parts: [{ text: msg }] }
  ];

  // IMPORTANT: assume your AI supports streaming
  const stream = await main(promptmessage, { stream: true });

  let fullText = "";

  for await (const chunk of stream) {
    const text = chunk.text || "";

    fullText += text;

    // send chunk to frontend immediately
    res.write(text);
  }

  history.push({ role: "user", parts: [{ text: msg }] });
  history.push({ role: "model", parts: [{ text: fullText }] });

  res.end();
});

// Server
app.listen(1000, () => {
  console.log("Server running on port 1000");
});