import dotenv from 'dotenv'
dotenv.config();
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import http from "http"
import userRouter from "../routes/user"
import passport from "passport"
import session from "express-session";
import passportInitialize from '../config/passport-config'
import sequelize from "../db/sequelizeConnection";
import productRouter from '../routes/product';
import cartRouter from "../routes/cart"
import orderRouter from "../routes/order"
import swaggerUi from "swagger-ui-express";
import fs from "fs"

const PORT = process.env.PORT||4002
const app = express();
sequelize.sync({alter:true});
passportInitialize(passport);
const MemoryStore = new session.MemoryStore();
let swaggerFile:any = (process.cwd()+"/swagger/swagger.json")
let swaggerdata = JSON.parse(fs.readFileSync(swaggerFile,'utf-8'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerdata))

app.use(session({
    secret:`${process.env.SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: MemoryStore
}))
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

app.use("/e-commerce",userRouter)
app.use("/e-commerce",productRouter)
app.use("/e-commerce",cartRouter)
app.use("/e-commerce",orderRouter)



const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log("server listen " + PORT);
    
})