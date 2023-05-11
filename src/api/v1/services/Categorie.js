import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getCategories = async (req , res)=>{
    try {
        const response = await prisma.categorie.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : msg.error});
    }
}

export const getCategorieById = async (req , res)=>{
    try {
        const response = await prisma.categorie.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : msg.error});
    }
}

export const createCategorie = async (req , res)=>{
    const {categorie} = req.body;
    try {
        const categorie_obj = await prisma.categorie.create({
            data:{
                categorie: categorie
            }
        });
        res.status(201).json(categorie_obj);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const updateCategorie = async (req , res)=>{
    const {categorie} = req.body;
    try {
        const categorie_obj = await prisma.categorie.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                categorie: categorie
            }
        });
        res.status(201).json(categorie_obj);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const deleteCategorie = async (req , res)=>{
    try {
        const categorie = await prisma.categorie.delete({
            where:{
                id:Number(req.params.id)
            }
        });
        res.status(201).json(categorie);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}