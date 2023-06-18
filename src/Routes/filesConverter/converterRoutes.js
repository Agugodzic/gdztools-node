import { Router } from "express";
import  env  from '../../../env.js';
import { convertioRequest } from '../../Models/fileConverter/convertioRequest.js';
import { convertioFinalResponse } from '../../Models/fileConverter/convertioFinalResponse.js';
//import convertioPostRequest from '../../Controllers/fileConverter/convertioController.js';

const converterRoutes = Router();
const config = env;

converterRoutes.post('/converter', async(req,res)=>{
  let request = req.body;
  
  try{
    let requestToConvertio = new convertioRequest(config.CONVERTIO_API_KEY,request.input,request.filename,request.file,request.outputformat);
  
    fetch('https://api.convertio.co/convert', {
      method: "POST", // or 'PUT'
      body: JSON.stringify(requestToConvertio),
      headers: {"Content-type": "application/json; charset=UTF-8"} // data can be `string` or {object}!
    })
    .then(response => response.json())
    .then( (response) => {

      if(response.status == 'ok'){
        console.log('response status = ok');
        let responseStep = '';
                
        fetch('https://api.convertio.co/convert/'+response.data.id+'/status')
        .then(response => response.json())
        .then( (response) => {

          // convertioFinalResponse(url, size, convertionStatus, message);  
          statusCheck(response);
          setTimeout(statusCheck(response),2000);

        }).catch(err => console.log(err))

      }  

    }).catch(err => console.log(err))

  }catch(err){
    console.log(err);
  }
});


function statusCheck(response){
  if(response.status == 'ok' && response.data.step == 'finish'){
    let finalResponse = new convertioFinalResponse(response.data.output.url,response.data.output.size,response.status,response.error)           
    return res.json(finalResponse);

  }else if(response.status == 'error'){
    let finalResponse = new convertioFinalResponse(null,null,'error',response.error) 
    return res.send(finalResponse);
  }
}


export default converterRoutes;