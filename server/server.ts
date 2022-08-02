import dotenv from 'dotenv'
dotenv.config();
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import http from "http"
import userRouter from "../routes/user"
import passport from "passport"
import session from "express-session";
import sequelize from "../db/sequelizeConnection";
import productRouter from '../routes/product';
import cartRouter from "../routes/cart"
import orderRouter from "../routes/order"
import swaggerUi from "swagger-ui-express";
import fs from "fs"
import multer from "multer"
import passportConfig from '../config/passport-config';

const upload = multer()
const PORT = process.env.PORT||4002
const app = express();
// sequelize.sync({force:true});
passportConfig()
const MemoryStore = new session.MemoryStore();
let swaggerFile:any = (process.cwd()+"/swagger/swagger.json")
let swaggerdata = JSON.parse(fs.readFileSync(swaggerFile,'utf-8'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array("img"));
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

app.use("/user",userRouter)
app.use("/product",productRouter)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)



const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log("server listen " + PORT);
})