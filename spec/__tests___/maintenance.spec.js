
import pkg from 'request';
const { get } = pkg;

/*
describe("Server", ()=> {
    var toTest;
    describe("GET /maintenance/tasks", () => {
        var data = {};
        beforeAll((done)=> {
            get("http://localhost:5000/maintenance/tasks", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                toTest = [
                    {
                        "id": 1,
                        "idDistr": 1,
                        "idUser": 4,
                        "idEntre": 1,
                        "idType": 1,
                        "isDone": false,
                        "message": "Niveau de café est vide"
                    },
                    {
                        "id": 2,
                        "idDistr": 1,
                        "idUser": 4,
                        "idEntre": 1,
                        "idType": 2,
                        "isDone": false,
                        "message": null
                    }
                ];
                done();
            });
        });
        it("Status 200", ()=> {
            expect(data.status).toBe(200);
        });
        it("Getting drinks", ()=> {
            expect(data.body).toEqual(toTest);
        });
    });
    describe("GET /maintenance/tasks/state/unassigned", () => {
        var data = {};
        beforeAll((done)=> {
            get("http://localhost:5000/maintenance/tasks/state/unassigned", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                toTest = [
                    {
                        "id": 4,
                        "nom": "Agent",
                        "prenom": "Maintenance",
                        "mail": "agent@maintenance.com",
                        "mdp": "maintenancier",
                        "tel": "0574123698",
                        "idRole": 3,
                        "idCreatedpar": null,
                        "idEntreprise": 1,
                        "isActive": 1
                    }
                ];
                done();
            });
        });
        it("Status 200", ()=> {
            expect(data.status).toBe(200);
        });
        it("Getting drinks", ()=> {
            expect(data.body).toEqual(toTest);
        });
    });
});*/