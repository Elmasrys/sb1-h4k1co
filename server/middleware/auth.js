import jwt from 'jsonwebtoken';

export const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  try {
    // In a real app, validate against database
    // For demo, just check if it matches env var
    if (apiKey !== process.env.API_KEY) {
      throw new Error('Invalid API key');
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid API key' });
  }
};