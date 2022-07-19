import dotenv from 'dotenv'
dotenv.config();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(`${process.env.DB_NAME}`,`${process.env.DB_USERNAME}`,`${process.env.DB_PASS}`,{
    dialect: "mysql",
})

export default sequelize;