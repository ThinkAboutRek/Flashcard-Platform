// models/Set.js
const knex = require('../db/knex');

// Get all sets
const getAllSets = () => {
  return knex('sets').select('*');
};

// Get a set by ID
const getSetById = (id) => {
  return knex('sets').where({ id }).first();
};

// Count the number of sets created today For Enforcing the maximum requests per day
const countSetsCreatedToday = (today) => {
  return knex('sets').where('created_at', 'like', `${today}%`).count('id as count');
};

// Create a new set
const createSet = (set) => {
  return knex('sets').insert(set).returning('*');
};

// Update an existing set by ID
const updateSet = (id, set) => {
  return knex('sets').where({ id }).update(set).returning('*');
};

// Delete a set by ID
const deleteSet = (id) => {
  return knex('sets').where({ id }).del();
};

module.exports = { getAllSets, getSetById, countSetsCreatedToday, createSet, updateSet, deleteSet };
