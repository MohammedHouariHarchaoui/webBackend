import  express  from "express";
import {
    getDistributeurs,
    getDistributeurById,
    createDistributeurWithPack ,
    updateDistributeurWithPack,
    deleteDistributeur
} from '../services/DistributeurM.js'
const router = express.Router();

router.get('/distributeurs',getDistributeurs);
router.get('/distributeurs/:id',getDistributeurById);
router.post('/distributeurs/add',createDistributeurWithPack );
router.patch('/distributeurs/edit/:id',updateDistributeurWithPack);
router.delete('/distributeurs/delete/:id', deleteDistributeur);

export default router;