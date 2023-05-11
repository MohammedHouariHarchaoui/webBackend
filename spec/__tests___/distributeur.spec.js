
import pkg from 'request';
const { get } = pkg;
import * as distributeurTest from "../../src/api/v1/services/distributeur.js";

var myObj = {
    getCategories: async function(Obj) {
        return await distributeurTest.getCategories()
    },
    getDrinkCategory: async function(Obj) {
        return await distributeurTest.getDrinkCategory()
    }
  }
describe("Server", ()=> {
    var toTest;
    describe("GET /Distributeur/topping", () => {
        var data = {};
        beforeAll((done)=> {
            get("http://localhost:5000/Distributeur/topping", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                toTest = [{"id":1,"type":2,"description":"Sucre","prixUnit":5}];
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
    describe("GET /Distributeur/categories", () => {
        var data = {};
        beforeAll((done)=> {
            get("http://localhost:5000/Distributeur/categories", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                toTest = [
                    {
                        "id": 1,
                        "description": "Cafe"
                    },
                    {
                        "id": 2,
                        "description": "Lait"
                    },
                    {
                        "id": 3,
                        "description": "The"
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
    
    describe("GET /Distributeur/ingredients", () => {
        var data = {};
        beforeAll((done)=> {
            get("http://localhost:5000/Distributeur/ingredients", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                toTest = [];
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

    describe("GET /Distributeur/ingredients", () => {
        var data = {};
        beforeAll((done)=> {
            get("http://localhost:5000/Distributeur/ingredients", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                toTest = [];
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
});

/*describe("GET /Distributeur/drink/:id", () => {
        var data = {};
        beforeAll((done)=> {
            get("http://localhost:5000/Distributeur/drink/:id",  (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                toTest = [
                    {
                        "id": 1,
                        "idCategRecette": 1,
                        "description": "Long Coffee"
                    },
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
    });*/