import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient();


export const getDistributeurs = async (req, res) => {
  try {
    const response = await prisma.distributeur.findMany();

    const transformedResponse = await Promise.all(
      response.map(async (dist) => {
        const pack = await prisma.pack.findUnique({ where: { idDistr: dist.id } });
        const entreprise = await prisma.entrepise.findUnique({ where: { id: pack.idEntre } });
        return {
          id: dist.id,
          identifiant: dist.identifiant,
          capaciteGoblet: dist.capaciteGoblet,
          capaciteSucre: dist.capaciteSucre,
          capaciteSpoon: dist.capaciteSpoon,
          pack: pack,
          entreprise: entreprise
        };
      })
    );

    res.status(200).json(transformedResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};




export const getDistributeursByEntreprise = async (req, res) => {
  try {
    const response = await prisma.pack.findMany({
      where: {
        idEntre: Number(req.params.id)
      }
    });

    const transformedResponse = await Promise.all(
      response.map(async (pack) => {
        const dist = await prisma.distributeur.findUnique({ where: { id: pack.idDistr } });
        const entreprise = await prisma.entrepise.findUnique({ where: { id: pack.idEntre } });
        return {
          id: dist.id,
          identifiant: dist.identifiant,
          capaciteGoblet: dist.capaciteGoblet,
          capaciteSucre: dist.capaciteSucre,
          capaciteSpoon: dist.capaciteSpoon,
          pack: pack,
          entreprise: entreprise
        };
      })
    );

    res.status(200).json(transformedResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};








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
      
          res.status(200).json(updatedDistributeur);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Unable to update distributeur and pack' });
        }
      };
      



export const deleteDistributeur = async (req, res) => {
    const distributeurId = parseInt(req.params.id);
  
    try {
      await prisma.pack.delete({
        where:{
        idDistr: distributeurId
      }});
      await prisma.distributeur.delete({
        where: { id: distributeurId },
      });
      res.status(200).json({ message: 'Distributeur and pack deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete distributeur and pack' });
    }
  }
