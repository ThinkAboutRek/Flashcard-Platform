// models/Comment.js
const knex = require('../db/knex');

const getAllCommentsForSet = (setId) => {
  return knex('comments').where({ set_id: setId }).select('*');
};

const createComment = (comment) => {
  return knex('comments').insert(comment).returning('*');
};

module.exports = { getAllCommentsForSet, createComment };
