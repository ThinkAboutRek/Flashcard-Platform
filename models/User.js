// models/User.js
const knex = require('../db/knex');

// Get all users
const getAllUsers = () => {
  return knex('users').select('*');
};

// Get a user by ID
const getUserById = (id) => {
  return knex('users').where({ id }).first();
};

// Create a new user
const createUser = (user) => {
  return knex('users').insert(user).returning('*');
};

// Update an existing user by ID
const updateUser = (id, user) => {
  return knex('users').where({ id }).update(user).returning('*');
};

// Delete a user by ID
const deleteUser = (id) => {
  return knex('users').where({ id }).del();
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
