import express from 'express';
const router = express.Router();
import { getSalesData, getInventoryData, getShiftData, getUserPerformanceData } from '../controllers/dataController.js';

// Placeholder GET route for sales data
router.get('/sales-data', getSalesData);

// Placeholder GET route for inventory data
router.get('/inventory-data', getInventoryData);

// Placeholder GET route for shift data
router.get('/shift-data', getShiftData);

// Placeholder GET route for user performance data
router.get('/user-performance', getUserPerformanceData);

// Exporting router correctly
export default router;