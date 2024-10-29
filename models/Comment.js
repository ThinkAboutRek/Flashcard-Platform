// models/Comment.js
const knex = require('../db/knex');

// Get all comments for a set
const getAllCommentsForSet = (setId) => {
  return knex('comments').where({ set_id: setId }).select('*');
};

// Get a comment by ID
const getCommentById = (id) => {
  return knex('comments').where({ id }).first();
};

// Create a new comment
const createComment = (comment) => {
  return knex('comments').insert(comment).returning('*');
};

// Delete a comment by ID
const deleteComment = (id) => {
  return knex('comments').where({ id }).del();
};

module.exports = { getAllCommentsForSet, getCommentById, createComment, deleteComment };
