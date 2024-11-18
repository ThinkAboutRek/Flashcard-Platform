// controllers/setsController.js
const { getAllSets, getSetById: findSetById, countSetsCreatedToday, createSet } = require('../models/Set');

// Get all sets
const getSets = async (req, res) => {
  try {
    const sets = await getAllSets();
    console.log("Sets Data:", JSON.stringify(sets, null, 2)); // Debugging
    res.render('sets', { sets });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sets', error });
  }
};




// Get set by ID
const getSetById = async (req, res) => {
  try {
    const { setId } = req.params;
    const set = await findSetById(setId);
    if (!set) return res.status(404).json({ message: 'Set not found' });
    res.json(set);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching set', error });
  }
};

const createSetController = async (req, res) => {
  try {
    const { name, questions, answers } = req.body;

    // Ensure `questions` and `answers` are arrays and generate cards
    const cards = questions.map((question, index) => ({
      question,
      answer: answers[index]
    }));

    const newSet = { name, cards: JSON.stringify(cards) }; // Stringify cards
    await createSet(newSet);

    res.redirect('/sets');
  } catch (error) {
    console.error('Error creating set:', error);
    res.status(500).json({ message: 'Error creating set', error });
  }
};



const updateSet = async (req, res) => {
  try {
    const { setId } = req.params;
    const { name, questions, answers } = req.body;

    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      throw new Error('Questions and Answers must be arrays');
    }

    const updatedCards = questions.map((question, index) => ({
      question,
      answer: answers[index],
    }));

    await knex('sets')
      .where({ id: setId })
      .update({ name, cards: JSON.stringify(updatedCards) });

    res.redirect('/sets');
  } catch (error) {
    console.error('Error updating set:', error);
    res.status(500).json({ message: 'Error updating set', error });
  }
};


const deleteSet = async (req, res) => {
  try {
    const { setId } = req.params;
    await deleteSetModel(setId);
    res.redirect('/sets');
  } catch (error) {
    console.error('Error deleting set:', error);
    res.status(500).json({ message: 'Error deleting set', error });
  }
};

module.exports = {
  getSets,
  getSetById,
  createSetController,
  updateSet,
  deleteSet
};
