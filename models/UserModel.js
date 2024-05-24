import { Sequelize } from "sequelize"
import db from "../config/Database.js"




const User = db.define('users',{
    
    nama : Sequelize.STRING,
    email : Sequelize.STRING,
    alamat : Sequelize.STRING,
    notelp :  Sequelize.STRING,
    username : Sequelize.STRING,
    password : Sequelize.STRING,
    auth_token : Sequelize.TEXT
},{
    freezeTableName : true
});



export default User;

(async()=>{
    await db.sync()
})();