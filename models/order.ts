import sequelize from "../db/sequelizeConnection";
import { DataTypes, Sequelize } from "sequelize";
import user from "./user";
import product from "./product";

const order = sequelize.define('order',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"yet to dispatch"
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    freezeTableName:true
})
user.hasMany(order);
product.hasMany(order);


export default order;