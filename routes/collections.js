// routes/collections.js
const express = require('express');
const router = express.Router();
const { getCollections, createCollection } = require('../controllers/collectionsController');

// Define API routes for collections
router.get('/collections', getCollections); // Fetch all collections
router.post('/collections', createCollection); // Create a new collection

// route check log
router.get('/collections', (req, res, next) => {
    console.log("Route accessed: GET /collections");
    next();
  }, getCollections);
  
module.exports = router;
