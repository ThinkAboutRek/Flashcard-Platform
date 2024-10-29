// models/Collection.js
const knex = require('../db/knex');

// Get all collections
const getAllCollections = () => {
  return knex('collections').select('*');
};

// Get a collection by ID
const getCollectionById = (id) => {
  return knex('collections').where({ id }).first();
};

// Create a new collection
const createCollection = (collection) => {
  return knex('collections').insert(collection).returning('*');
};

// Update an existing collection by ID
const updateCollection = (id, collection) => {
  return knex('collections').where({ id }).update(collection).returning('*');
};

// Delete a collection by ID
const deleteCollection = (id) => {
  return knex('collections').where({ id }).del();
};

module.exports = { getAllCollections, getCollectionById, createCollection, updateCollection, deleteCollection };
