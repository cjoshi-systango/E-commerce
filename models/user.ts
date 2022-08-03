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
    },
    mobile_no:{
        type:DataTypes.STRING(10),
    },   
    google_id:{
        type:DataTypes.STRING,
    },
    provider:{
        type:DataTypes.STRING,
        defaultValue:"local"
    },
    deletedAt:{
        type: DataTypes.DATE
    }
},{
    freezeTableName:true,
});

export default user