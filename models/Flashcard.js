// models/Flashcard.js
const knex = require('../db/knex');

const getAllFlashcardsInSet = (setId) => {
  return knex('flashcards').where({ set_id: setId }).select('*');
};

const getFlashcardById = (id) => {
  return knex('flashcards').where({ id }).first();
};

const createFlashcard = (flashcard) => {
  return knex('flashcards').insert(flashcard).returning('*');
};

const updateFlashcard = (id, flashcard) => {
  return knex('flashcards').where({ id }).update(flashcard).returning('*');
};

const deleteFlashcard = (id) => {
  return knex('flashcards').where({ id }).del();
};

module.exports = { getAllFlashcardsInSet, getFlashcardById, createFlashcard, updateFlashcard, deleteFlashcard };
