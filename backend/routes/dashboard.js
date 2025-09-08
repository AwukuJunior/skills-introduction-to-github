const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Protect the route
router.get('/', protect, getDashboardData);

module.exports = router;
