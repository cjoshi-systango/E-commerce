import sequelize from "../db/sequelizeConnection";
import { DataTypes, Sequelize } from "sequelize";
import user from "./user";
const user_role = sequelize.define("user_role",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    title:{
        type:DataTypes.ENUM("Admin","Seller","User"),
        allowNull:false,
    },
    read:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    write:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    delete:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }

},{
    freezeTableName:true,
})
user_role.hasOne(user);
user.belongsTo(user_role);

export default user_role; 