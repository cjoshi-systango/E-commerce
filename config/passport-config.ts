import dotenv from "dotenv"
dotenv.config();
import passportStategy from "passport-local";
import user from "../models/user";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
import Credentials from '../constants/credentialsConstant';


const localStrategy = passportStategy.Strategy;
function passportInitialize(passport:any){
    passport.use(new localStrategy({usernameField:"email",passwordField:"password"},(email, password, done) => {
        console.log("inside");
        
        try {
            user.findOne({ where: { email: email } })
                .then((user: any) => {
                    let passwordCheck = bcrypt.compareSync(password, user.password);
    
                    if (!passwordCheck) {
                        return done(null, "incorrect password");
                    }
                    let userInfo = user.get();
                    return done(null, userInfo);
    
                }).catch((error: any) => {
                    console.log(error);
                    
                    return done(null, "something wrong");
                })
    
    
        } catch (error) {
            console.log(error);
            console.log("error");
    
            
        }
    }))
    passport.serializeUser(function (user: any, cb:any) {
        
        let userId = user.id;

        const token = jwt.sign({userId},process.env.TOKEN_KEY||Credentials.TOKEN_KEY)

        cb(null, token);
    });
    
    passport.deserializeUser(function (user: any, cb:any) {
        return cb(null, user);
    });
}




export default passportInitialize;