// tests/users.test.js
const request = require('supertest');
const app = require('../index');
const knex = require('../db/knex');

describe('User Endpoints', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  it('should fetch all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'unique_username_123', 
        admin: false
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toBe('unique_username_123');
  });
  
});
