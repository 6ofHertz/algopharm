import express from 'express';
import dataRoutes from './routes/dataRoutes.js';  // Import the router

const app = express();
const port = 3000;

// Use the routes
app.use('/api', dataRoutes);  // This will make all the routes in dataRoutes.js accessible under '/api'

// Server setup
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
