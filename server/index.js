const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./Ai");
const DataBase = require("./db");
const cors = require("cors");

app.use(express.json());

const allowedOrigins = ["https://ai-bot-pyeh.vercel.app",
    "https://ceetcode-ziw5.vercel.app",
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
  const chatHistory = [];

  const { msg, id } = req.body;

  if (!chatHistory[id]) {
    chatHistory[id] = [];
  }

  const history = chatHistory[id];

  const promptmessage = [
    ...history,
    { role: "user", parts: [{ text: msg }] }
  ];

  const answer = await main(promptmessage);

  history.push({ role: "user", parts: [{ text: msg }] });
  history.push({ role: "model", parts: [{ text: answer }] });

  res.send( answer );
});

// Server
app.listen(1000, () => {
  console.log("Server running on port 1000");
});