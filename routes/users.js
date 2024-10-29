// routes/users.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/usersController');

// Define API routes for users
router.get('/users', getUsers); // Fetch all users
router.post('/users', createUser); // Create a new user

module.exports = router;
