const express = require('express');
const router = express.Router();
const { getSets, createSet } = require('../controllers/setsController');

router.get('/', getSets);
router.post('/', createSet);

module.exports = router;
