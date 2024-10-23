// index.js
const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./db/knex'); 
const setsRoutes = require('./routes/sets');

require('dotenv').config();
const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/sets', setsRoutes);

app.get('/', async (req, res) => {
  const sets = await knex('sets').select('*');
  res.json(sets);
});

module.exports = app;
