// controllers/flashcardsController.js
const { getAllFlashcardsInSet, createFlashcard: createFlashcardModel } = require('../models/Flashcard');


const getFlashcardsInSet = async (req, res) => {
  try {
    const { setId } = req.params;
    console.log(`Fetching flashcards for set ID: ${setId}`);
    const flashcards = await getAllFlashcardsInSet(setId);
    if (!flashcards.length) return res.status(404).json({ message: 'No flashcards found' });
    res.json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).json({ message: 'Error fetching flashcards', error });
  }
};

const createFlashcard = async (req, res) => {
  try {
    const { question, answer, difficulty } = req.body;
    const { setId } = req.params;
    console.log(`Creating flashcard in set ID: ${setId}`);

    const newFlashcard = {
      question,
      answer,
      difficulty,
      set_id: setId,
    };

    const [id] = await createFlashcardModel(newFlashcard);
    console.log('Created flashcard with ID:', id);
    res.status(201).json({ id, ...newFlashcard });
  } catch (error) {
    console.error('Error creating flashcard:', error);
    res.status(500).json({ message: 'Error creating flashcard', error });
  }
};


module.exports = { getFlashcardsInSet, createFlashcard };
