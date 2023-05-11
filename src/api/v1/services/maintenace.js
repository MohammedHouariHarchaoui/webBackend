import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/*const allUsers = await prisma.recette.findMany({
   
})*/

/*const allUsers = await prisma.recette.findMany({
    include: {
        categoryrecette : true
    }
})*/


export async function getTasks(Obj) {
    const idUser = await prisma.users.findUnique({
        where:{
            id:parseInt(Obj["id"])
        },
    })
    const tasks = await prisma.task.findMany({
        where : {
            idEntre:idUser["idEntre"]
        },
        include:{
            typetask:{
                select:{
                    identifiant:true
                }
            }
        }
    })
    tasks.forEach(task=>{
        task.typetask=task.typetask.identifiant
    })
    return tasks
}

export async function getTasksFree(Obj) {
    const idAM = await prisma.users.findMany({
        where:{
            id:parseInt(Obj),
            idRole:3
        }
    })
    const tasks = await prisma.task.findMany({
        where : {
            idEntre:idAM["idEntre"],
            idUser:1 //BY DEFAULT IF A TASK ISNT ASSIGNED IT'LL HAVE 1
        }
    })
    return idAM
}

export async function getTasksAM(idAM) {
    const tasks = await prisma.task.findMany({
        where : {
            idUser:parseInt(idAM)
        }
    })
    return tasks
}

export async function getTaskInfo(idTask) {
    const tasks = await prisma.task.findUnique({
        where : {
            id:parseInt(idTask)
        }
    })
    return tasks
}

export async function assignTaskAM(Obj) {
    const taskUpdated = await prisma.task.update({
        where:{
            id:Obj["id"]
        },
        data: {
            idUser:Obj["idUser"],
        },
      })
    return taskUpdated
}

export async function switchStateTask(id) {
    const taskUpdated = await prisma.task.update({
        where:{
            id:parseInt(id)
        },
        data: {
            isDone:!(await prisma.task.findUnique({
                where:{
                    id:parseInt(id),
                }
            }))["isDone"],
        },
      })
    return taskUpdated
}


export async function userInfo(idUser) {
    const user = await prisma.users.findUnique({
        where: {
            id :parseInt(idUser)
        },
      })
    return user
}


