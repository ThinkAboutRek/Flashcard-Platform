// controllers/usersController.js
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
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const newUser = {
      username,
      admin: admin || false,
    };

    const [id] = await createUserModel(newUser);
    res.status(201).json({ id, ...newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};


module.exports = { getUsers, createUser };
