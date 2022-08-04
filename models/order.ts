import sequelize from "../db/sequelizeConnection";
import { DataTypes, Sequelize } from "sequelize";
import user from "./user";
import product from "./product";
import productInventory from "./productInventory";
import cart from "./cart";
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
        type:DataTypes.ENUM("yet to dispatch","Dispatched","Dilivered"),
        allowNull:false,
        defaultValue:"yet to dispatch"
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    freezeTableName:true,
    paranoid: true
})
user.hasMany(order);
product.hasMany(order);
order.belongsTo(product);
cart.hasMany(order,{
    onDelete:"NO ACTION"
});
order.belongsTo(cart,{
    onDelete:"NO ACTION"
})
order.addHook('afterCreate',async(order:any,option:any)=>{
    let inventoryId:any = await product.findOne({attributes:["inventory_id"],where:{id:order.productId}})
    await productInventory.increment({quantity:-order.quantity},{where:{id:inventoryId.inventory_id}});
})


export default order;