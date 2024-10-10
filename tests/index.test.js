const request = require('supertest');
const {app, server} = require('../index');

describe('Test the root path', () => {
  test('It should respond with "200" response code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the users endpoints', () => {
  test('It should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', isAdmin: false, site: 'Almhult' });
    //expect(response.body).toEqual({ name: 'John Doe', email: 'john.doe@example.com' });
    expect(response.statusCode).toBe(201);
  });

  test('It should update a user', async () => {
    const response = await request(app)
      .put('/api/users/6')
      .send({ isAdmin: 'false' });
    //expect(response.body).toEqual({ id: '123', name: 'Jane Doe', email: 'jane.doe@example.com' });
    expect(response.statusCode).toBe(200);
  });

  test('It should delete a user', async () => {
    const response = await request(app).delete('/api/users/123');
    expect(response.body).toEqual({ id: '123' });
    expect(response.statusCode).toBe(200);
  });
});

afterAll(done => {
  // Closing the connection allows Jest to exit successfully.
  server.close()
  done()
})
