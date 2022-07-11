import sequelize from "../db/sequelizeConnection";
import { DataTypes, Sequelize } from "sequelize";

const paymentDetails = sequelize.define('payment_details',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    mode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true
})

export default paymentDetails;