import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/create',
  body('task').isObject(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { task } = req.body;
      // In a real app, create task in database
      res.json({ task: { ...task, id: Date.now().toString() } });
    } catch (error) {
      console.error('Task creation error:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
});

router.get('/queue/:eveId', async (req, res) => {
  try {
    const { eveId } = req.params;
    // In a real app, fetch tasks from database
    res.json({ tasks: [] });
  } catch (error) {
    console.error('Task queue error:', error);
    res.status(500).json({ error: 'Failed to fetch task queue' });
  }
});

export default router;