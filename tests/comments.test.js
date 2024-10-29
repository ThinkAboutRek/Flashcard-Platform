// tests/comments.test.js
const request = require('supertest');
const app = require('../index');
const knex = require('../db/knex');

describe('Comment Endpoints', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  it('should add a comment to a flashcard set', async () => {
    const res = await request(app)
      .post('/api/sets/1/comment') // Replace "1" with a valid set ID from your database or seeds
      .send({
        comment: 'This set is really helpful!'
      })
      .set('Authorization', 'Bearer mockTokenForUser1'); // Assuming JWT or similar authentication
    expect(res.statusCode).toEqual(201);
    expect(res.body.comment).toBe('This set is really helpful!');
  });
});
