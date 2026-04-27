const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey:"AIzaSyDDjwFB9JNuejDnIAOBajXM3zU55Iwtlkc"});

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: msg,
  });
  return response.text;
}

module.exports= main;