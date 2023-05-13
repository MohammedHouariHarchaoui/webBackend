import express, { json } from "express";
import morgan from "morgan";
import pkg from 'config';
import cors from "cors";
import { PrismaClient } from '@prisma/client';

import RouterDistributer from "./src/api/v1/routes/distributeur.js";
import RouterMaintenance from "./src/api/v1/routes/maintenance.js";
import RouterDashboard from "./src/api/v1/routes/dashboard.js";
import RouterAnnonceur from './src/api/v1/routes/Annonceur.js'
import RouterCategorie from './src/api/v1/routes/Categorie.js'
import RouterPublicite from './src/api/v1/routes/Publicite.js'
import RouterDrink from './src/api/v1/routes/Drink.js'
import RouterAuthentification from './src/api/v1/routes/Authentification.js'
import RouterCategorieDrink from './src/api/v1/routes/CategRecette.js'
import RouterDistributeur from './src/api/v1/routes/DistributeurM.js'
import RouterEntreprise from './src/api/v1/routes/Entreprise.js'
import RouterPack from './src/api/v1/routes/Packet.js'
import RouterUser from './src/api/v1/routes/User.js'
import RouterRole from './src/api/v1/routes/Role.js'

const { get } = pkg;
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(json());
app.use(morgan("tiny"));

app.use("/distributeur", RouterDistributer);
app.use("/maintenance", RouterMaintenance);
app.use("/dashboard", RouterDashboard);
app.use(RouterAnnonceur)
app.use(RouterCategorie)
app.use(RouterPublicite)
app.use(RouterDrink)
app.use(RouterAuthentification)
app.use(RouterCategorieDrink)
app.use(RouterDistributeur)
app.use(RouterEntreprise)
app.use(RouterPack)
app.use(RouterUser)
app.use(RouterRole)

// app.get('/users', async (req, res) => {
//   const users = await prisma.users.findMany()
//   res.json(users)
// })


const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
var server = app.listen(PORT, () => {
  console.log(`running on PORT : ${PORT} at : ${HOSTNAME}`);
});

export default server;