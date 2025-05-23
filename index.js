import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai'; // ✅ Only this import is needed

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.API_KEY, // ✅ Ensure .env contains API_KEY
  organization: "org-m5NQ5WYr5GS7Uj8DsGQt6mVx", // Optional
});

app.listen(3080, () => console.log("Listening on port 3080"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.json({ message: response.choices[0].text });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});
