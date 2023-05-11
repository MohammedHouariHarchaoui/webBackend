import  express  from "express";
import {
    getAnnonceurs,
    getAnnonceurById,
    createAnnonceur,
    updateAnnonceur,
    deleteAnnonceur
} from '../services/Annonceur.js'
const router = express.Router();

router.get('/annonceurs',getAnnonceurs);
router.get('/annonceurs/:id',getAnnonceurById);
router.post('/annonceurs/add',createAnnonceur);
router.patch('/annonceurs/edit/:id',updateAnnonceur);
router.delete('/annonceurs/delete/:id',deleteAnnonceur);

export default router;