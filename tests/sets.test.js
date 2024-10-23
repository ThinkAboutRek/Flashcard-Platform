const request = require('supertest');
const app = require('../index');

describe('Flashcard Set Endpoints', () => {
  it('should fetch all flashcard sets', async () => {
    const res = await request(app).get('/api/sets');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new flashcard set', async () => {
    const res = await request(app)
      .post('/api/sets')
      .send({
        name: 'Test Set',
        cards: [{ question: 'What is the capital of France?', answer: 'Paris', difficulty: 'easy' }]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('Test Set');
  });
});
