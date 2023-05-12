import  express  from "express";

import { createCategorieDrink, getCategorieDrinkById , deleteCategorieDrink, getCategoriesDrink, updateCategorieDrink } from "../services/CategRecette.js";
const router = express.Router();

router.get('/categoriesDrink',getCategoriesDrink);
router.get('/categoriesDrink/:id',getCategorieDrinkById);
router.post('/categoriesDrink/add',createCategorieDrink);
router.patch('/categoriesDrink/edit/:id',updateCategorieDrink);
router.delete('/categoriesDrink/delete/:id',deleteCategorieDrink);

export default router;