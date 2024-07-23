const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8840;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/random-text", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a funny and creative. Only respond with a single funny and creative sentence. just return a single sentence without any greeting or anything.",
          },
          {
            role: "user",
            content:
              "Generate a random text for me, make it short and human-like language.",
          },
        ],
        max_tokens: 50,
        temperature: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let randomText = response.data.choices[0].message.content.trim();

    // Remove surrounding quotes if they exist
    if (randomText.startsWith('"') && randomText.endsWith('"')) {
      randomText = randomText.slice(1, -1);
    }

    res.status(200).json({ randomText });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching random text",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
