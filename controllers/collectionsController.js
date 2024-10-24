const knex = require('../db/knex');

// Get all collections
const getCollections = async (req, res) => {
  try {
    const collections = await knex('collections').select('*');
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collections', error });
  }
};

// Create a new collection
const createCollection = async (req, res) => {
  try {
    const { userID, setID, comment } = req.body;
    const newCollection = {
      user_id: userID,
      set_id: setID,
      comment
    };
    const [id] = await knex('collections').insert(newCollection).returning('id');
    res.status(201).json({ id, ...newCollection });
  } catch (error) {
    res.status(500).json({ message: 'Error creating collection', error });
  }
};

module.exports = { getCollections, createCollection };
