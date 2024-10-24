const knex = require('../db/knex');

// Get all users
const getUsers = async (req, res) => {
  const users = await knex('users').select('*');
  res.json(users);
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, admin } = req.body;
    const newUser = {
      username,
      admin: admin || false,
    };

    const [id] = await knex('users').insert(newUser);
    res.status(201).json({ id, ...newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

module.exports = { getUsers, createUser };
