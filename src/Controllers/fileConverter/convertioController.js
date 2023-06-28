//import  env  from '../../../env.js';
import { convertioRequest } from '../../Models/fileConverter/convertioRequest.js';
import { convertioFinalResponse } from '../../Models/fileConverter/convertioFinalResponse.js';

//const config = env;

const config = process.env;

// ----------------- CONTROLLERS ------------------  //


export const  convertioPostRequest = (req,res) =>{
  let request = req.body;
  let requestToConvertio = new convertioRequest(config.CONVERTIO_API_KEY,request.input,request.filename,request.file,request.outputformat);
  let conversionId = undefined;

  sendFile(requestToConvertio)
  .then(response => response.json())
  .then( (response) => {  // A start

      if(response.status == 'ok'){
        console.log('response status = ok');
        conversionId = response.data.id;
        let statusConsults = 0;
        let fileStatus = {};

        const interval = setInterval(()=>{
          statusConsults++;

          getStatus(conversionId)  // B start     
          .then(fileStatusJson => fileStatusJson.json()) //convierte la respuesta de convertio a json a javascript (esta respuesta desde convertio indica si la conversion inicio con exito y devuelve una id para seguir el estado de la conversion del archivo)
          .then( (fileStatusObject) => {    
            fileStatus = fileStatusObject;

            if(statusCheck(fileStatus)){
              sendResponse(fileStatus,res);
              clearInterval(interval);
            }

          }).catch(err => console.log(err)) // B end

          if(statusConsults = 10){
            console.log('la respuesta tardo mas de lo esperado')
            clearInterval(interval);
          }
        
        }, 4000)

      }else{
        res.send(response.error);
      }



  }).catch(err => console.log(err)) // A end
  
};









// ------------ FUNCTIONS -------------- //

const sendFile = (requestToConvertio) => fetch('https://api.convertio.co/convert',fetchPostConfig(requestToConvertio));
const getStatus = (id) => fetch('https://api.convertio.co/convert/'+ id + '/status');



function statusCheck(statusResponse){ // checkea si el archivo esta listo
  if(statusResponse.data.step == 'finish'){
    return true;
  }else{
    return false;
  }
}


function sendResponse(statusResponse,res){
  if(statusResponse.status == 'ok' && statusResponse.data.step == 'finish'){
    let finalResponse = new convertioFinalResponse(statusResponse.data.output.url,statusResponse.data.output.size,statusResponse.status,statusResponse.error)           
    return res.json(finalResponse);
  }
};


const fetchPostConfig = (fetchPostRequest) => { 
  return {
    method: "POST",
    body: JSON.stringify(fetchPostRequest),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }
};


//--------------------------------------

export default convertioPostRequest;