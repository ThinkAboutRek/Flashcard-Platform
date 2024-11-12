// controllers/collectionsController.js
const { getAllCollections, createCollection: createCollectionModel } = require('../models/Collection');

// Get all collections
const getCollections = async (req, res) => {
  try {
    console.log("Fetching all collections...");
    const collections = await getAllCollections();
    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ message: 'Error fetching collections', error });
  }
};

// Create a new collection
const createCollection = async (req, res) => {
  try {
    const { userID, setID, comment } = req.body;
    console.log(`Creating collection for user ${userID}, set ${setID} with comment: ${comment}`);
    const newCollection = {
      user_id: userID,
      set_id: setID,
      comment
    };
    const [id] = await createCollectionModel(newCollection);
    console.log("Created collection with ID:", id);
    res.status(201).json({ id, ...newCollection });
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ message: 'Error creating collection', error });
  }
};

module.exports = { getCollections, createCollection };
