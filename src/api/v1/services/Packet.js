import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getPacks = async (req , res)=>{
    try {
        const response = await prisma.pack.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}


export const getPackById = async (req , res)=>{
    try {
        const response = await prisma.pack.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ msg: "Pack not found" });
        }
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export async function getIdEntreprise(id) {
    try {
      const pack = await prisma.pack.findMany({
        where: { idDistr: Number(id) },
      });
      console.log('Found pack:', pack);
      if (pack) {
        return pack.idEntre;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting password:', error);
      throw error;
    }
  }


  
export async function getIdEntre(id) {
    try {
      const pack = await prisma.pack.findMany({
        where: { idDistr: Number(id) },
      });
      console.log('Found pack:', pack);
      if (pack) {
        return pack.idEntre;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting password:', error);
      throw error;
    }
  }




  
export async function deletePackIdEntreprise(id) {
    try {
      const pack = await prisma.pack.delete({
        where: { idDistr: Number(id) },
      });
      console.log('Found pack:', pack);
      if (pack) {
        return pack.idEntre;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting password:', error);
      throw error;
    }
  }


  
export async function createPackIdEntreprise(idDistr , idEntre , codeverou , localisation , state) {
    try {
      const pack = await prisma.pack.create({
        data: { 
            idDistr: Number(idDistr),
            idEntre: Number(idEntre),
            codeverou: codeverou,
            localisation: localisation,
            state: state
        },
      });
      if (pack) {
        return pack;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting password:', error);
      throw error;
    }
  }






  export async function updateIdEntreprise(id,idEntre) {
    try {
      const pack = await prisma.pack.update({
        where: { 
            idDistr: Number(id) 
        },
        data:{
            idEntre : Number(idEntre)
        },
      });
      console.log('Found pack:', pack);
      if (pack) {
        return pack;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting password:', error);
      throw error;
    }
  }


export const createPack = async (req , res)=>{
    const {idDistr , idEntre , codeverou , localisation , state} = req.body;
    console.log(req.body);
    try {
        const pack = await prisma.pack.create({
            data:{
                idDistr : Number(idDistr),
                idEntre : Number(idEntre),    
                codeverou : codeverou,   
                localisation : localisation,
                state : state       
            }
        });
        console.log(pack)
        res.status(201).json(pack);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}



export const updatePack = async (req , res)=>{
    const {idEntre , codeverou , localisation , state} = req.body;
    try {
        const pack = await prisma.pack.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                idEntre : Number(idEntre),
                codeverou : codeverou,
                localisation : localisation,
                state : state
            }
        });
        if (pack) {
            res.status(200).json(pack);
        } else {
            res.status(404).json({ msg: "Pack not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}

export const deletePack = async (req , res)=>{
    try {
        const pack = await prisma.pack.delete({
            where:{
                id:Number(req.params.id)
            }
        });
        if (pack) {
            res.status(200).json(pack);
        } else {
            res.status(404).json({ msg: "Pack not found" });
        }
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}
