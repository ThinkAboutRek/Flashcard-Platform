const request = require('supertest');
const app = require('../index');
const knex = require('../db/knex');

let server;

beforeAll(async () => {
  server = app.listen(4001, () => {
    console.log('Test server running on http://localhost:4001');
  });
  await knex.migrate.latest();
});

afterAll(async () => {
  await server.close();
  await knex.destroy();
});

describe('Users Endpoints', () => {
  it('should fetch all users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'john_doe',
        admin: false
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toBe('john_doe');
  });
});
