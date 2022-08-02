import userServices from '../services/userService';
import CommonResponse from '../constants/commonResponsesConstants';
import express from "express"
import passport from 'passport';
import jwt from "jsonwebtoken";
import Credentials from "../constants/credentialsConstant"
class UserController {
    async registerUser(req: express.Request, res: express.Response) {
        try {
            let registerUser = await userServices.registerUser(req)
            if (registerUser === CommonResponse.USER_ALREADY_EXSIST) {
                res.status(200).json({ success: true, data: CommonResponse.USER_ALREADY_EXSIST })

            } else {
                res.status(200).json({ success: true, data: CommonResponse.DATA_INSERTED })

            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ success: true, data: CommonResponse.SOMETHING_WENT_WRONG })
        }
    }

    async insertUserRole(req: express.Request, res: express.Response) {
        try {
            let roleInserted = await userServices.insertUserRole(req);
            if (typeof roleInserted == "string") {
                res.status(200).json({ success: true, message: roleInserted })
            }
            else {
                res.status(200).json({ success: true, data: "insert successfully" })
            }
        } catch (error) {
            res.status(400).json({ success: false, data: error })

        }
    }

    async addUserAddress(req: express.Request, res: express.Response) {
        try {
            let isUserAddressExist = await userServices.addUserAddress(req);
            if (typeof isUserAddressExist === 'string') {
                res.status(200).json({ success: true, message: isUserAddressExist })
            }
            else {
                res.status(200).json({ success: true, message: CommonResponse.DATA_INSERTED })
            }
        } catch (error) {
            res.status(200).json({ success: true, data: error })
        }
    }

    async logInUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            passport.authenticate("local", (err, user) => {

                let userId = user.id
                const token = jwt.sign({ userId }, process.env.TOKEN_KEY || Credentials.TOKEN_KEY)

                req.logIn(user, (err) => {
                    return res.status(200).json({ success: true, message: "Loged In",data:token})
                })
            })(req, res, next)

        } catch (error) {
            res.status(500).json({ success: false, error: error });
        }


    }

    logOutUser(req: express.Request, res: express.Response) {
        req.session.destroy((err) => {
            res.status(500).json({ success: false, error: err })
        });
        res.redirect("/login")
    }

    async forgetPassword(req: express.Request, res: express.Response) {
        try {
            await userServices.forgetPassword(req);
            res.status(200).json({ success: true, message: "check your mail" });

        } catch (error) {
            res.status(500).json({ success: false, error: error });

        }
    }

    async resetPassword(req: express.Request, res: express.Response) {
        try {
            let isResetDone = await userServices.resetPassword(req);
            if (typeof isResetDone == 'string') {
                res.status(200).json({ success: true, message: isResetDone });

            }
            else {
                res.status(200).json({ success: true, message: "check your mail" });
            }

        } catch (error) {
            res.status(500).json({ success: false, error: error });

        }
    }

    async updateUserDetails(req: express.Request, res: express.Response) {
        try {
            await userServices.updateUserDetails(req);
            res.status(200).json({ success: true, message: "updated successfully" });
        } catch (error) {
            res.status(500).json({ success: false, error: error });
        }
    }

    googleLogin(req:express.Request,res:express.Response){
        try {
            if(req.user){
                res.status(200).json({success:true,message:"loged in",data:req.user})
            }
            else{
                res.status(200).json({success:true,message:CommonResponse.SOMETHING_WENT_WRONG})
            }
        } catch (error) {
            
        }
    }
}

const userController = new UserController();
export default userController;
