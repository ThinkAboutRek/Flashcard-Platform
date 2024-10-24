// models/Collection.js
const knex = require('../db/knex');

const getAllCollections = async () => {
  return knex('collections').select('*');
};

const getCollectionById = async (id) => {
  return knex('collections').where({ id }).first();
};

const createCollection = async (collection) => {
  return knex('collections').insert(collection).returning('*');
};

module.exports = { getAllCollections, getCollectionById, createCollection };
