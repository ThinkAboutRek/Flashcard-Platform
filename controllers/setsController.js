// controllers/setsController.js
const { getAllSets, getSetById: findSetById, countSetsCreatedToday, createSet } = require('../models/Set');

// Get all sets
const getSets = async (req, res) => {
  try {
    const sets = await getAllSets();
    res.json(sets);
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

// Create a new set
const createSetController = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const createdToday = await countSetsCreatedToday(today);

    if (createdToday[0].count >= 20) {
      return res.status(429).json({ message: 'You have reached the maximum number of flashcard sets allowed today' });
    }

    const { name, cards } = req.body;
    const newSet = {
      name,
      cards: JSON.stringify(cards),
    };

    const set = await createSet(newSet);
    res.status(201).json(set);
  } catch (error) {
    res.status(500).json({ message: 'Error creating set', error });
  }
};

module.exports = {
  getSets,
  getSetById,
  createSetController,
};
