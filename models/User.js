// models/User.js
const knex = require('../db/knex');

const getAllUsers = () => {
  return knex('users').select('*');
};

const getUserById = (id) => {
  return knex('users').where({ id }).first();
};

const createUser = (user) => {
  return knex('users').insert(user).returning('*');
};

const updateUser = (id, user) => {
  return knex('users').where({ id }).update(user).returning('*');
};

const deleteUser = (id) => {
  return knex('users').where({ id }).del();
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
