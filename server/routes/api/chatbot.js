const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENAI_API_KEY = 'sk-proj-lq17kJ5OtyKeH8ZvzsCRT3BlbkFJjnd0FQlENRYlmoidO9UY';

// Custom prompt that will always be included before the user's message
const CUSTOM_PROMPT = "You are an expert medical assistant. You will suggest healing methods to the patient based on the skin disease the patient tells you..";

router.post('/', async (req, res) => {
  let { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: CUSTOM_PROMPT },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    console.log(response.data); // Log the full response for debugging
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      res.json(response.data.choices[0].message);
    } else {
      res.status(500).json({ error: 'Invalid response from OpenAI' });
    }
  } catch (error) {
    console.error('Error communicating with OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error communicating with OpenAI' });
  }
});

module.exports = router;
