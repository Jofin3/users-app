const request = require('supertest');
const { app, server } = require('../index');

const jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdmUG1VazdVeENLc2NBUlFOMVVScyJ9.eyJpc3MiOiJodHRwczovL2Rldi1kaHRjc2VjMXY2MTBuZzEwLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNjg1ODMxMDM0MjA3NzAzODA1NiIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJodHRwczovL2Rldi1kaHRjc2VjMXY2MTBuZzEwLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3Mjg1NzA0OTksImV4cCI6MTcyODY1Njg5OSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF6cCI6IkNRNTBhUFd1blFVS3k3cmtCQU9WcldEcHd2T01aMUFOIn0.VWiiC-BbAC1OtcTRQJ0elWdgJNHjPwWzu4A0pLsw2ubyDfb2xPnN5Hw3OubESIet5YS9ove12tFA2Caul88OBuqYCJctheCrcBpDILJqdOY-guj_BFY_UcGNCwij6rCF4eiFZ3u7kZfLSolpchhfxXpY27kyXHpoBpzAFxkS1ldK8w6l68hLYc_VpmOM4hxrOAautGvo158TFrzTWjQ1E975TGsknVjLxHgNmF2CI63O_kQlYYJobK3ZZdnBYnrdNPedutKWxbig9RXs_hVp0RFnb_txNJc6z4IGtv5kVZCPc1MmPUhjDSd9HtLwJjrmFUTuwbnPP4I65dGbpfyH_g';

let testId = 0;

describe('Test the root path', () => {
    test('It should respond with "401" response code if access token is missing', async () => {
        console.log(jwt);
        const response = await request(app)
            .get('/api/users');
        expect(response.statusCode).toBe(401);
    });

    test('It should respond with "200" response code', async () => {
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
