import { Sequelize } from "sequelize"
import db from "../config/Database.js"




const Show = db.define('shows',{
   
    judul : Sequelize.STRING,
    harga : Sequelize.STRING,
    tanggal : Sequelize.DATEONLY,
    waktu :  Sequelize.TIME
},{
    freezeTableName : true,
    timestamps: false
});


export default Show;

(async()=>{
    await db.sync()
})();