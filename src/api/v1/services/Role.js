import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getRoles = async (req , res)=>{
    try {
        const response = await prisma.role.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const getRoleById = async (req , res)=>{
    try {
        const response = await prisma.role.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: "Role not found" });
        }
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const createRole = async (req , res)=>{
    const {description} = req.body;
    console.log(req.body);
    try {
        const role = await prisma.role.create({
            data:{
                description : description
            }
        });
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const updateRole = async (req , res)=>{
    const {description} = req.body;
    try {
        const role = await prisma.role.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                description : description
            }
        });
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ msg: "Role not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const deleteRole = async (req , res)=>{
    try {
        const role = await prisma.role.delete({
            where:{
                id:Number(req.params.id)
            }
        });
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ msg: "Role not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}
