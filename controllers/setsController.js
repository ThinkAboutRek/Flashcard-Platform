const knex = require('../db/knex');

// Get all sets
const getSets = async (req, res) => {
  const sets = await knex('sets').select('*');
  res.json(sets);
};

// Create a new set
const createSet = async (req, res) => {
  try {
    const { name, cards } = req.body;
    const newSet = {
      name,
      cards: JSON.stringify(cards), // Store cards as JSON
    };

    const [id] = await knex('sets').insert(newSet);
    res.status(201).json({ id, ...newSet });
  } catch (error) {
    res.status(500).json({ message: 'Error creating set', error });
  }
};

module.exports = { getSets, createSet };
