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

app.use(bodyParser.json());

// View Routes (if you are rendering views with EJS)
app.get('/sets', async (req, res) => {
  try {
    const sets = await knex('sets').select('*');
    res.render('index', { sets });
  } catch (error) {
    res.status(500).send('Error fetching sets');
  }
});

// Root route to render the main page
app.get('/', (req, res) => {
  res.redirect('/sets');
});

// API Routes
app.use('/api', usersRoutes); 
app.use('/api', collectionsRoutes);
app.use('/api', setsRoutes);  
app.use('/api', flashcardsRoutes); 
app.use('/api', commentsRoutes);
console.log("API routes have been registered successfully!");

module.exports = app;
