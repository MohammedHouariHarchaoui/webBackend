import * as dashboardTest from "../../src/api/v1/services/dashboard.js";

var myObj = {
    attributeDistr: async function(Obj) {
        return await dashboardTest.attributeDistr(Obj)
    },
    addDistributeur: async function(Obj) {
        return await dashboardTest.addDistributeur(Obj)
    },
    editDistributeur: async function(Obj) {
        return await dashboardTest.editDistributeur(Obj)
    },
    deleteDistributeur: async function(Obj) {
        return await dashboardTest.deleteDistributeur(Obj)
    }
    
  }

describe("Attribuer Distributeur", function() {
    var ObjTest;
    beforeEach(()=>{
        ObjTest={"id":1,"idDistr":2}
    })
    it("Attribution réussit", async function() {
       
        var spy = spyOn(myObj,'attributeDistr').and.returnValue(true);
        expect(myObj.attributeDistr(ObjTest)).toEqual(true);
    });
    it("Attribution échouée", async function() {
       
        var spy = spyOn(myObj,'attributeDistr').and.returnValue(false);
        expect(myObj.attributeDistr(ObjTest)).not.toEqual(true);
    });
  });

  describe("Ajout Distributeur", function() {
    var ObjTest;
    beforeEach(()=>{
        ObjTest={"id":1,"idDistr":2}
    })
    it("Ajout d'un distributeur réussi", async function() {
       
        var spy = spyOn(myObj,'addDistributeur').and.returnValue(true);
        expect(myObj.addDistributeur(ObjTest)).toEqual(true);
    });
    it("Ajout d'un distributeur échoué", async function() {
       
        var spy = spyOn(myObj,'addDistributeur').and.returnValue(false);
        expect(myObj.addDistributeur(ObjTest)).not.toEqual(true);
    });
  });
  describe("Modification Distributeur", function() {
    var ObjTest;
    beforeEach(()=>{
        ObjTest={"id":1,"idDistr":2}
    })
    it("modification réussit", async function() {
       
        var spy = spyOn(myObj,'editDistributeur').and.returnValue(true);
        expect(myObj.editDistributeur(ObjTest)).toEqual(true);
    });
    it("Attribution échouée", async function() {
       
        var spy = spyOn(myObj,'editDistributeur').and.returnValue(false);
        expect(myObj.editDistributeur(ObjTest)).not.toEqual(true);
    });
  });

  describe("Suppression Distributeur", function() {
    var ObjTest;
    beforeEach(()=>{
        ObjTest={"id":1,"idDistr":2}
    })
    it("Suppression distributeur réussi", async function() {
       
        var spy = spyOn(myObj,'deleteDistributeur').and.returnValue(true);
        expect(myObj.deleteDistributeur(ObjTest)).toEqual(true);
    });
    it("Suppression distributeur échoué", async function() {
       
        var spy = spyOn(myObj,'deleteDistributeur').and.returnValue(false);
        expect(myObj.deleteDistributeur(ObjTest)).not.toEqual(true);
    });
  });
      
  
  