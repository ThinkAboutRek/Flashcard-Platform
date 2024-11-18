// routes/collections.js
const express = require('express');
const router = express.Router();
const { getCollections, createCollection, updateCollection, deleteCollection } = require('../controllers/collectionsController');

// Define API routes for collections
router.get('/collections', getCollections); // Fetch all collections
router.post('/collections', createCollection); // Create a new collection
router.post('/collections/:collectionId/update', updateCollection); // Update a collection
router.post('/collections/:collectionId/delete', deleteCollection); // Delete a collection

module.exports = router;


