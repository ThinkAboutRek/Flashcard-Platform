// controllers/usersController.js
const { getAllUsers, getUserById, createUser: createUserModel, updateUser: updateUserModel, deleteUser: deleteUserModel } = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a single user by ID
const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, admin } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const newUser = {
      username,
      admin: admin === 'true' // Set admin to true if checked, otherwise false
    };

    const [id] = await createUserModel(newUser);
    res.redirect('/users');
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update an existing user
  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, admin } = req.body;

      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }

      const updatedUser = {
        username,
        admin: admin === 'true' // Explicitly set admin as boolean based on checkbox
      };

      await updateUserModel(id, updatedUser);
      res.redirect('/users');
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: 'Error updating user', error });
    }
  };

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await deleteUserModel(req.params.id);
    res.redirect('/users');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
