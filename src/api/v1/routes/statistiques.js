import  express  from "express";
import {
    statMois
} from '../services/statistiques.js'
const router = express.Router();

router.get('/StatMois',statMois);


export default router;