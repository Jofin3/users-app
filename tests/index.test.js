const request = require('supertest');
const { app, server } = require('../index');
require('dotenv').config();

let jwt = 0;
let testId = 0;



describe('Test the root path', () => {
    test('It should respond with "401" response code if access token is missing', async () => {
        const response = await request(app)
            .get('/api/users');
        expect(response.statusCode).toBe(401);
    });

    test('It should respond with "200" response code', async () => {
        
        const auth0Response = await request('https://dev-hhi8n1mn61ygvjm5.eu.auth0.com/oauth/token')
        .post('') // POST request
        .set('Content-Type', 'application/x-www-form-urlencoded') // Setting the Content-Type header
        .send({
          grant_type: 'client_credentials', // Sending body parameters
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          audience: 'http://localhost:8080/'
        });
        expect(auth0Response.statusCode).toBe(200);
        expect(auth0Response.body.access_token).toBeTruthy();

        jwt = auth0Response.body.access_token;
        
        console.log(jwt);
        const response = await request(app)
            .get('/api/users')
            .auth(jwt, { type: "bearer" });
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the users endpoints', () => {
    test('It should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .auth(jwt, { type: "bearer" })
            .send({ name: 'John Doe', isAdmin: false, site: 'Almhult' });
        console.log(response.body);
        testId = response.body.id;
        expect(response.body.name).toEqual('John Doe');
        expect(response.statusCode).toBe(201);
    });

    test('It should update a user', async () => {
        const response = await request(app)
            .put('/api/users/' + testId)
            .auth(jwt, { type: "bearer" })
            .send({ isAdmin: true });
        console.log(response.body);
        expect(response.body.name).toEqual('John Doe');
        expect(response.body.isAdmin).toEqual(true);
        expect(response.statusCode).toBe(200);
    });

    test('It should delete a user', async () => {
        const response = await request(app)
            .delete('/api/users/' + testId)
            .auth(jwt, { type: "bearer" });
        console.log(response.body);
        expect(response.body.data).toEqual('The user with id of ' + testId + ' is removed.');
        expect(response.statusCode).toBe(200);
    });

    test('It should not find the deleted user', async () => {
        const response = await request(app)
            .get('/api/users/' + testId)
            .auth(jwt, { type: "bearer" });
        console.log(response.body);
        expect(response.body).toEqual(null);
        expect(response.statusCode).toBe(200);
    });
});

afterAll(done => {
    // Closing the connection allows Jest to exit successfully.
    server.close()
    done()
})
