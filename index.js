const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./db/knex');
const setsRoutes = require('./routes/sets');
const usersRoutes = require('./routes/users');
const flashcardsRoutes = require('./routes/flashcards');
const commentsRoutes = require('./routes/comments');
const collectionsRoutes = require('./routes/collections');

require('dotenv').config();
const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/sets', setsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api', flashcardsRoutes);
app.use('/api', commentsRoutes);

app.get('/', async (req, res) => {
  const sets = await knex('sets').select('*');
  res.json(sets);
});

module.exports = app;
