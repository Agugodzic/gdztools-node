import  env  from '../../../env.js';
import { convertioRequest } from '../../Models/fileConverter/convertioRequest.js';
import { convertioFinalResponse } from '../../Models/fileConverter/convertioFinalResponse.js';

const config = env;

function statusCheck(response){
  if(response.status == 'ok' && response.data.step == 'finish'){
    let finalResponse = new convertioFinalResponse(response.data.output.url,response.data.output.size,response.status,response.error)           
    return res.json(finalResponse);

  }else if(response.status == 'error'){
    let finalResponse = new convertioFinalResponse(null,null,'error',response.error) 
    return res.send(finalResponse);
  }
}

export const  convertioPostRequest = (req) =>{
};

export default convertioPostRequest;