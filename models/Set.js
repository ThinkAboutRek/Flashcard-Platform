// models/Set.js
const knex = require('../db/knex');

const getAllSets = () => {
  return knex('sets')
    .select('*')
    .then(sets =>
      sets.map(set => ({
        ...set,
        cards: set.cards ? JSON.parse(set.cards) : [] // Properly parse cards into an array
      }))
    );
};




const getSetById = (id) => {
  return knex('sets')
    .where({ id })
    .first()
    .then(set => {
      if (set) set.cards = set.cards ? JSON.parse(set.cards) : [];
      return set;
    });
};

// Count the number of sets created today for enforcing the maximum requests per day
const countSetsCreatedToday = (today) => {
  return knex('sets').where('created_at', 'like', `${today}%`).count('id as count');
};

// Create a new set
const createSet = (set) => {
  return knex('sets').insert(set).returning('*').then(([newSet]) => {
    newSet.cards = JSON.parse(newSet.cards);
    return newSet;
  });
};

// Update an existing set by ID
const updateSet = (id, set) => {
  return knex('sets').where({ id }).update(set).returning('*').then(([updatedSet]) => {
    updatedSet.cards = JSON.parse(updatedSet.cards);
    return updatedSet;
  });
};

// Delete a set by ID
const deleteSet = (id) => {
  return knex('sets').where({ id }).del();
};

module.exports = { getAllSets, getSetById, countSetsCreatedToday, createSet, updateSet, deleteSet };
