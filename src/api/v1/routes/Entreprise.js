import  express  from "express";
import {
    getEntreprises,
    getEntrepriseById,
    createEntreprise,
    updateEntreprise,
    deleteEntreprise
} from '../services/Entreprise.js'
const router = express.Router();

router.get('/entreprises',getEntreprises);
router.get('/entreprises/:id',getEntrepriseById);
router.post('/entreprises/add',createEntreprise);
router.patch('/entreprises/edit/:id',updateEntreprise);
router.delete('/entreprises/delete/:id',deleteEntreprise);

export default router;