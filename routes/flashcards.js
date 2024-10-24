const express = require('express');
const router = express.Router();
const { getFlashcardsInSet, createFlashcard } = require('../controllers/flashcardsController');

router.get('/:setId/cards', getFlashcardsInSet);
router.post('/:setId/cards', createFlashcard);

module.exports = router;
