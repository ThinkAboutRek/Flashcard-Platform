// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const knex = require('./db/knex');
const setsRoutes = require('./routes/sets');
const usersRoutes = require('./routes/users');
const flashcardsRoutes = require('./routes/flashcards');
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
    const sets = await knex('sets').select('*');
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

app.get('/flashcards', async (req, res) => {
  try {
    const flashcards = await knex('flashcards').select('*');
    res.render('flashcards', { flashcards });
  } catch (error) {
    res.status(500).send('Error fetching flashcards');
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
app.use('/api', flashcardsRoutes);
app.use('/api', commentsRoutes);

console.log("API and view routes have been registered successfully!");

module.exports = app;
