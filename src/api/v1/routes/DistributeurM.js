import  express  from "express";
import {
    getDistributeurs,
    getDistributeurById,
    createDistributeur,
    updateDistributeur,
    deleteDistributeur
} from '../services/DistributeurM.js'
const router = express.Router();

router.get('/distributeurs',getDistributeurs);
router.get('/distributeurs/:id',getDistributeurById);
router.post('/distributeurs/add',createDistributeur);
router.patch('/distributeurs/edit/:id',updateDistributeur);
router.delete('/distributeurs/delete/:id',deleteDistributeur);

export default router;