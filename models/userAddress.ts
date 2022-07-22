import sequelize from "../db/sequelizeConnection";
import { DataTypes, Sequelize } from "sequelize";
import user from "./user";
const user_address = sequelize.define("user_address",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    address_line1:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address_line2:{
        type:DataTypes.STRING,
        allowNull:true
    },
    city:{
        type:DataTypes.STRING,
        allowNull:true
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pincode:{
        type:DataTypes.INTEGER,
        allowNull:false
    }


},{
    freezeTableName:true,
    paranoid: true
})
user.hasOne(user_address);
user_address.belongsTo(user);
export default user_address; 