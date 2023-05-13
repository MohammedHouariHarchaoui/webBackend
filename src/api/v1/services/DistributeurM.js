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



export const createDistributeurWithPack = async (req, res) => {
    const { identifiant, capaciteGoblet, capaciteSucre, capaciteSpoon, pack } = req.body;
  
    try {
      const distributeur = await prisma.distributeur.create({
        data: {
          identifiant,
          capaciteGoblet,
          capaciteSucre,
          capaciteSpoon,
        },
      });
  
      const createdPack = await prisma.pack.create({
        data: {
          idDistr: distributeur.id,
          idEntre: pack.idEntre,
          codeverou: pack.codeverou,
          localisation: pack.localisation,
          state: pack.state,
        },
      });
  
      console.log(distributeur);
      console.log(createdPack);
  
      res.json(distributeur);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create distributeur and pack' });
    }
  };
  


    export const updateDistributeurWithPack  = async (req, res) => {
        const distributeurId = parseInt(req.params.id);
        const { identifiant, capaciteGoblet, capaciteSucre, capaciteSpoon, pack } = req.body;
      
        try {
          const updatedDistributeur = await prisma.distributeur.update({
            where: { id: distributeurId },
            data: {
              identifiant,
              capaciteGoblet,
              capaciteSucre,
              capaciteSpoon,
            },
          });
      
          const updatedPack = await prisma.pack.update({
            where: { idDistr: distributeurId },
            data: {
              idEntre: pack.idEntre,
              codeverou: pack.codeverou,
              localisation: pack.localisation,
              state: pack.state,
            },
          });
      
          console.log(updatedDistributeur);
          console.log(updatedPack);
      
          res.json(updatedDistributeur);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Unable to update distributeur and pack' });
        }
      };
      



export const deleteDistributeur = async (req, res) => {
    const distributeurId = parseInt(req.params.id);
  
    try {
      await prisma.distributeur.delete({
        where: { id: distributeurId },
        include: { pack: true },
      });
      res.json({ message: 'Distributeur and pack deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete distributeur and pack' });
    }
  }
