import  express  from "express";
import {
    getCategories,
    getCategorieById,
    createCategorie,
    updateCategorie,
    deleteCategorie
} from '../services/Categorie.js'
const router = express.Router();

router.get('/categories',getCategories);
router.get('/categories/:id',getCategorieById);
router.post('/categories/add',createCategorie);
router.patch('/categories/edit/:id',updateCategorie);
router.delete('/categories/delete/:id',deleteCategorie);

export default router;