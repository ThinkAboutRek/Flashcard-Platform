// tests/collections.test.js
const request = require('supertest');
const app = require('../index');
const knex = require('../db/knex');

describe('Collection Endpoints', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  it('should fetch all collections', async () => {
    const res = await request(app).get('/api/collections');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new collection', async () => {
    const res = await request(app)
      .post('/api/collections')
      .send({
        userID: 1, // Replace with a valid user ID
        setID: 1, // Replace with a valid set ID
        comment: 'This collection is great!'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.comment).toBe('This collection is great!');
  });
});
