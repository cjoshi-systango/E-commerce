import dotenv from "dotenv"
dotenv.config();
import passportStategy from "passport-local";
import user from "../models/user";
import bcrypt from "bcrypt";
import Credentials from '../constants/credentialsConstant';
import passport from "passport";
import oAuth2 from "passport-google-oauth2"

const localStrategy = passportStategy.Strategy;

export default () => {
    passport.use(new localStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
        console.log("inside");

        try {
            user.findOne({ where: { email: email } })
                .then((user: any) => {
                    let passwordCheck = bcrypt.compareSync(password, user.password);

                    if (!passwordCheck) {
                        console.log("sommmmmmmmmm");
                        return done(null, "incorrect password");
                    }
                    let userInfo = user.get();
                    console.log(userInfo);

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
    let googleStrategy = oAuth2.Strategy
    passport.use(new googleStrategy({
        clientID: process.env.CLIENT_ID || Credentials.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET || Credentials.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL || Credentials.CALLBACK_URL,
        passReqToCallback: true
    },
        async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
            console.log(req.body);
            
                await user.findOrCreate({
                    where: {
                        google_id: profile.id,
                        fullname: profile.displayName,
                        email: profile.email,
                        provider: profile.provider,
                        userRoleId:3
                    }
                })
                
                return done(null, accessToken)
            
        }
    ))
    passport.serializeUser(function (user: any, cb: any) {

        return cb(null, user);
    });

    passport.deserializeUser(function (user: any, cb: any) {
        return cb(null, user);
    });
}


