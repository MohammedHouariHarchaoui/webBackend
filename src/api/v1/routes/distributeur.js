import { Router } from "express";
import { getCategories, getDrinkCategory, getDrinkInfo, getToppings, getInfoTopping, getIngredients, getInfoIngredient, saveCommand, getSteps, logDistributeur, getDrinks, generateQrCode, getAdvert } from "../services/distributeur.js";
import axios from "axios";
import fs from "fs";
import multer from "multer";
import path from "path";
import Blob from "fetch-blob";
import FormData from "form-data";


const router = Router();

router.get(
  "/categories",
  async (req, res) => {
    try {
      console.log("Getting All Categories");
      let info = await getCategories();
      res.status(200).send(info);
    } catch (e) {
      console.log(e);
      res.status(404).send({ message: "Failed !!" });
    }
  }
);

router.get(
    "/drink/:id",
    async (req, res) => {
      try {
        console.log("Getting info Drink");
        let info = await getDrinkInfo(req.body);
        console.log(req.body);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  
  router.get(
    "/category/drink",
    async (req, res) => {
      try {
        console.log("Getting Drink of category");
        let info = await getDrinkCategory(req.body);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );


   
  router.get(
    "/topping",
    async (req, res) => {
      try {
        console.log("Getting Toppings");
        let info = await getToppings();
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  router.get(
    "/topping/:id",
    async (req, res) => {
      try {
        console.log("Getting Toppings");
        let info = await getInfoTopping(req.body);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  router.get(
    "/ingredients",
    async (req, res) => {
      try {
        console.log("Getting Toppings");
        let info = await getIngredients();
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  router.get(
    "/ingredients/:id",
    async (req, res) => {
      try {
        console.log("Getting Toppings");
        let info = await getInfoIngredient(req.body);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  
  router.post(
    "/command",
    async (req, res) => {
      try {
        console.log("Saving Customer's Command");
        console.log(req.body);
        let info = await saveCommand(req.body);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  router.post(
    "/command/steps/:id",
    async (req, res) => {
      try {
        console.log("Sending steps of command's drink");
        let info = await getSteps(req.params.id);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );
  router.get(
    "/log",
    async (req, res) => {
      try {
        console.log("Log to distributeur");
        let info = await logDistributeur(req.query.ditributeurId);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );

  router.get(
    "/drinks",
    async (req, res) => {
      try {
        console.log("Getting Drinks");
        let info = await getDrinks();
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );

  router.post(
    "/command/qrcode/:id",
    async (req, res) => {
      try {
        console.log("Getting command",req.params.id);
        let info = await generateQrCode(req.params.id);
        res.status(200).send(info);
      } catch (e) {
        console.log(e);
        res.status(404).send({ message: "Failed !!" });
      }
    }
  );


  const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = './Images';
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
      cb(null,"Images/")
    },
    filename: (req, file, cb)=>{
      //console.log(file);
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })

  const upload = multer({storage:Storage}).single('image')

  router.post('/pub/:id',(req, res) => {
    var imagePath = ""
    var fileObj = ""
    var uploadPromise = new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          fileObj = req.file;
          resolve();
        }
      });
    });
    uploadPromise.then(() => {
      imagePath = "Images/" + fileObj.filename;
      const imageStream = fs.createReadStream(imagePath);
      const imageBuffer = [];
      
      imageStream.on('data', function (chunk) {
        imageBuffer.push(chunk);
      }).on('end', function () {
        const formData = new FormData();
        formData.append('image', Buffer.concat(imageBuffer), {
          filename: fileObj.filename,
          contentType: fileObj.mimetype
        });
        //https://innovit-2cs-ml.onrender.com
        //http://0.0.0.0:8000
      axios.post('https://innovit-2cs-ml.onrender.com/api/data',formData,{
        headers: {
          ...formData.getHeaders(),
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        }
      })
        .then(async response => {
          console.log(response.data);
          try {
            console.log("Getting advertisement video link");
            let info = await getAdvert(req.params.id,response.data);
            res.status(200).send(info);
          } catch (e) {
            console.log(e);
            res.status(404).send({ message: "Failed !!" });
          }
          //res.send(response.data);
        })
        .catch(error => {
          //console.error(error);
          res.status(500).send('Internal server error');
        });
      });
    }).catch((err) => {
      console.log(err);
    });
    var fileName = {
      link:"jjj.jpg"
    }
  
    
    /*const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath), {
      filename: fileObj.filename,
      contentType: fileObj.mimetype
    });*/
    console.log("---------->",fileObj);
    
  });

  router.get('/', (req, res) => {
    try {
      res.status(200).send({ message: "Hello World !!" });
    } catch (e) {
      console.log(e);
      res.status(404).send({ message: "Failed !!" });
    }
  });


export default router;