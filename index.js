// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const knex = require('./db/knex');
const setsRoutes = require('./routes/sets');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');
const collectionsRoutes = require('./routes/collections');


require('dotenv').config();
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View Routes (rendering EJS views for direct user access)
app.get('/sets', async (req, res) => {
  try {
    const sets = await knex('sets').select('*').then(sets =>
      sets.map(set => ({
        ...set,
        cards: set.cards ? JSON.parse(set.cards) : []
      }))
    );
    res.render('index', { sets });
  } catch (error) {
    res.status(500).send('Error fetching sets');
  }
});





app.get('/users', async (req, res) => {
  try {
    const users = await knex('users').select('*');
    res.render('users', { users });
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

app.get('/collections', async (req, res) => {
  try {
    const collections = await knex('collections').select('*');
    res.render('collections', { collections });
  } catch (error) {
    res.status(500).send('Error fetching collections');
  }
});


app.post('/api/sets/:setId/update', async (req, res) => {
  try {
    const { setId } = req.params;
    const { name, questions, answers } = req.body;

    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      throw new Error('Questions and Answers must be arrays');
    }

    const updatedCards = questions.map((question, index) => ({
      question,
      answer: answers[index],
    }));

    await knex('sets')
      .where({ id: setId })
      .update({ name, cards: JSON.stringify(updatedCards) });

    console.log('Set updated successfully'); // Success message
    res.redirect('/sets');
  } catch (error) {
    console.error('Error updating set:', error);
    res.status(500).json({ message: 'Error updating set', error });
  }
});


app.post('/api/sets/:setId/delete', async (req, res) => {
  try {
    const { setId } = req.params;
    await knex('sets').where({ id: setId }).del();
    res.redirect('/sets');
  } catch (error) {
    res.status(500).send('Error deleting set');
  }
});

// Root route
app.get('/', (req, res) => {
  res.redirect('/sets');
});

// API Routes (mounted directly)
app.use('/api', usersRoutes);
app.use('/api', collectionsRoutes);
app.use('/api', setsRoutes);
app.use('/api', commentsRoutes);

console.log("API and view routes have been registered successfully!");

module.exports = app;
