import  express  from "express";
import {
    getPublicites,
    getPubliciteById,
    createPublicite,
    updatePublicite,
    deletePublicite
} from '../services/Publicite.js'
const router = express.Router();

router.get('/publicites',getPublicites);
router.get('/publicites/:id',getPubliciteById);
router.post('/publicites/add',createPublicite);
router.patch('/publicites/edit/:id',updatePublicite);
router.delete('/publicites/delete/:id',deletePublicite);

export default router;