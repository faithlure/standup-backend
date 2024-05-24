import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_Name = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const db = new Sequelize(DB_Name, DB_USERNAME,DB_PASSWORD,{ 
    host:process.env.DB_HOST,
    dialect:"mysql"});

    

export default db;