import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getCategoriesDrink = async (req , res)=>{
    try {
        const response = await prisma.categoryrecette.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const getCategorieDrinkById = async (req , res)=>{
    try {
        const response = await prisma.categoryrecette.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg :error.msg});
    }
}

export const createCategorieDrink = async (req , res)=>{
    const {description} = req.body;
    try {
        const categorie_obj = await prisma.categoryrecette.create({
            data:{
                description: description
            }
        });
        res.status(201).json(categorie_obj);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const updateCategorieDrink = async (req , res)=>{
    const {description} = req.body;
    try {
        const categorie_obj = await prisma.categoryrecette.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                description: description
            }
        });
        res.status(201).json(categorie_obj);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const deleteCategorieDrink = async (req , res)=>{
    try {
        const categorie = await prisma.categoryrecette.delete({
            where:{
                id:Number(req.params.id)
            }
        });
        res.status(201).json(categorie);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}