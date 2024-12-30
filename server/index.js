import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { validateApiKey } from './middleware/auth.js';
import atlasRoutes from './routes/atlas.js';
import eveRoutes from './routes/eve.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://mavrika.ai' 
    : 'http://localhost:5173'
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Make OpenAI client available to routes
app.use((req, res, next) => {
  req.openai = openai;
  next();
});

// Routes
app.use('/api/atlas', validateApiKey, atlasRoutes);
app.use('/api/eve', validateApiKey, eveRoutes);
app.use('/api/tasks', validateApiKey, taskRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'An unexpected error occurred',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});