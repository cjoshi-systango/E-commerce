import userServices from '../services/userService';
import CommonResponse from '../constants/commonResponsesConstants';
import express from "express"
import passport from 'passport';
import jwt from "jsonwebtoken";
import Credentials from "../constants/credentialsConstant"
import {HttpConstant} from '../constants/httpStatusConstant';
class UserController {
    async registerUser(req: express.Request, res: express.Response) {
        try {
            let registerUser = await userServices.registerUser(req)
            if (registerUser === CommonResponse.USER_ALREADY_EXSIST) {
                res.status(HttpConstant.HTTP_SUCCESS_OK).json({ success: true, data: CommonResponse.USER_ALREADY_EXSIST })

            } else {
                res.status(HttpConstant.HTTP_CREATED).json({ success: true, data: CommonResponse.DATA_INSERTED })

            }
        } catch (error) {
            console.log(error);
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({ success: true, data: CommonResponse.SOMETHING_WENT_WRONG })
        }
    }

    async insertUserRole(req: express.Request, res: express.Response) {
        try {
            let roleInserted = await userServices.insertUserRole(req);
            if (typeof roleInserted == "string") {
                res.status(HttpConstant.HTTP_UNAUTHORIZED).json({ success: true, message: roleInserted })
            }
            else {
                res.status(HttpConstant.HTTP_CREATED).json({ success: true, data: "insert successfully" })
            }
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, data: error })

        }
    }

    async addUserAddress(req: express.Request, res: express.Response) {
        try {
            let isUserAddressExist = await userServices.addUserAddress(req);
            if (typeof isUserAddressExist === 'string') {
                res.status(HttpConstant.HTTP_SUCCESS_OK).json({ success: true, message: isUserAddressExist })
            }
            else {
                res.status(HttpConstant.HTTP_CREATED).json({ success: true, message: CommonResponse.DATA_INSERTED })
            }
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({ success: true, data: error })
        }
    }

    async logInUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            passport.authenticate("local", (err, user) => {

                let userId = user.id
                const token = jwt.sign({ userId }, process.env.TOKEN_KEY || Credentials.TOKEN_KEY)

                req.logIn(user, (err) => {
                    return res.status(HttpConstant.HTTP_SUCCESS_OK).json({ success: true, message: "Loged In",data:token})
                })
            })(req, res, next)

        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, error: error });
        }


    }

    logOutUser(req: express.Request, res: express.Response) {
        req.session.destroy((err) => {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, error: err })
        });
        res.redirect("/login")
    }

    async forgetPassword(req: express.Request, res: express.Response) {
        try {
            await userServices.forgetPassword(req);
            res.status(HttpConstant.HTTP_SUCCESS_OK).json({ success: true, message: "check your mail" });

        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, error: error });

        }
    }

    async resetPassword(req: express.Request, res: express.Response) {
        try {
            let isResetDone = await userServices.resetPassword(req);
            if (typeof isResetDone == 'string') {
                res.status(HttpConstant.HTTP_NO_CONTENT).json({ success: true, message: isResetDone });

            }
            else {
                res.status(HttpConstant.HTTP_SUCCESS_OK).json({ success: true, message: "check your mail" });
            }

        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, error: error });

        }
    }

    async updateUserDetails(req: express.Request, res: express.Response) {
        try {
            await userServices.updateUserDetails(req);
            res.status(HttpConstant.HTTP_CREATED).json({ success: true, message: "updated successfully" });
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, error: error });
        }
    }

    googleLogin(req:express.Request,res:express.Response,next:express.NextFunction){
        try {
            passport.authenticate("google", (err, user) => {
                req.logIn(user, (err) => {
                    return res.status(HttpConstant.HTTP_SUCCESS_OK).json({ success: true, message: "Loged In",data:user})
                })
            })(req, res, next)
        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,message:CommonResponse.SOMETHING_WENT_WRONG})
        }
    }

    async deleteUser(req:express.Request,res:express.Response){
        try {
            await userServices.deleteUser(req);   
            res.status(HttpConstant.HTTP_SUCCESS_OK).json({success:true,message:"deleted"})

        } catch (error) {
            res.status(HttpConstant.HTTP_INTERNAL_SERVER_ERROR).json({success:false,message:CommonResponse.SOMETHING_WENT_WRONG})
        }
    }
}

const userController = new UserController();
export default userController;
