import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { prompt,length } = req.body;

  const instructions = require("../../assets/prompt.js");


  // Define or replace userPrompt with the actual user prompt
  const userPrompt = {
    role: "user",
    content: `${prompt}\n**Keep the story in about ${length} words.** Strictly follow the word count estimate and don't go beyond 110% of length or don't make it 90% of the length`,
  };


  const msgs = [...instructions, userPrompt]; // Combine instructions with user prompt

  const response = await openai.chat.completions.create({
    messages: msgs,
    model: "gpt-3.5-turbo",
});
const responseData = response.choices[0].message.content; // Extract the response content as a string

console.log(responseData); // Log the response content

res.status(200).send(responseData); 



}
