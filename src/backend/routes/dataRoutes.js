const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Placeholder
const dataController = require('../controllers/dataController'); // Placeholder

// Apply authentication middleware to all data routes
router.use(authMiddleware);

// Placeholder route for fetching sales data
router.get('/sales-data', dataController.getSalesData);

// Placeholder route for fetching inventory data
router.get('/inventory-data', dataController.getInventoryData);

// Placeholder route for fetching shift data
router.get('/shift-data', dataController.getShiftData);

// Placeholder route for fetching user performance data
router.get('/user-performance', dataController.getUserPerformance);

module.exports = router;