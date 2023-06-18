import { Router } from "express";
import Categorie from "../Models/categorie.js";

const categorieRouter = Router();
const categorie = Categorie;

categorieRouter.get('/categorias/id/:id', async(req,res)=>{
  const {id} = req.params;
  const dato = await categorie.findAll({
    where:{
      id:id
    }
  });
  res.status(200).json(dato);
});

categorieRouter.get('/categorias/listar', async(req,res)=>{
  try{
    const dato = await categorie.findAll();
    res.status(200).send(dato);
  }catch(error){
    console.log("Error: "+ error);
    res.status(400).send(error);
  }
})

categorieRouter.post('/categorias/agregar', async(req,res)=>{
  try{
    const add = await categorie.create(req.body);
    res.status(200).json(add);
  }catch(err){
    res.status(400).json({error:"Error:" + err});
  }
});

categorieRouter.put('/categorias/editar', async(req,res)=>{
  try {
    await categorie.update(req.body,{
      where: {
      id: req.body.id
    }});
    res.status(200).json(categorie);
  } catch (err) {
      console.log("Error: "+ err);
      res.status(400).end(err);
  }        
});

categorieRouter.delete('/categorias/:id', async(req,res)=>{
  try {
    const {id} = req.params;
    const dato = await categorie.destroy({
      where: {
      id: id
    }
    });
    res.status(200).send("Elemento eliminado:" + dato);
  } catch (err) {
      res.send(err);
  }        
});


export default categorieRouter;