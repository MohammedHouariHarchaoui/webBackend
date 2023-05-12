import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getDistributeurs = async (req , res)=>{
    try {
        const response = await prisma.distributeur.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const getDistributeurById = async (req , res)=>{
    try {
        const response = await prisma.distributeur.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: "Distributeur not found" });
        }
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const createDistributeur = async (req , res)=>{
    const {identifiant , capaciteGoblet , capaciteSpoon ,capaciteSucre} = req.body;
    console.log(req.body);
    try {
        const distributeur = await prisma.distributeur.create({
            data:{
                identifiant: identifiant,
                capaciteGoblet : Number(capaciteGoblet),
                capaciteSucre  : Number(capaciteSucre),
                capaciteSpoon  : Number(capaciteSpoon)
            }
        });
        res.status(201).json(distributeur);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const updateDistributeur = async (req , res)=>{
    const {identifiant , capaciteGoblet , capaciteSpoon ,capaciteSucre} = req.body;
    try {
        const distributeur = await prisma.distributeur.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                identifiant:identifiant,
                capaciteGoblet:Number(capaciteGoblet),
                capaciteSpoon:Number(capaciteSpoon),
                capaciteSucre:Number(capaciteSucre)
            }
        });
        if (distributeur) {
            res.status(200).json(distributeur);
        } else {
            res.status(404).json({ msg: "Distributeur not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const deleteDistributeur = async (req , res)=>{
    try {
        const distributeur = await prisma.distributeur.delete({
            where:{
                id:Number(req.params.id)
            }
        });
        if (distributeur) {
            res.status(200).json(distributeur);
        } else {
            res.status(404).json({ msg: "Distribbuteur not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}
