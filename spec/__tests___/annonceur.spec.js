//import superTest from 'supertest';
//import app from '../../index.js';

//const request = superTest(app);
const route = "http://localhost:5000/annonceurs";

import pkg from 'request';
const { get, post } = pkg;

const annonceurTest = {
    "nom": "Test",
    "prenom": "Test",
    "mail": "Test@example.com",
    "tel": "123456789",
    "idCreatedpar": 1
};

describe("Annonceur's tests", () => {
    describe("POST 200 Distributeur/log?ditributeurId=id", () => {
        var data = {};
        beforeAll((done) => {
            const id = "0A1Z4";
            const url = route;
            get(url, (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it("Should return status 200", () => {
            const toTest =
            {
                "codeverou": "12345"
            };
            expect(data.status).toBe(200);

        });
        it("Should return status 404", () => {


        });
    });
    /*describe(`POST ${route}/add`, () => {
        it('should return 201', async () => {
            const response = await request.post(route + '/add').send(annonceurTest);
            expect(response.status).toBe(201);
            annonceurTest.id = response.body.id; // Assign the id property
        });

        it('should return 400', async () => {
            const response = await request.post(route + '/add').send({});
            expect(response.status).toBe(400);
        });
    });

    describe(`GET ${route}/:id`, () => {
        it('should return 200', async () => {
            const response = await request.get(`${route}/${annonceurTest.id}`);
            expect(response.status).toBe(200);
        });

        it('should return 404', async () => {
            const response = await request.get(`${route}/999`);
            expect(response.status).toBe(404);
        });
    });

    describe(`PATCH ${route}/edit/:id`, () => {
        it('should return 200', async () => {
            const updatedAnnonceurTest = {
                ...annonceurTest,
                nom: "Updated"
            };
            const response = await request.patch(`${route + '/edit'}/${annonceurTest.id}`).send(updatedAnnonceurTest);
            expect(response.status).toBe(200);
        });

        it('should return 400', async () => {
            const response = await request.patch(`${route + '/edit'}/${annonceurTest.id}`).send();
            expect(response.status).toBe(400);
        });
    });

    describe(`DELETE ${route}/delete/:id`, () => {
        it('should return 200', async () => {
            const response = await request.delete(`${route + '/delete'}/${annonceurTest.id}`);
            expect(response.status).toBe(200);
        });

        it('should return 400', async () => {
            const response = await request.delete(`${route + '/delete'}/${annonceurTest.id}`);
            expect(response.status).toBe(400);
        });
    });*/
});
