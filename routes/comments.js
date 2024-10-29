// routes/comments.js
const express = require('express');
const router = express.Router();
const { addCommentToSet } = require('../controllers/commentsController');

router.post('/sets/:setId/comment', addCommentToSet); // Add a comment to a specific set

module.exports = router;
