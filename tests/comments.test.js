const request = require('supertest');
const app = require('../index');
const knex = require('../db/knex');

let server;

beforeAll(async () => {
  server = app.listen(4001, () => {
    console.log('Test server running on http://localhost:4001');
  });
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await server.close();
  await knex.destroy();
});

describe('Comments Endpoints', () => {
  it('should add a comment to a flashcard set', async () => {
    // Assuming we have a set with ID 1 and a user with ID 1
    const res = await request(server)
      .post('/api/1/comment')
      .send({
        comment: 'This set is really helpful!'
      })
      .set('Authorization', 'Bearer mockTokenForUser1'); // Assuming JWT or similar authentication
    expect(res.statusCode).toEqual(201);
    expect(res.body.comment).toBe('This set is really helpful!');
  });
});
