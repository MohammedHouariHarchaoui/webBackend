import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getDistributeurs() {
    const distributeurs = await prisma.distributeur.findMany({
        include: {
            pack: {
                include: {
                    entre: {
                        include: {
                            users: {
                                where: {
                                    idRole: 2
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    console.log(distributeurs)
    // var response=[]
    // var info = {}
    // distributeurs.forEach(distributeur => { 
    //     info = {
    //         "id":distributeur.id,
    //         "name":distributeur.identifiant,
    //         "capaciteSpoon":distributeur.capaciteSpoon,
    //         "capaciteSucre":distributeur.capaciteSucre,
    //         "capaciteGoblet":distributeur.capaciteGoblet,
    //         "pack": distributeur.pack == null ? "Non attribué" : distributeur.pack.entre.nom,
    //     //    "client": distributeur.pack == null ? "Non attribué" : distributeur.pack.entre.users[0].nom,
    //     } 
    //     response.push(info)
    // });

    return distributeurs

    // return response
}

export async function getInfoDistributeur(Obj) {
    const distributeurs = await prisma.distributeur.findMany({
        where: {
            id: Obj["id"]
        },
        include: {
            pack: {
                include: {
                    entre: true,
                }
            }
        }
    })
    return distributeurs
}

export async function attributeDistr(Obj, idDistributeur) {
    if (Obj["idUser"] == null) {
        return null
    }
    const idEntreprise = (await prisma.users.findUnique({
        where: {
            id: Obj["idUser"]
        }
    }))["idEntreprise"]
    const exist = await prisma.pack.findMany({
        where: {
            idEntre: idEntreprise,
            idDistr: parseInt(idDistributeur)
        }
    })
    if (exist.length > 0) {
        return false;
    }
    const response = await prisma.pack.create({
        data: {
            idEntre: idEntreprise,
            idDistr: parseInt(idDistributeur)
        }
    })
    const user = await prisma.users.findUnique({
        where: {
            id: Obj["idUser"]
        }
    })
    return user["nom"]
}

export async function getADM() {
    const adm = await prisma.users.findMany({
        where: {
            idRole: 2
        }
    })
    return adm
}

export async function getClients() {
    const clients = await prisma.entrepise.findMany({

    })
    return clients
}

export async function desattributeDistr(Obj) {
    const response = await prisma.pack.delete({
        where: {
            idEntre: Obj["idEntre"],
            idDistr: Obj["idDistr"]
        }
    })
    return response
}

export async function addDistributeur(Obj) {
    const response = await prisma.distributeur.create({
        data: {
            identifiant: Obj["identifiant"],
            capaciteGoblet: Obj["capaciteGoblet"],
            capaciteSucre: Obj["capaciteSucre"],
            capaciteSpoon: Obj["capaciteSpoon"]
        }
    })
    return response
}

export async function editDistributeur(Obj, idDistr) {
    const response = await prisma.distributeur.update({
        where: {
            id: parseInt(idDistr)
        },
        data: {
            identifiant: Obj["identifiant"],
            capaciteGoblet: Obj["capaciteGoblet"],
            capaciteSucre: Obj["capaciteSucre"],
            capaciteSpoon: Obj["capaciteSpoon"]
        }
    })
    return response
}


//Afficher liste admins
export async function getAdmins() {
    const admins = await prisma.users.findMany({
        where: {
            idRole: 2
        }
    })
    var response = []
    var info = {}
    admins.forEach(admin => {
        info = {
            "id": admin.id,
            "nom": admin.nom,
            "prenom": admin.prenom,
            "mail": admin.mail,
            "tel": admin.tel
        }
        response.push(info)
    });

    return response
}
//Ajouter un nouveau Admin
export async function addAdmin(Obj) {
    const response = await prisma.users.create({
        data: {
            idRole: 1,
            nom: Obj["nom"],
            prenom: Obj["prenom"],
            mail: Obj["mail"],
            tel: Obj["tel"],
            mdp: Obj["mdp"]

        }
    })
    return response
}
// Ajouter un nouveau client (entreprise)
export async function addClient(Obj) {
    const response = await prisma.entrepise.create({
        data: {

            nom: Obj["nom"],
            adresse: Obj["adresse"],
            mail: Obj["mail"],
            tel: Obj["tel"]

        }
    })
    return response
}
//Ajouter un nouveau compte 
export async function addAccount(Obj) {

    const response = await prisma.users.create({
        data: {

            idRole: Obj["idRole"],
            nom: Obj["nom"],
            prenom: Obj["prenom"],
            mail: Obj["mail"],
            tel: Obj["tel"],
            mdp: Obj["mdp"],
            isActive: 1

        }

    })
    console.log(response)
    return response
}
//Supprimer un compte
export async function deleteAccount(idUser) {
    const exist = await prisma.users.findMany({
        where: {
            id: parseInt(idUser)
        }
    })

    if ((exist).length == 0) {
        return null;
    }
    const deleteAccount = prisma.users.update({
        where: {
            id: parseInt(idUser),
        },
        data: {
            isActive: 0,
        }
    })

    var transaction = null;
    transaction = await prisma.$transaction([deleteAccount])

    return transaction
}
//modifier un compte
export async function editAccount(Obj, id) {

    const exist = await prisma.users.findMany({
        where: {
            id: parseInt(id)
        }
    })
    if ((exist).length == 0) {
        return null;
    }
    const response = await prisma.users.update({
        where: {
            id: parseInt(id)
        },
        data: {
            idRole: parseInt(Obj["idRole"]),
            nom: Obj["nom"],
            prenom: Obj["prenom"],
            mail: Obj["mail"],
            tel: Obj["tel"],
            mdp: Obj["mdp"]
        }
    })
    return response
}
export async function editClient(Obj, id) {

    const exist = await prisma.entrepise.findMany({
        where: {
            id: parseInt(id)
        }
    })
    if ((exist).length == 0) {
        return null;
    }
    const response = await prisma.users.update({
        where: {
            id: parseInt(id)
        },
        data: {

            nom: Obj["nom"],
            adresse: Obj["adresse"],
            mail: Obj["mail"],
            tel: Obj["tel"],

        }
    })
    return response
}
//afficher la liste des comptes selon le idRole
export async function getAccount(id) {
    const accounts = await prisma.users.findMany({
        where: {
            idRole: parseInt(id),
            isActive: 1
        }
    })

    var response = []
    var info = {}
    accounts.forEach(account => {
        info = {
            "id": account.id,
            "idRole": account.idRole,
            "nom": account.nom,
            "prenom": account.prenom,
            "mail": account.mail,
            "tel": account.tel
        }
        response.push(info)
    })

    return response
}
//Obj est l'admin 
export async function affecterClient(Obj, idEntreprise) {
    if (Obj["idEntre"] != null) {
        return false
    }

    const response = await prisma.users.update({
        where: {
            id: Obj["id"]
        },
        data: {
            id: Obj["id"],
            idRole: Obj["idRole"],
            nom: Obj["nom"],
            prenom: Obj["prenom"],
            mail: Obj["mail"],
            tel: Obj["tel"],
            idEntreprise: parseInt(idEntreprise)

        }
    })

    return response
}

export async function deleteDistributeur(idDistr) {
    const existDistr = await prisma.distributeur.findMany({
        where: {
            id: parseInt(idDistr)
        }
    })
    const existPack = await prisma.pack.findMany({
        where: {
            idDistr: parseInt(idDistr)
        }
    })
    if ((existDistr).length == 0) {
        return null;
    }
    const deleteDistr = prisma.distributeur.delete({
        where: {
            id: parseInt(idDistr),
        },
    })
    var transaction = null;
    if (existPack.length > 0) {
        const deletePack = prisma.pack.delete({
            where: {
                idDistr: parseInt(idDistr)
            },
        })
        transaction = await prisma.$transaction([deletePack, deleteDistr])
    }
    else {
        transaction = await prisma.$transaction([deleteDistr])
    }

    return transaction
}
//Lister le pack par rapport à une entreprise
export async function getPack(id) {
    const packs = await prisma.pack.findMany({
        where: {
            idEntre: parseInt(id)

        }
    })

    var response = []
    var info = {}
    packs.forEach(pack => {
        info = {
            "id": pack.idDistr,
            "localisation": pack.localisation,
            "state": pack.state
        }
        response.push(info)
    })

    return response
}

export async function editPack(Obj, id) {

    const exist = await prisma.pack.findMany({
        where: {
            idDistr: parseInt(id)
        }
    })
    if ((exist).length == 0) {
        return null;
    }
    const response = await prisma.pack.update({
        where: {
            idDistr: parseInt(id)
        },
        data: {

            state: Obj["state"]

        }
    })
    return response
}

//statistique sur l'ensemble des breakdowns par maintenancier
export async function getNbTask(id) {
    const tasks = await prisma.task.findMany({
        where: {
            idUser: parseInt(id),
            isDone: false,
        }
    })

    var response = tasks.length;

    return response
}

