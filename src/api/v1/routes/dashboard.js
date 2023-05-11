import { Router } from "express";

import { getDistributeurs, getInfoDistributeur, attributeDistr, addDistributeur, editDistributeur, getADM, addClient, getAdmins, deleteAccount, addAdmin, deleteDistributeur,getAccount, addAccount, editAccount, affecterClient, getClients, editClient, getPack, editPack, getNbTask } from "../services/dashboard.js";

const router = Router();


router.post(
    "/distributeurs/add",
    async (req, res) => {
      try {
        console.log("Ajout d'un nouveau distributeur");
        let info = await addDistributeur(req.body);
        res.status(200).send({ message: "distributeur ajouté !!",id:info.id });
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'ajouter un distributeur !!" });
      }
    }
  );
  
  router.put(
    "/distributeur/edit/:id",
    async (req, res) => {
      try {
        console.log("Modification d'un distributeur");
        console.log(req.params.id);
        let info = await editDistributeur(req.body,req.params.id);
        res.status(200).send({ message: "distributeur modifié !!"});
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible de modifier le distributeur !!" });
      }
    }
  )
  router.delete(
    "/distributeur/delete/:id",
    async (req, res) => {
      try {
        console.log("Modification d'un distributeur");
        console.log(req.params.id);
        let info = await deleteDistributeur(req.params.id);
        if(info == null)
        {
          res.status(404).send({ message: "distributeur inexistant !!"}); 
          return; 
        }
        res.status(200).send({ message: "distributeur supprimée !!"});
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible de supprimer le distributeur !!" });
      }
    }
  )

  router.get(
    "/distributeurs",
    async (req, res) => {
      try {
        console.log("Liste des distributeurs");
        let info = await getDistributeurs();
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'envoyer la liste des distributeurs !!" });
      }
    }
  );
  router.get(
    "/users",
    async (req, res) => {
      try {
        console.log("Liste des ADM");
        let info = await getADM();
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'envoyer la liste des ADMs !!" });
      }
    }
  );
  router.get(
    "/clients",
    async (req, res) => {
      try {
        console.log("Liste des clients");
        let info = await getClients();
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'envoyer la liste des clients !!" });
      }
    }
  );

  router.post(
    "/distributeurs/attr/:id",
    async (req, res) => {
      try {
        console.log("Attribution d'un distributeur");
        console.log(req.params.id,req.body);
        let info = await attributeDistr(req.body,req.params.id);
        res.status(200).send({ message: "distributeur attribué !!",client:info });
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'attribuer un distributeur !!" });
      }
    }
  );

  router.get(
    "/distributeur/info",
    async (req, res) => {
      try {
        console.log("Liste des distributeurs");
        let info = await getInfoDistributeur(req.body);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'envoyer les informations du distributeur !!" });
      }
    }
  );
  
  router.post(
    "/clients/add",
    async (req, res) => {
      try {
        console.log("Ajout d'un nouveau client");
        let info = await addClient(req.body);
        res.status(200).send({ message: "client ajouté !!",id:info.id });
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'ajouter le client !!" });
      }
    }
  );
  router.post(
    "/admins/add",
    async (req, res) => {
      try {
        console.log("Ajout d'un nouveau admin");
        let info = await addAdmin(req.body);
        res.status(200).send({ message: "Admin ajouté !!",id:info.id });
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'ajouter l'admin !!" });
      }
    }
  );

  router.get(
    "/admins/info",
    async (req, res) => {
      try {
        console.log("Liste des ADM");
        let info = await getAdmins();
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'envoyer la liste des ADMs !!" });
      }
    }
  );
  router.post(
    "/account/add",
    async (req, res) => {
      try {
        console.log("Ajout d'un nouveau compte");
        let info = await addAccount(req.body);
        res.status(200).send({ message: "compte ajouté !!",id:info.id });
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'ajouter le compte !!" });
      }
    }
  );
  router.put(
    "/account/edit/:id",
    async (req, res) => {
      try {
        console.log("Modification d'un compte");
        console.log(req.params.id);
        let info = await editAccount(req.body,req.params.id);
        res.status(200).send({ message: "compte modifié !!"});
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible de modifier le compte !!" });
      }
    }
  );
  router.put(
    "/clients/edit/:id",
    async (req, res) => {
      try {
        console.log("Modification d'un client");
        console.log(req.params.id);
        let info = await editClient (req.body,req.params.id);
        res.status(200).send({ message: "client modifié !!"});
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible de modifier le client !!" });
      }
    }
  );

  router.get(
    "/accounts/:idRole",
    async (req, res) => {
      try {
        console.log("Liste des comptes");
        let info = await getAccount(req.params.idRole);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'envoyer la liste des comptes !!" });
      }
    }
  );

  router.delete(
    "/users/delete/:id",
    async (req, res) => {
      try {
        console.log("Suppression d'un compte");
        console.log(req.params.id);
        let info = await deleteAccount(req.params.id);
        if(info == null)
        {
          res.status(404).send({ message: "compte inexistant !!"}); 
          return; 
        }
        res.status(200).send({ message: "compte supprimée !!"});
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible de supprimer le compte !!" });
      }
    }
  );

  router.post(
    "/admins/affecteClient/:id",
    async (req, res) => {
      try {
        console.log("Affectation d'un client à un admin");
        console.log(req.body,req.params.id);
        let info = await affecterClient(req.body,req.params.id);
        res.status(200).send({ message: "client affecté !!",client:info });
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Impossible d'affecter le client à cet admin !!" });
      }
    }
  );



 router.get(
  "/pack/:id",
  async (req, res) => {
    try {
      console.log("Liste des distributeurs du pack ");
      let info = await getPack(req.params.id);
      res.status(200).send(info);
    } catch (e) {
      console.log(e);
      res.status(404).send({ message: "Impossible d'envoyer la liste des distributeurs !!" });
    }
  }
);

router.put(
  "/pack/edit/:id",
  async (req, res) => {
    try {
      console.log("Modification d'un pack");
      
      let info = await editPack (req.body,req.params.id);
      console.log(info);
      res.status(200).send({ message: " modifié !!"});
    } catch (e) {
      console.log(e);
      res.status(404).send({ message: "Impossible de modifier  !!" });
    }
  }
);

router.get(
  "/tasks/:id",
  async (req, res) => {
    try {
      console.log("Nombre de tasks resolus");
      let info = await getNbTask(req.params.id);
      res.status(200).json(info);
    } catch (e) {
      console.log(e.message);
      res.status(404).send({ message: "Impossible d'envoyer le nombre de tasks !!" });
    }
  }
);
export default router;