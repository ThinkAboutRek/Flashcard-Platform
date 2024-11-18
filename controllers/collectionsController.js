// controllers/collectionsController.js
const { getAllCollections, createCollection: createCollectionModel, updateCollection: updateCollectionModel, deleteCollection: deleteCollectionModel } = require('../models/Collection');

// Get all collections
const getCollections = async (req, res) => {
  try {
    const collections = await getAllCollections();
    res.render('collections', { collections });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collections', error });
  }
};

// Create a new collection
const createCollection = async (req, res) => {
  try {
    const { userID, setID, comment } = req.body;
    const newCollection = { user_id: userID, set_id: setID, comment };
    await createCollectionModel(newCollection);
    res.redirect('/collections');
  } catch (error) {
    res.status(500).json({ message: 'Error creating collection', error });
  }
};

// Update a collection
const updateCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { userID, setID, comment } = req.body;
    const updatedCollection = { user_id: userID, set_id: setID, comment };
    await updateCollectionModel(collectionId, updatedCollection);
    res.redirect('/collections');
  } catch (error) {
    res.status(500).json({ message: 'Error updating collection', error });
  }
};

// Delete a collection
const deleteCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    await deleteCollectionModel(collectionId);
    res.redirect('/collections');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting collection', error });
  }
};

module.exports = { getCollections, createCollection, updateCollection, deleteCollection };
