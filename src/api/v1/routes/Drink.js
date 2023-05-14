import  express  from "express";
import {
    getDrinks,
    getDrinkById,
    createDrink,
    updateDrink,
    deleteDrink,
    getDrinkByIdEntreprise
} from '../services/Drink.js'
const router = express.Router();

router.get('/drinks',getDrinks);
router.get('/drinks/:id',getDrinkById);
router.get('/drinks/entreprises/:id',getDrinkByIdEntreprise);
router.post('/drinks/add',createDrink);
router.patch('/drinks/edit/:id',updateDrink);
router.delete('/drinks/delete/:id',deleteDrink);

export default router;