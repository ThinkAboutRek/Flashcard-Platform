const knex = require('../db/knex');

// Add a comment to a set
const addCommentToSet = async (req, res) => {
  try {
    const { comment } = req.body;
    const { setId } = req.params;
    const userId = req.user.id; // assuming authentication is handled

    const newComment = {
      comment,
      set_id: setId,
      user_id: userId,
    };

    const [id] = await knex('comments').insert(newComment);
    res.status(201).json({ id, ...newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

module.exports = { addCommentToSet };
