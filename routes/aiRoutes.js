const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Placeholder POST route for AI query
router.post('/ai-query', aiController.handleAiQuery);

module.exports = router;