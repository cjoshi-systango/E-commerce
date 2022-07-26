import { boolean } from "joi";
import {  Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnection";

const user = sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    fullname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mobile_no:{
        type:DataTypes.STRING(10),
        allowNull:false,
    },   
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }

},{
    freezeTableName:true,
});

export default user