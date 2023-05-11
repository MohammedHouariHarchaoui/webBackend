import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/*const allUsers = await prisma.recette.findMany({
   
})*/

/*const allUsers = await prisma.recette.findMany({
    include: {
        categoryrecette : true
    }
})*/


export async function getDrinkCategory(idCategory) {
    const drinks = await prisma.recette.findMany({
        where : {
            idCategRecette:idCategory["id"]
        }
    })
    return drinks
}

export async function getDrinks() {
    const recettes = await prisma.recette.findMany();
    var drinksList = []
    drinksList = recettes.map(async drink => {
      
        drink["category"]= (await prisma.categoryrecette.findUnique({
            where:{
                id:drink["idCategRecette"]
            }
        }))["description"];
        console.log(typeof drink["price"]);
        drink["price"]=parseFloat(drink["price"])
        console.log(typeof drink["price"]);
        return drink
    });
    return await Promise.all(drinksList)
}

export async function getCategories() {
    const allCategories = await prisma.categoryrecette.findMany();
    return allCategories;
}
export async function getDrinkInfo(idDrink){
    const drink = await prisma.recette.findUnique({
        where : {
            id:idDrink["id"]
        },
    })
    drink["category"]= (await prisma.categoryrecette.findUnique({
        where:{
            id:drink["idCategRecette"]
        }
    }))["description"]
    return drink
}

export async function getToppings(){
    const topping = await prisma.ingredient.findMany({
        where:{
            type:2
        }
    })
    return topping
}

export async function getInfoTopping(idTopping){
    const topping = await prisma.ingredient.findMany({
        where : { 
            id:idTopping["id"],
            type:2
        }
    })
    return topping
}

export async function getIngredients(){
    const ingredient = await prisma.ingredient.findMany({
        where:{
            type:1
        }
    })
    return ingredient
}

export async function getInfoIngredient(idIngredient){
    const ingredient = await prisma.ingredient.findMany({
        where : { 
            id:idIngredient["id"],
            type:1
        }
    })
    return ingredient
}

export async function saveCommand(Obj){
    const command = await prisma.commande.create({
        data : {
            idRecette:parseInt(Obj["idRecette"]),
            idIngredient:parseInt(Obj["idIngredient"]),
            quantity:Obj["quantity"]
        }
    })
    return command
}

export async function getSteps(id){
    const infos = await prisma.commande.findUnique({
        where : {
            id:parseInt(id)
        },
        include : {
            recette:{
                include : {
                    recetteingr:true
                }
            }
        }
    })
    var steps={}
    var boisson=[]
    var step = {}
    steps["step1"]="GET_GOBELET"
    steps["step2"]="REHEAT"
    step = {}
    cpt = 1
    infos.recette.recetteingr.forEach(ingredient => { 
        step["step"+(cpt)]="VERSER_BOISSON_"+ingredient.idIngredient+"_QUANT_"+ingredient.quantity,
        cpt++
    });
    steps["step3"] = step
    var cpt = 4
    if(infos.idIngredient != null)
    {
        steps["step"+(cpt)]="VERSER_TOPPING_"+infos.idIngredient+"_QUANT_"+infos.quantity
        cpt++
    }
    steps["step"+(cpt)]="GET_SPOON"

    return steps
}
export async function logDistributeur(id){
    const distributeur = await prisma.distributeur.findUnique({
        where : {
            identifiant:String(id)
        },
        include:{
            pack:{
                select:{
                    codeverou:true
                }
            }
        }
    })
    var codeverou = { "codeverou":distributeur.pack["codeverou"]}
    console.log(codeverou);
    return codeverou
}

export async function generateQrCode(idCommand){
    const command = await prisma.commande.findUnique({
        where : {
            id:parseInt(idCommand)
        },
        select:{
            id:true
        }
    })
    return command
}
var ageList=['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']
var genderList=['Male','Female']

var ageSeparatorIndex=3

export async function getAdvert(id,Obj){
    var constraint;
    var withConstraint=true;
    if(Obj.length==0)
    {
        withConstraint=false;
    }
    else
    {
        if(Obj["gender"] == genderList[1])
        {
            if(ageList.indexOf(Obj["age"])>ageSeparatorIndex)
            {
                constraint=4
            }
            else
            {
                constraint=2
            }
        }
        else{
            if(ageList.indexOf(Obj["age"])>ageSeparatorIndex)
            {
                constraint=3
            }
            else
            {
                constraint=1
            }
        }
    }
    const recetteCateg = (await prisma.commande.findUnique({
        where : {
            id:parseInt(id)
        },
        include:{
            recette:{
                select:{
                    idCategRecette:true
                }
            }
        }
    })).recette["idCategRecette"]
    console.log(recetteCateg);
    if(withConstraint)
    {
        var pub = await prisma.publicite.findMany({
            where : {
                idCategorie:constraint,
                idCategRecette:recetteCateg
            },
            select:{
                url:true
            }
        })

        if(pub.length == 0)
        {
            pub = await prisma.publicite.findMany({
                where : {
                    idCategorie:constraint
                },
                select:{
                    url:true
                }
            })
        }
    }
    
    if(pub.length == 0)
    {
        pub = await prisma.publicite.findMany({
            where : {
                idCategRecette:recetteCateg
            },
            select:{
                url:true
            }
        })
    }
    if(pub.length == 0)
    {
        pub = await prisma.publicite.findMany({
            select:{
                url:true
            }
        })
    }
    const values = Object.values(pub)
    const randomRecord = values[parseInt(Math.random() * values.length)]
    console.log(randomRecord);
    return randomRecord
}


export function add(x,y)
{
    return x+y
}


//console.log(await getSteps({"id":2}))

