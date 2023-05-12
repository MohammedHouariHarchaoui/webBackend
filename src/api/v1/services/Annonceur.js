import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getAnnonceurs = async (req , res)=>{
    try {
        const response = await prisma.annonceur.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const getAnnonceurById = async (req , res)=>{
    try {
        const response = await prisma.annonceur.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: "Annonceur not found" });
        }
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const createAnnonceur = async (req , res)=>{
    const {nom , prenom , mail , tel , idCreatedpar} = req.body;
    console.log(req.body);
    try {
        const annonceur = await prisma.annonceur.create({
            data:{
                nom : nom,
                prenom: prenom,
                mail: mail,
                tel: tel,
                idCreatedpar: Number(idCreatedpar)
            }
        });
        res.status(201).json(annonceur);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const updateAnnonceur = async (req , res)=>{
    const {nom , prenom , mail , tel} = req.body;
    try {
        const annonceur = await prisma.annonceur.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                nom:nom,
                prenom:prenom,
                mail:mail,
                tel:tel
            }
        });
        if (annonceur) {
            res.status(200).json(annonceur);
        } else {
            res.status(404).json({ msg: "Annonceur not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const deleteAnnonceur = async (req , res)=>{
    try {
        const annonceur = await prisma.annonceur.delete({
            where:{
                id:Number(req.params.id)
            }
        });
        if (annonceur) {
            res.status(200).json(annonceur);
        } else {
            res.status(404).json({ msg: "Annonceur not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}
