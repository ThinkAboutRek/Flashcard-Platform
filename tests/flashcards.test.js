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

describe('Flashcards Endpoints', () => {
  it('should fetch all flashcards in a set', async () => {
    // Assuming we have a set with ID 1
    const res = await request(server).get('/api/1/cards');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new flashcard in a set', async () => {
    // Assuming we have a set with ID 1
    const res = await request(server)
      .post('/api/1/cards')
      .send({
        question: 'What is the capital of Spain?',
        answer: 'Madrid',
        difficulty: 'easy'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.question).toBe('What is the capital of Spain?');
  });
});
