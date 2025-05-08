import express from 'express';
import dotenv from 'dotenv';
import dataRoutes from './routes/dataRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import authMiddleware from './src/backend/middleware/authMiddleware.js'; // Assuming your middleware file is here

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/api', authMiddleware, dataRoutes);
app.use('/api', authMiddleware, aiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});