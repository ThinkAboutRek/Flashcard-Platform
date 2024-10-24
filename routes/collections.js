const express = require('express');
const router = express.Router();
const { getCollections, createCollection } = require('../controllers/collectionsController');

router.get('/', getCollections);
router.post('/', createCollection);

module.exports = router;
