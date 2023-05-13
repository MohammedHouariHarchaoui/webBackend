import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getEntreprises = async (req , res)=>{
    try {
        const response = await prisma.entrepise.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const getEntrepriseById = async (req , res)=>{
    try {
        const response = await prisma.entrepise.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: "Entreprise not found" });
        }
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const createEntreprise = async (req , res)=>{
    const {nom , adresse , mail , tel , link} = req.body;
    console.log(req.body);
    try {
        const entreprise = await prisma.entrepise.create({
            data:{
                nom :nom,
                adresse : adresse,
                mail : mail,
                tel :  tel,
                link : link
            }
        });
        res.status(201).json(entreprise);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const updateEntreprise = async (req , res)=>{
    const {nom , adresse , mail , tel , link} = req.body;
    try {
        const entreprise = await prisma.entrepise.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                nom :nom,
                adresse : adresse,
                mail : mail,
                tel :  tel,
                link : link
            }
        });
        if (entreprise) {
            res.status(200).json(entreprise);
        } else {
            res.status(404).json({ msg: "Entreprise not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const deleteEntreprise = async (req , res)=>{
    try {
        const entreprise = await prisma.entrepise.delete({
            where:{
                id:Number(req.params.id)
            }
        });
        if (entreprise) {
            res.status(200).json(entreprise);
        } else {
            res.status(404).json({ msg: "Entreprise not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}
