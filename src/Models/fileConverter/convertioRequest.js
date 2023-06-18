
export class convertioRequest{
  apikey;
  input;
  file;
  filename;
  outputformat;

  constructor(apiKey,input,filename,file,outputformat){
    this.apikey = apiKey;
    this.input = input;
    this.file = file;
    this.filename = filename;
    this.outputformat = outputformat;
  }
}
 