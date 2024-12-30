import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/create',
  body('eve').isObject(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { eve } = req.body;
      // In a real app, create EVE in database
      res.json({ eve: { ...eve, id: Date.now().toString() } });
    } catch (error) {
      console.error('EVE creation error:', error);
      res.status(500).json({ error: 'Failed to create EVE' });
    }
});

router.get('/list', async (req, res) => {
  try {
    // In a real app, fetch EVEs from database
    res.json({ eves: [] });
  } catch (error) {
    console.error('EVE list error:', error);
    res.status(500).json({ error: 'Failed to fetch EVEs' });
  }
});

export default router;