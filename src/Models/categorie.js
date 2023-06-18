import db from "../dbConfig/dbConfig.js"
import DataTypes from "sequelize";

  const Categorie = db.define(
    "Categorias",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
  );

  export default Categorie;