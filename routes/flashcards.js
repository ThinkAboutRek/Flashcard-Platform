// routes/flashcards.js
const express = require('express');
const router = express.Router();
const { getFlashcardsInSet, createFlashcard } = require('../controllers/flashcardsController');

// Define routes for flashcards within a set
router.get('/sets/:setId/cards', getFlashcardsInSet); // Fetch all flashcards in a set
router.post('/sets/:setId/cards', createFlashcard); // Create a new flashcard in a set

module.exports = router;
