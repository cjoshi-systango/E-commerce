import sequelize from "../db/sequelizeConnection";
import { Association, DataTypes, Sequelize } from "sequelize";
import user from "./user";
import product from "./product";

const cart = sequelize.define('cart',{
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
    total_amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    freezeTableName:true,
})


user.hasMany(cart,{onDelete:'cascade'});
product.hasMany(cart,{onDelete:'cascade'});
cart.belongsTo(user,{onDelete:'cascade'});
cart.belongsTo(product,{onDelete:'cascade'});

export default cart;