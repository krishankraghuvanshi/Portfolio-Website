const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// GET /api/portfolio-data
router.get('/portfolio-data', portfolioController.getPortfolioData);

// POST /api/contact
router.post('/contact', portfolioController.submitContactForm);

// GET /api/leetcode/:username
router.get('/leetcode/:username', portfolioController.getLeetCodeStats);

module.exports = router;
