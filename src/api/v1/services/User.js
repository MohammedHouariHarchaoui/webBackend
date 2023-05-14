import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    try {
      const response = await prisma.users.findMany({
        where: {
          NOT: {
            idRole: 1,
            isActive: 0,
          },
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };



export const getUsersByIdRole = async (req , res)=>{
    try {
        const response = await prisma.users.findMany({
            where:{
                idRole : Number(req.params.id),
                NOT: {
                    idRole: 1,
                    isActive: 0,
                  },
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}


export const getUserById = async (req , res)=>{
    try {
        const response = await prisma.users.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}



export const updateUser = async (req, res) => {
    const { nom, prenom, mail, tel, idEntreprise, mdp } = req.body;
    const userId = Number(req.params.id);
    console.log("inside updated")
    try {
      const user = await prisma.users.findUnique({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      let hashedPassword = user.mdp;
  
      if (mdp && mdp !== user.mdp) {
        hashedPassword = await bcrypt.hash(mdp, 10);
      }
  
      const updatedUser = await prisma.users.update({
        where: { id: userId },
        data: {
          nom,
          prenom,
          mail,
          tel,
          idEntreprise,
          mdp: hashedPassword,
        },
      });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ msg: error.msg });
    }
  };
  

export const activedesactivateUser = async (req , res)=>{
    try {
        console.log("inside  patch")
        const user = await prisma.users.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                isActive : Number(req.body.isActive)
            }
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

