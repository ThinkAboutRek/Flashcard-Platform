// routes/users.js
const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/usersController');

// Define API routes for users
router.get('/users', getUsers);            // Fetch all users
router.get('/users/:id', getUser);          // Fetch a single user by ID
router.post('/users', createUser);          // Create a new user
router.post('/users/:id/update', updateUser);  // Update an existing user
router.post('/users/:id/delete', deleteUser);  // Delete a user

module.exports = router;
