const knex = require('../db/knex');

// Get all flashcards in a set
const getFlashcardsInSet = async (req, res) => {
  const { setId } = req.params;
  const flashcards = await knex('flashcards').where({ set_id: setId });
  res.json(flashcards);
};

// Create a new flashcard
const createFlashcard = async (req, res) => {
  try {
    const { question, answer, difficulty } = req.body;
    const { setId } = req.params;

    const newFlashcard = {
      question,
      answer,
      difficulty,
      set_id: setId,
    };

    const [id] = await knex('flashcards').insert(newFlashcard);
    res.status(201).json({ id, ...newFlashcard });
  } catch (error) {
    res.status(500).json({ message: 'Error creating flashcard', error });
  }
};

module.exports = { getFlashcardsInSet, createFlashcard };
