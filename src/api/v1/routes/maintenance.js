import { Router } from "express";
import { getTasks, getTaskInfo, getTasksFree, getTasksAM, userInfo, assignTaskAM, switchStateTask } from "../services/maintenace.js";

const router = Router();

router.get(
  "/tasks/:id",
  async (req, res) => {
    try {
      console.log("Getting All Tasks");
      let info = await getTasks(req.params);
      res.status(200).send(info);
    } catch (e) {
      console.log(e);
      res.status(404).send({ message: "Failed !!" });
    }
  }
);

router.get(
    "/tasks/task/:id",
    async (req, res) => {
      try {
        console.log("Getting info Task");
        let info = await getTaskInfo(req.params.id);
        console.log(req.body);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  
  router.get(
    "/tasks/state/unassigned/:id",
    async (req, res) => {
      try {
        console.log("Getting Drink of category");
        let info = await getTasksFree(req.params.id);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
   
  router.get(
    "/AM/tasks/:id",
    async (req, res) => {
      try {
        console.log("Getting AM Tasks");
        let info = await getTasksAM(req.params.id);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );

  router.get(
    "/users/:id",
    async (req, res) => {
      try {
        console.log("Getting User infos");
        let info = await userInfo(req.params.id);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  
  router.get(
    "/tasks/AM/assign",
    async (req, res) => {
      try {
        console.log("Assign Task to AM");
        let info = await assignTaskAM(req.body);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );

  router.get(
    "/tasks/AM/task/state/:id",
    async (req, res) => {
      try {
        console.log("Switch State to Task");
        let info = await switchStateTask(req.params.id);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  
  


export default router;