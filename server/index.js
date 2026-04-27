const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./Ai");
const DataBase = require("./db");
const cors = require("cors");

app.use(express.json());

const allowedOrigins = ["https://ai-bot-pyeh.vercel.app"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
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