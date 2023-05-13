import formidable from 'formidable';
import cloudinary from 'cloudinary';
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: 'dt4pzi35x',
  api_key: '349196438397243',
  api_secret: '_Rto_VZa54y1kfR1_dJSn4wpS2Q',
});

export const getDrinks = async (req , res)=>{
    try {
        const response = await prisma.recette.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg : error.msg});
    }
}

export const getDrinkById = async (req , res)=>{
    try {
        const response = await prisma.recette.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : error.msg});
    }
}

export const createDrink = async (req, res) => {

    const form = formidable({
        multiples: false,
        keepExtensions: true,
        fields: ['name', 'description', 'price','idCategRecette'],
        fileFilter: function(req, file, callback) {
            if (!file.type.startsWith('video/')) {
              return callback(new Error('Only image files are allowed!'));
            }
            callback(null, true);
        }
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while uploading the file.');
            return;
        }
        try {
            console.log(files);
            const result = await cloudinary.v2.uploader.upload(files.image.filepath, {
                resource_type: 'image',
                folder: 'drinks_images',
            });
            console.log(result);

            const {idCategRecette, name , description ,price } = fields;
            console.log(fields);
            const recette = await prisma.recette.create({
                data: {
                    name: name,
                    idCategRecette: Number(idCategRecette),
                    price: Number(price),
                    description : description,
                    imageLink: result.secure_url
                }
            });
            res.status(201).json(recette);
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred while uploading the video.');
        }
    });
}


export const updateDrink = async (req , res)=>{
    const {name , description , price , idEntre} = req.body;
    try {
        const recette = await prisma.recette.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                name: name,
                description: description,
                price: Number(price)
            }
        });

        // const pack = await prisma.pack.update({
        //     where:{
        //         id:Number(req.params.id)
        //     },
        //     data:{
        //         idEntre : Number(idEntre),
        //     }
        // });

        res.status(201).json(recette);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}


export const deleteDrink = async (req, res) => {
    try {
      const recette = await prisma.recette.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
  
      if (!recette) {
        res.status(404).send("Publicité not found");
        return;
      }
  
    const urlParts = recette.imageLink.split("/");
    const public_id = urlParts[urlParts.length - 1].split(".")[0];
    const folder = urlParts[urlParts.length - 2];
  
    const result = await cloudinary.v2.uploader.destroy(`${folder}/${public_id}`, { resource_type: 'image' });
    console.log(result);
  
      await prisma.recette.delete({
        where: {
          id: Number(req.params.id),
        },
      });
  
      res.status(200).send("Drink deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while deleting the publicité");
    }
  };
  