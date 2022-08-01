import sequelize from "../db/sequelizeConnection";
import { DataTypes, Sequelize } from "sequelize";
import product from "./product";
const productImage = sequelize.define('product_image',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    image:{
        type:DataTypes.BLOB("long"),
        allowNull:false,
    }
},{
    freezeTableName:true,
})

product.hasMany(productImage,{
    onDelete: "cascade"
})
productImage.belongsTo(product,{
    onDelete: "cascade"
})

export default productImage