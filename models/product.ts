import sequelize from "../db/sequelizeConnection";
import { DataTypes, Sequelize } from "sequelize";
import productInventory from "./productInventory";
import user from "./user";
const product = sequelize.define('product',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    details:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    freezeTableName:true
})
productInventory.hasOne(product,{
    foreignKey:"inventory_id"
});
user.hasOne(product,{
    foreignKey:"added_by"
});
product.belongsTo(productInventory,{
    foreignKey:"inventory_id"
})
product.belongsTo(user,{
    foreignKey:"added_by"
});
export default product;