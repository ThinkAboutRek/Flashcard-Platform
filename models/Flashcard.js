// models/Flashcard.js
const knex = require('../db/knex');

// Get all flashcards in a set
const getAllFlashcardsInSet = (setId) => {
  return knex('flashcards').where({ set_id: setId }).select('*');
};

// Get a flashcard by ID
const getFlashcardById = (id) => {
  return knex('flashcards').where({ id }).first();
};

// Create a new flashcard
const createFlashcard = (flashcard) => {
  return knex('flashcards').insert(flashcard).returning('*');
};

// Update an existing flashcard by ID
const updateFlashcard = (id, flashcard) => {
  return knex('flashcards').where({ id }).update(flashcard).returning('*');
};

// Delete a flashcard by ID
const deleteFlashcard = (id) => {
  return knex('flashcards').where({ id }).del();
};

module.exports = { getAllFlashcardsInSet, getFlashcardById, createFlashcard, updateFlashcard, deleteFlashcard };
