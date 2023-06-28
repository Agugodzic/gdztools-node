import express from "express";
import morgan from "morgan";
import categorieRouter from "./src/Routes/categorieRoutes.js";
import converterRoutes from "./src/Routes/filesConverter/converterRoutes.js";
import cors from "cors";
import db from "./src/dbConfig/dbConfig.js";

const app = express();
const DB = db;

app.use(express.json({limit:'50mb'}));
app.use(morgan('dev'));

app.use(cors({}));

(async ()=> {
  try{
    await DB.authenticate()
    await DB.sync()
    console.log('DB auth: OK.')}

  catch(error){
    console.log("db conection failed")
    throw("DB conection failed:" + error)
  }
})();

app.get("/",(req,res)=>{
  res.send("<p>GdzTools - Api</p>")
});

app.use(categorieRouter);
app.use(converterRoutes);

app.listen(3000,console.log("Server conection: localhost:3000 "))
