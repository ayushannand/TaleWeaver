import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { prompt, length } = req.body;

  const instructions = require("../../assets/prompt.js");

  // Define or replace userPrompt with the actual user prompt
  const userPrompt = {
    role: "user",
    content: `${prompt}\n**Keep the story in about ${length} words.** Strictly follow the word count estimate and don't go beyond 110% of length or don't make it 90% of the length`,
  };

  const msgs = [...instructions, userPrompt]; // Combine instructions with the user prompt

  try {
    const responsePromise = openai.chat.completions.create({
      messages: msgs,
      model: "gpt-3.5-turbo",
    });

    // Set a timeout for the response (e.g., 30 seconds)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, 30000); // Adjust the timeout duration as needed (in milliseconds)
    });

    // Use Promise.race to await the response or the timeout
    const response = await Promise.race([responsePromise, timeoutPromise]);

    if (response instanceof Error) {
      throw response; // Handle timeout error
    }

    const responseData = response.choices[0].message.content; // Extract the response content as a string

    console.log(responseData); // Log the response content

    res.status(200).send(responseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
