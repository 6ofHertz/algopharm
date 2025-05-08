import express from 'express';
const router = express.Router();

// Use named import for handleAIQuery
import { handleAIQuery } from '../controllers/aiController.js';

// Placeholder POST route for AI query
router.post('/ai-query', handleAIQuery);

export default router;
