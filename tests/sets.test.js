const request = require('supertest');
const app = require('../index');
const knex = require('../db/knex');

let server;

beforeAll(async () => {
  server = app.listen(4000, () => {
    console.log('Test server running on http://localhost:4000');
  });
  await knex.migrate.latest(); 
});

afterAll(async () => {
  await server.close(); 
  await knex.destroy(); 
});

describe('Flashcard Set Endpoints', () => {
  it('should fetch all flashcard sets', async () => {
    const res = await request(server).get('/api/sets');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new flashcard set', async () => {
    const res = await request(server)
      .post('/api/sets')
      .send({
        name: 'Test Set',
        cards: [{ question: 'What is the capital of France?', answer: 'Paris', difficulty: 'easy' }]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('Test Set');
  });
});
