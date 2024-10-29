// controllers/commentsController.js
const { createComment } = require('../models/Comment');

// Add a comment to a set
const addCommentToSet = async (req, res) => {
  try {
    const { comment } = req.body;
    const { setId } = req.params;
    const userId = 1; // Assuming userId = 1 for testing purposes; replace with actual authentication later

    const newComment = {
      comment,
      set_id: setId,
      user_id: userId,
    };

    const [id] = await createComment(newComment);
    res.status(201).json({ id, ...newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

module.exports = { addCommentToSet };
