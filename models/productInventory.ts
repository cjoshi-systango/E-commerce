import sequelize from "../db/sequelizeConnection";
import { DataTypes, Sequelize } from "sequelize";

const productInventory = sequelize.define('product_inventory',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    freezeTableName:true,
    paranoid: true
})

export default productInventory;