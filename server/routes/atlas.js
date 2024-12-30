import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/chat', 
  body('message').isString().trim().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { message } = req.body;
      const completion = await req.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You are Atlas, the Chief EVE™ Orchestrator for mavrika."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      res.json({ response: completion.choices[0]?.message?.content });
    } catch (error) {
      console.error('Atlas chat error:', error);
      res.status(500).json({ error: 'Failed to process message' });
    }
});

router.post('/analyze',
  body('companyData').isObject(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { companyData } = req.body;
      const prompt = `Analyze the following company data and recommend EVEs needed:
      ${JSON.stringify(companyData)}
      
      Provide recommendations in a structured format including roles, capabilities, and models needed.
      Focus on essential EVEs for core business functions.
      Always include an orchestrator EVE for coordination.
      Consider compliance and security requirements.`;

      const completion = await req.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      });

      const recommendations = JSON.parse(completion.choices[0]?.message?.content || '[]');
      res.json({ recommendations });
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze company needs' });
    }
});

export default router;