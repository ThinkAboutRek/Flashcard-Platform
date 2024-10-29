// routes/sets.js
const express = require('express');
const router = express.Router();
const { getSets, createSetController, getSetById } = require('../controllers/setsController');

// API Routes for sets
router.get('/', getSets); // For both views and APIs
router.post('/', createSetController); // Create a new set
router.get('/:setId', getSetById); // Fetch set by ID

module.exports = router;
