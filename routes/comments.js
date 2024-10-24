const express = require('express');
const router = express.Router();
const { addCommentToSet } = require('../controllers/commentsController');

router.post('/:setId/comment', addCommentToSet);

module.exports = router;
