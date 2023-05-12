import formidable from 'formidable';
import cloudinary from 'cloudinary';
import { PrismaClient } from "@prisma/client"
import { getAnnonceurById } from './Annonceur.js';

const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: 'dt4pzi35x',
  api_key: '349196438397243',
  api_secret: '_Rto_VZa54y1kfR1_dJSn4wpS2Q',
});
export const getPublicites = async (req, res) => {
    try {
      const response = await prisma.publicite.findMany();
  
      const transformedVideos = await Promise.all(
        response.map(async (video) => {
          const [categorie, categRecette, annonceur] = await Promise.all([
            prisma.categorie.findUnique({ where: { id: video.idCategorie } }),
            prisma.categoryrecette.findUnique({
              where: { id: video.idCategRecette },
            }),
            prisma.annonceur.findUnique({ where: { id: video.idAnnonceur } }),
          ]);
          return {
            id:video.id,
            url: video.url,
            categorie: categorie?.categorie, // Use optional chaining operator to handle null/undefined values
            categRecette: categRecette?.description,
            annonceur: annonceur?.nom,
          };
        })
      );
  
      console.log(transformedVideos);
      res.status(200).json(transformedVideos); // Send transformedVideos instead of response
  
    } catch (error) {
      res.status(500).json({ msg: error.message }); // Use error.message instead of error.msg
    }
  };
  
  

export const getPubliciteById = async (req , res)=>{
    try {
        const response = await prisma.publicite.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : msg.error});
    }
}

export const createPublicite = async (req, res) => {

    const form = formidable({
        multiples: false,
        keepExtensions: true,
        fields: ['idCategorie', 'idCategRecette', 'idAnnonceur'],
        fileFilter: function(req, file, callback) {
            if (!file.type.startsWith('video/')) {
              return callback(new Error('Only video files are allowed!'));
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
            console.log(fields.idAnnonceur)
            const result = await cloudinary.v2.uploader.upload(files.pub.filepath, {
                resource_type: 'video',
                folder: 'pubs',
            });
            console.log(result);

            const {idCategorie, idCategRecette, idAnnonceur} = fields;
            console.log(fields);
            const publicite = await prisma.publicite.create({
                data: {
                    url: result.secure_url,
                    idCategorie: Number(idCategorie),
                    idCategRecette: Number(idCategRecette),
                    idAnnonceur: Number(idAnnonceur)
                }
            });
            res.status(201).json(publicite);
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred while uploading the video.');
        }
    });
}


export const updatePublicite = async (req , res)=>{
    const {idCategorie , idCategRecette} = req.body;
    try {
        const publicite = await prisma.publicite.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                idCategorie: Number(idCategorie),
                idCategRecette: Number(idCategRecette)
            }
        });
        res.status(201).json(publicite);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}


export const deletePublicite = async (req, res) => {
    try {
      const publicite = await prisma.publicite.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
  
      if (!publicite) {
        res.status(404).send("Publicité not found");
        return;
      }
  
    const urlParts = publicite.url.split("/");
    const public_id = urlParts[urlParts.length - 1].split(".")[0];
    const folder = urlParts[urlParts.length - 2];
  
    const result = await cloudinary.v2.uploader.destroy(`${folder}/${public_id}`, { resource_type: 'video' });
    console.log(result);
  
      await prisma.publicite.delete({
        where: {
          id: Number(req.params.id),
        },
      });
  
      res.status(200).send("Publicité deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while deleting the publicité");
    }
  };
  