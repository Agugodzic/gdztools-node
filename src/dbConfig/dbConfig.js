import Sequelize from "sequelize";
import mysql2 from 'mysql2';

//import env from '../../env.js'

//const config = env;
const config = process.env;

const db = new Sequelize(config.DATABASE_NAME, config.DB_USER_NAME , config.DB_PASSWORD, {

  host: config.DB_HOST,
  //port: '3306',
  password: config.DB_PASSWORD,
  dialect: 'mysql',
  dialectModule: mysql2,

  pool: {
    max: 50,
    min: 0,
    idle: 10000
  }
});

export default db;