export class convertioRequest{
  url;
  size;
  convertionStatus;
  message;

  constructor(url,size,convertionStatus,message){
    this.url = url;
    this.size = size;
    this.convertionStatus = convertionStatus;
    this.message = message;
  }
}
 