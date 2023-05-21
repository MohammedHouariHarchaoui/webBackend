import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const statMois = async (req , res)=>{
    try {
        const tasks = await prisma.task.findMany(
        {
         where:{
            date: {
              contains:'2023-05-13' /*toString(mois)*/
            }
        }
        });
        if (tasks) {
            res.status(200).json(tasks.length());
        } else {
            res.status(404).json({ msg: "Erreuur" });
        }
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}
