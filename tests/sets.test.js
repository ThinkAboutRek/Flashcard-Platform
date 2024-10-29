const request = require('supertest');
const app = require('../index');
const knex = require('../db/knex');

describe('Flashcard Endpoints', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  it('should fetch all flashcards in a set', async () => {
    const setId = 1; // Replace with a valid set ID from your seeds or database
    const res = await request(app).get(`/api/sets/${setId}/cards`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create a new flashcard in a set', async () => {
    const setId = 1; // Replace with a valid set ID from your seeds or database
    const res = await request(app)
      .post(`/api/sets/${setId}/cards`)
      .send({
        question: 'What is the capital of Spain?',
        answer: 'Madrid',
        difficulty: 'medium'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.question).toBe('What is the capital of Spain?');
  });
});
