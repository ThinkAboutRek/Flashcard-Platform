// routes/sets.js
const express = require('express');
const router = express.Router();
const { getSets, getSetById, createSetController,updateSet,deleteSet } = require('../controllers/setsController');

// Define API routes for sets
router.get('/sets', getSets); // Fetch all sets
router.get('/sets/:setId', getSetById); // Fetch a specific set by ID
router.post('/sets', createSetController); // Create a new set
router.post('/sets/:setId/update', updateSet); // Update a specific set
router.post('/sets/:setId/delete', deleteSet); // Delete a specific set

module.exports = router;
