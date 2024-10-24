// controllers/setsController.js
const { getAllSets, countSetsCreatedToday, createSet } = require('../models/Set');

// Get all sets
const getSets = async (req, res) => {
  try {
    const sets = await getAllSets();
    res.json(sets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sets', error });
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

    const [id] = await createSet(newSet); 
    res.status(201).json({ id, ...newSet });
  } catch (error) {
    res.status(500).json({ message: 'Error creating set', error });
  }
};

module.exports = { getSets, createSetController };
