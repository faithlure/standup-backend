import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import User from"../models/UserModel.js"
import Show from"../models/ShowModel.js"




const FormBeli = db.define('form_pembelian',{
    id_user: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    id_show: {
        type: Sequelize.INTEGER,
        references: {
            model: Show,
            key: 'id'
        }
    },
    jumlah : Sequelize.INTEGER,
    
},{
    freezeTableName : true
});


FormBeli.belongsTo(User, { foreignKey: 'id_user' });
FormBeli.belongsTo(Show, { foreignKey: 'id_show' });

export default FormBeli;

(async()=>{
    await db.sync()
})();