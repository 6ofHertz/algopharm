const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Placeholder GET route for sales data
router.get('/sales-data', dataController.getSalesData);

// Placeholder GET route for inventory data
router.get('/inventory-data', dataController.getInventoryData);

// Placeholder GET route for shift data
router.get('/shift-data', dataController.getShiftData);

// Placeholder GET route for user performance data
router.get('/user-performance', dataController.getUserPerformance);

module.exports = router;