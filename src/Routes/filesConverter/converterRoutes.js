import { Router } from "express";
import convertioPostRequest from '../../Controllers/fileConverter/convertioController.js';

const converterRoutes = Router();

converterRoutes.post('/converter', async(req,res)=>{
  convertioPostRequest(req,res);
});

export default converterRoutes;