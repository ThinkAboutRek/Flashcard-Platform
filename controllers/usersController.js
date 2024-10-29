const { getAllUsers, createUser: createUserModel } = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, admin } = req.body;
    const newUser = {
      username,
      admin: admin || false,
    };

    const [id] = await createUserModel(newUser);
    res.status(201).json({ id, ...newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

module.exports = { getUsers, createUser };
